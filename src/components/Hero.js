import { Button, Form } from 'react-bootstrap';

// Hero là phần nổi bật đầu trang: gồm nội dung giới thiệu, ô tìm kiếm và khối minh hoạ ưu đãi.
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        {/* eyebrow là dòng chữ nhỏ phía trên tiêu đề, dùng để nhấn mạnh lợi ích chính. */}
        <p className="eyebrow">Giao nhanh trong 2 giờ tại nội thành</p>
        <h1>Tìm cuốn sách tiếp theo cho kệ sách của bạn</h1>
        <p>
          Mua sách văn học, kinh tế, kỹ năng và thiếu nhi với gợi ý rõ ràng,
          giá tốt và quy trình đặt hàng đơn giản.
        </p>

        {/* Form tìm kiếm hiện mới là giao diện; chưa có state hoặc hàm xử lý submit. */}
        <Form className="search-box">
          <Form.Control type="search" placeholder="Tìm tên sách, tác giả, ISBN..." />
          <Button type="submit">Tìm sách</Button>
        </Form>
      </div>

      {/* aria-label giúp trình đọc màn hình hiểu khối trang trí này đang mô tả sách/ưu đãi. */}
      <div className="hero-showcase" aria-label="Sách đang được quan tâm">
        {/* book-cover là bìa sách giả lập bằng HTML/CSS, không dùng ảnh thật. */}
        <div className="book-cover cover-main">
          <span>BookNest</span>
          <strong>Sách mới mỗi ngày</strong>
        </div>

        {/* mini-card là thẻ nhỏ hiển thị thông tin ưu đãi trong khu vực hero. */}
        <div className="mini-card">
          <span>Ưu đãi hôm nay</span>
          <strong>Giảm đến 35%</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
