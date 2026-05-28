import { Button, Card } from 'react-bootstrap';

function BookCard({ book, addLabel, stockLabel, onAddToCart }) {
  return (
    <Card className="book-card">
      <div className="book-thumb" style={{ backgroundColor: book.color }}>
        <span>{book.tag}</span>
        <strong>{book.title}</strong>
      </div>
      <Card.Body className="book-info">
        <Card.Title as="h3">{book.title}</Card.Title>
        <Card.Text>
          {book.author} · {book.category}
        </Card.Text>
        <span className="stock-line">
          {stockLabel}: {book.stock}
        </span>
        <div>
          <strong>{book.price}</strong>
          <Button type="button" onClick={() => onAddToCart(book)}>
            {addLabel}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
