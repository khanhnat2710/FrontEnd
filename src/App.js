import './App.css';
import CategoryStrip from './components/CategoryStrip';
import FeaturedBooks from './components/FeaturedBooks';
import Header from './components/Header';
import Hero from './components/Hero';
import OrderPanel from './components/OrderPanel';
import {
  books,
  cartItems,
  categories,
} from './components/bookData';

// App là component gốc: nó ghép các phần nhỏ của trang bán sách thành một giao diện hoàn chỉnh.
function App() {
  return (
    <div className="bookstore">
      {/* Header chứa logo, menu điều hướng và nút giỏ hàng. */}
      <Header />

      <main>
        {/* Hero là khu vực đầu trang, dùng để giới thiệu nhanh và đặt ô tìm kiếm. */}
        <Hero />

        {/* categories là mảng tên danh mục; CategoryStrip sẽ lặp qua mảng này để tạo các nút danh mục. */}
        <CategoryStrip categories={categories} />

        <section className="content-grid">
          {/* books là danh sách sách nổi bật; mỗi phần tử sẽ được render thành một BookCard. */}
          <FeaturedBooks books={books} />

          {/* cartItems là danh sách sản phẩm mẫu trong giỏ hàng; OrderPanel dùng để hiển thị đơn hàng. */}
          <OrderPanel items={cartItems} />
        </section>
      </main>
    </div>
  );
}

export default App;
