import { useMemo, useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const defaultFormState = {
  name: '',
  author: '',
  category: '',
  price: '',
  stock: '',
  status: 'Đang bán',
};

function ProductManagementSection({ products, onCreateProduct, onDeleteProduct, onUpdateProduct }) {
  const [formState, setFormState] = useState(defaultFormState);
  const [editingProductId, setEditingProductId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const stockSummary = useMemo(() => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter((product) => Number(product.stock) < 20).length;
    const activeProducts = products.filter((product) => product.status === 'Đang bán').length;

    return { totalProducts, lowStockProducts, activeProducts };
  }, [products]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingProductId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formState,
      stock: Number(formState.stock),
    };

    if (editingProductId) {
      await onUpdateProduct(editingProductId, payload);
      setFeedbackMessage('Đã cập nhật sản phẩm.');
    } else {
      await onCreateProduct(payload);
      setFeedbackMessage('Đã thêm sản phẩm mới.');
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setFormState({
      name: product.name,
      author: product.author,
      category: product.category,
      price: product.price,
      stock: String(product.stock),
      status: product.status,
    });
    setFeedbackMessage(`Đang chỉnh sửa: ${product.name}`);
  };

  const handleDelete = async (productId) => {
    await onDeleteProduct(productId);

    if (editingProductId === productId) {
      resetForm();
    }

    setFeedbackMessage('Đã xóa sản phẩm.');
  };

  return (
    <section className="mt-4">
      <Row className="g-4">
        <Col xl={5}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Biểu mẫu</p>
                  <h3>{editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
                </div>
              </div>

              <Form className="product-form" onSubmit={handleSubmit}>
                <Form.Group controlId="product-name">
                  <Form.Label>Tên sách</Form.Label>
                  <Form.Control name="name" value={formState.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="product-author">
                  <Form.Label>Tác giả</Form.Label>
                  <Form.Control name="author" value={formState.author} onChange={handleChange} required />
                </Form.Group>

                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group controlId="product-category">
                      <Form.Label>Danh mục</Form.Label>
                      <Form.Control name="category" value={formState.category} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="product-price">
                      <Form.Label>Giá bán</Form.Label>
                      <Form.Control name="price" value={formState.price} onChange={handleChange} placeholder="120.000đ" required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group controlId="product-stock">
                      <Form.Label>Tồn kho</Form.Label>
                      <Form.Control name="stock" type="number" min="0" value={formState.stock} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="product-status">
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Select name="status" value={formState.status} onChange={handleChange}>
                        <option value="Đang bán">Đang bán</option>
                        <option value="Sắp hết">Sắp hết</option>
                        <option value="Ngừng bán">Ngừng bán</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="hero-actions mt-4">
                  <Button type="submit" variant="dark">
                    {editingProductId ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
                  </Button>
                  <Button type="button" variant="outline-dark" onClick={resetForm}>
                    Làm mới
                  </Button>
                </div>
              </Form>

              <div className="insight-panel">
                <p className="section-kicker mb-2">Tổng quan nhanh</p>
                <h4>{stockSummary.totalProducts} sản phẩm đang quản lý</h4>
                <p className="mb-1">Đang bán: {stockSummary.activeProducts}</p>
                <p className="mb-0">Sắp cần nhập thêm: {stockSummary.lowStockProducts}</p>
              </div>

              {feedbackMessage ? <p className="product-feedback mb-0 mt-3">{feedbackMessage}</p> : null}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={7}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Danh sách</p>
                  <h3>Sản phẩm trong hệ thống</h3>
                </div>
              </div>

              <Table responsive hover className="align-middle custom-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Tên sách</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Tồn</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <strong>{product.name}</strong>
                        <div className="table-subtext">{product.author}</div>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Badge bg={product.status === 'Đang bán' ? 'success' : product.status === 'Sắp hết' ? 'warning' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="table-actions">
                          <Button variant="outline-dark" size="sm" onClick={() => handleEdit(product)}>
                            Sửa
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>
                            Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default ProductManagementSection;
