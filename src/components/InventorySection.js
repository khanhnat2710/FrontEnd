import { Badge, Button, Card, Table } from 'react-bootstrap';

function InventorySection({ featuredBooks }) {
  return (
    <Card className="data-card h-100">
      <Card.Body>
        <div className="section-head">
          <div>
            <p className="section-kicker">Tồn kho nổi bật</p>
            <h3>Danh mục sách cần theo dõi</h3>
          </div>
          <Button variant="outline-secondary">Xuất file</Button>
        </div>
        <Table responsive hover className="align-middle custom-table">
          <thead>
            <tr>
              <th>Tựa sách</th>
              <th>Tác giả</th>
              <th>Tồn kho</th>
              <th>Giá bán</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {featuredBooks.map((book) => (
              <tr key={book.name}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.stock}</td>
                <td>{book.price}</td>
                <td>
                  <Badge bg={book.status === 'Bán chạy' ? 'success' : book.status === 'Ổn định' ? 'secondary' : 'warning'}>
                    {book.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default InventorySection;
