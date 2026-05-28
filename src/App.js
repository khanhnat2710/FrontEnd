import { useEffect, useMemo, useState } from 'react';
import './App.css';
import CategoryStrip from './components/CategoryStrip';
import FeaturedBooks from './components/FeaturedBooks';
import Header from './components/Header';
import Hero from './components/Hero';
import OrderPanel from './components/OrderPanel';
import { checkoutOrder, getBookstoreData, searchBooks } from './services/bookstoreApi';

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
}

function App() {
  const [bookstoreData, setBookstoreData] = useState({
    books: [],
    cartItems: [],
    categories: [],
    featured: {},
    header: {},
    hero: {},
    order: {},
    bookCard: {},
  });
  const [cartItems, setCartItems] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [checkoutStatus, setCheckoutStatus] = useState({ type: '', message: '' });
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadBookstoreData() {
      try {
        const data = await getBookstoreData();
        const books = data.books || [];
        const initialCart = (data.cartItems || [])
          .map((item) => {
            const book = books.find((bookItem) => bookItem.id === item.id);
            return book ? { ...book, quantity: item.quantity || 1 } : null;
          })
          .filter(Boolean);

        setBookstoreData({
          books,
          cartItems: data.cartItems || [],
          categories: data.categories || [],
          featured: data.featured || {},
          header: data.header || {},
          hero: data.hero || {},
          order: data.order || {},
          bookCard: data.bookCard || {},
        });
        setCartItems(initialCart);
        setVisibleBooks(books);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    loadBookstoreData();
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.priceValue * item.quantity, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  async function handleSearch(query = searchTerm, category = activeCategory) {
    setSearchTerm(query);
    setActiveCategory(category);
    const results = await searchBooks({ query, category });
    setVisibleBooks(results);
  }

  function handleAddToCart(book) {
    setCheckoutStatus({ type: '', message: '' });
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === book.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item,
        );
      }

      return [...currentItems, { ...book, quantity: 1 }];
    });
  }

  function handleChangeQuantity(bookId, nextQuantity) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === bookId
            ? { ...item, quantity: Math.max(1, Math.min(nextQuantity, item.stock)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleRemoveItem(bookId) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== bookId));
  }

  async function handleCheckout(customer) {
    if (cartItems.length === 0) {
      setCheckoutStatus({ type: 'error', message: bookstoreData.order.emptyMessage });
      return;
    }

    setCheckoutStatus({ type: 'loading', message: 'Đang xử lý thanh toán...' });

    try {
      const order = await checkoutOrder({
        customer,
        items: cartItems.map(({ id, title, priceValue, quantity }) => ({
          id,
          title,
          priceValue,
          quantity,
        })),
        total: cartTotal,
        totalText: formatCurrency(cartTotal),
        paymentMethod: customer.paymentMethod,
      });

      setCartItems([]);
      setCheckoutStatus({
        type: 'success',
        message: `${bookstoreData.order.successMessage} ${order.orderId}`,
      });
    } catch (error) {
      setCheckoutStatus({ type: 'error', message: bookstoreData.order.errorMessage });
    }
  }

  if (status === 'loading') {
    return (
      <div className="bookstore">
        <main>
          <p className="status-message">Đang tải dữ liệu...</p>
        </main>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bookstore">
        <main>
          <p className="status-message status-message-error">
            Không thể tải dữ liệu từ API. Vui lòng thử lại sau.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="bookstore">
      <Header data={bookstoreData.header} cartCount={cartCount} />

      <main>
        <Hero
          data={bookstoreData.hero}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <CategoryStrip
          categories={bookstoreData.categories}
          activeCategory={activeCategory}
          onSelectCategory={(category) => handleSearch(searchTerm, category)}
        />

        <section className="content-grid">
          <FeaturedBooks
            books={visibleBooks}
            content={bookstoreData.featured}
            addLabel={bookstoreData.bookCard.addLabel}
            stockLabel={bookstoreData.bookCard.stockLabel}
            onAddToCart={handleAddToCart}
          />
          <OrderPanel
            items={cartItems}
            content={bookstoreData.order}
            total={formatCurrency(cartTotal)}
            checkoutStatus={checkoutStatus}
            onCheckout={handleCheckout}
            onChangeQuantity={handleChangeQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
