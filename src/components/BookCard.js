import { Button, Card } from 'react-bootstrap';

function BookCard({ book }) {
  return (
    <Card className="book-card">
      <div className="book-thumb" style={{ backgroundColor: book.color }}>
        <span>{book.tag}</span>
        <strong>{book.title}</strong>
      </div>
      <Card.Body className="book-info">
        <Card.Title as="h3">{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <div>
          <strong>{book.price}</strong>
          <Button type="button">Thêm</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
