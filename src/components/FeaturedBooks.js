import BookCard from './BookCard';

function FeaturedBooks({ books, content, addLabel, stockLabel, onAddToCart }) {
  return (
    <div className="featured-section" id="featured">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <a href="#home">{content.viewAllLabel}</a>
      </div>

      {books.length === 0 ? (
        <p className="empty-message">{content.emptyMessage}</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              book={book}
              addLabel={addLabel}
              stockLabel={stockLabel}
              key={book.id}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedBooks;
