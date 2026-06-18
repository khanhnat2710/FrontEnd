import { Button, Form } from 'react-bootstrap';

function Hero({ query, onQueryChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">Giao nhanh trong 2 giờ tại nội thành</p>
        <h1>Tìm cuốn sách tiếp theo cho kệ sách của bạn</h1>
        <p>
          Mua sách văn học, kinh tế, kỹ năng và thiếu nhi với gợi ý rõ ràng,
          giá tốt và quy trình đặt hàng đơn giản.
        </p>

        <Form className="search-box" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Tìm tên sách, tác giả, danh mục..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <Button type="submit">Tìm sách</Button>
        </Form>
      </div>

      <div className="hero-showcase" aria-label="Sách đang được quan tâm">
        <div className="book-cover cover-main">
          <span>BookNest</span>
          <strong>Sách mới mỗi ngày</strong>
        </div>

        <div className="mini-card">
          <span>Ưu đãi hôm nay</span>
          <strong>Giảm đến 35%</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
