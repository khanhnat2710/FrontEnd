import { Button, Card } from 'react-bootstrap';

function BookCard({ book, formatCurrency, onAddToCart }) {
  const {
    author,
    category,
    color,
    description,
    originalPrice,
    pages,
    price,
    rating,
    sold,
    stock,
    tag,
    title,
    image,
  } = book;

  return (
    <Card className="book-card">
      <div className="book-thumb" style={{ backgroundColor: color }}>
        <img className="book-image" src={image} alt={title} />
        <span>{tag}</span>
      </div>

      <Card.Body className="book-info">
        <div className="book-meta">
          <span>{category}</span>
          <span>{rating.toFixed(1)} sao</span>
        </div>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <p className="book-description">{description}</p>
        <div className="stock-line">
          <span>{pages} trang</span>
          <span>Đã bán {sold}</span>
          <span>Còn {stock}</span>
        </div>
        <div className="price-row">
          <span>
            <strong>{formatCurrency(price)}</strong>
            <del>{formatCurrency(originalPrice)}</del>
          </span>
          <Button type="button" onClick={() => onAddToCart(book)}>
            Thêm
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
