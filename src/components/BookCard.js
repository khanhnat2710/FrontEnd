import { Button, Card } from 'react-bootstrap';

// BookCard nhận một object book gồm title, author, price, tag và color.
function BookCard({ book }) {
  // Destructuring giúp lấy từng thuộc tính từ book để JSX bên dưới ngắn và dễ đọc.
  const { author, color, price, tag, title } = book;

  return (
    <Card className="book-card">
      {/* backgroundColor dùng giá trị color từ dữ liệu, vì vậy mỗi sách có màu bìa riêng. */}
      <div className="book-thumb" style={{ backgroundColor: color }}>
        <span>{tag}</span>
        <strong>{title}</strong>
      </div>

      {/* Card.Body là phần thông tin bên dưới bìa: tên sách, tác giả, giá và nút thêm. */}
      <Card.Body className="book-info">
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <div>
          <strong>{price}</strong>
          <Button type="button">Thêm</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
