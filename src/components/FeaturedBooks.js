import BookCard from './BookCard';

function FeaturedBooks({ books }) {
  return (
    <div className="featured-section" id="featured">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Lựa chọn phổ biến</p>
          <h2>Sách nổi bật</h2>
        </div>
        <a href="#all-books">Xem tất cả</a>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard book={book} key={book.title} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBooks;
