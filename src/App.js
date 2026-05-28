import { useEffect, useState } from 'react';
import './App.css';
import CategoryStrip from './components/CategoryStrip';
import FeaturedBooks from './components/FeaturedBooks';
import Header from './components/Header';
import Hero from './components/Hero';
import OrderPanel from './components/OrderPanel';
import { getBookstoreData } from './services/bookstoreApi';

function App() {
  const [bookstoreData, setBookstoreData] = useState({
    books: [],
    cartItems: [],
    categories: [],
  });
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadBookstoreData() {
      try {
        const data = await getBookstoreData();

        setBookstoreData({
          books: data.books || [],
          cartItems: data.cartItems || [],
          categories: data.categories || [],
        });
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    loadBookstoreData();
  }, []);

  return (
    <div className="bookstore">
      <Header />

      <main>
        <Hero />
        {status === 'loading' && <p className="status-message">Dang tai du lieu...</p>}
        {status === 'error' && (
          <p className="status-message status-message-error">
            Khong the tai du lieu tu API. Vui long thu lai sau.
          </p>
        )}
        {status === 'success' && (
          <>
            <CategoryStrip categories={bookstoreData.categories} />

            <section className="content-grid">
              <FeaturedBooks books={bookstoreData.books} />
              <OrderPanel items={bookstoreData.cartItems} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
