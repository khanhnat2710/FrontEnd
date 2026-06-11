import BookCard from './BookCard';

// Component nhận danh sách books từ App.js và hiển thị khu vực sách nổi bật.
function FeaturedBooks({ books }) {
  return (
    <div className="featured-section" id="featured">
      {/* Tiêu đề section nằm tách khỏi grid sách để layout dễ canh chỉnh bằng CSS. */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">Lựa chọn phổ biến</p>
          <h2>Sách nổi bật</h2>
        </div>
        <a href="#all-books">Xem tất cả</a>
      </div>

      <div className="book-grid">
        {/* Mỗi object book được truyền xuống BookCard qua prop book để card tự hiển thị chi tiết. */}
        {books.map((book) => (
          <BookCard book={book} key={book.title} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBooks;
