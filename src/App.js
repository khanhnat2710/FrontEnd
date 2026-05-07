import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Badge, Button, Card, Col, Container, ProgressBar, Row, Spinner, Table } from 'react-bootstrap';
import AlertsSection from './components/AlertsSection';
import HeroSection from './components/HeroSection';
import InventorySection from './components/InventorySection';
import OrdersSection from './components/OrdersSection';
import PageHeader from './components/PageHeader';
import ProductManagementSection from './components/ProductManagementSection';
import Sidebar from './components/Sidebar';
import StaffManagementSection from './components/StaffManagementSection';
import StaffSection from './components/StaffSection';
import SummarySection from './components/SummarySection';
import { dashboardData as initialDashboardData, menuItems } from './components/bookstoreData';
import {
  createProduct,
  createStaffMember,
  deleteProduct,
  deleteStaffMember,
  getDashboardData,
  getProducts,
  getStaffMembers,
  updateProduct,
  updateStaffMember,
} from './services/dashboardApi';

const defaultPage = 'tong-quan';

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '');
  return menuItems.some((item) => item.id === hash) ? hash : defaultPage;
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [products, setProducts] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadDashboardData() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [dashboardResponse, productsResponse, staffResponse] = await Promise.all([
          getDashboardData(),
          getProducts(),
          getStaffMembers(),
        ]);

        if (!ignore) {
          setDashboardData(dashboardResponse);
          setProducts(productsResponse);
          setStaffMembers(staffResponse);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage('Không thể tải dữ liệu từ API. Đang hiển thị dữ liệu mẫu.');
          setDashboardData(initialDashboardData);
          setProducts([]);
          setStaffMembers([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleNavigate = (pageId) => {
    window.location.hash = pageId;
    setActivePage(pageId);
  };

  const handleCreateProduct = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts((currentProducts) => [newProduct, ...currentProducts]);
  };

  const handleUpdateProduct = async (productId, productData) => {
    const updatedProduct = await updateProduct(productId, productData);
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === productId ? updatedProduct : product
    )));
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
  };

  const handleCreateStaff = async (staffData) => {
    const newStaffMember = await createStaffMember(staffData);
    setStaffMembers((currentStaff) => [newStaffMember, ...currentStaff]);
  };

  const handleUpdateStaff = async (staffId, staffData) => {
    const updatedStaffMember = await updateStaffMember(staffId, staffData);
    setStaffMembers((currentStaff) => currentStaff.map((staffMember) => (
      staffMember.id === staffId ? updatedStaffMember : staffMember
    )));
  };

  const handleDeleteStaff = async (staffId) => {
    await deleteStaffMember(staffId);
    setStaffMembers((currentStaff) => currentStaff.filter((staffMember) => staffMember.id !== staffId));
  };

  const {
    alerts,
    customers,
    featuredBooks,
    orders,
    promotions,
    reportCards,
    staffTasks,
    summaryCards,
  } = dashboardData;

  const renderLoadingState = () => (
    <Card className="data-card">
      <Card.Body className="d-flex align-items-center gap-3 py-4">
        <Spinner animation="border" variant="dark" />
        <div>
          <h3 className="mb-1">Đang tải dữ liệu</h3>
          <p className="mb-0 report-description">Dashboard đang lấy dữ liệu từ API qua axios.</p>
        </div>
      </Card.Body>
    </Card>
  );

  const renderErrorState = () => (
    <Alert variant="warning" className="mb-4">
      <Alert.Heading className="h5">Tải API không thành công</Alert.Heading>
      <p className="mb-3">{errorMessage}</p>
      <Button variant="dark" onClick={() => window.location.reload()}>
        Tải lại trang
      </Button>
    </Alert>
  );

  const renderPageContent = () => {
    switch (activePage) {
      case 'san-pham':
        return (
          <>
            <PageHeader
              eyebrow="Quản lý sản phẩm"
              title="Theo dõi vòng đời và tồn kho của từng đầu sách"
              description="Tạo mới, cập nhật, xóa sản phẩm và kiểm soát trạng thái bán ngay trong cùng một màn hình quản trị."
            />
            <ProductManagementSection
              products={products}
              onCreateProduct={handleCreateProduct}
              onDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
            />
          </>
        );
      case 'nhan-su':
        return (
          <>
            <PageHeader
              eyebrow="Quản lý nhân sự"
              title="Điều phối đội ngũ vận hành theo ca làm việc"
              description="Tạo mới, cập nhật, xóa hồ sơ nhân sự và kiểm soát trạng thái làm việc của từng thành viên."
            />
            <StaffManagementSection
              staffMembers={staffMembers}
              onCreateStaff={handleCreateStaff}
              onDeleteStaff={handleDeleteStaff}
              onUpdateStaff={handleUpdateStaff}
            />
          </>
        );
      case 'kho-sach':
        return (
          <>
            <PageHeader
              eyebrow="Kho sách"
              title="Kiểm soát nhập xuất và mức tồn kho"
              description="Theo dõi đầu sách bán chạy, các mã sắp hết hàng và ưu tiên nhập bổ sung theo nhu cầu thực tế."
            />
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={8}>
                  <InventorySection featuredBooks={featuredBooks} />
                </Col>
                <Col xl={4}>
                  <Card className="data-card h-100">
                    <Card.Body>
                      <p className="section-kicker">Tình trạng kho</p>
                      <h3 className="mb-4">Nhóm sách cần ưu tiên</h3>
                      {featuredBooks.map((book) => (
                        <div className="task-block" key={book.name}>
                          <div className="task-head">
                            <span>{book.name}</span>
                            <strong>{book.stock} cuốn</strong>
                          </div>
                          <ProgressBar now={Math.min(book.stock * 2, 100)} variant={book.stock < 15 ? 'warning' : 'success'} />
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </section>
          </>
        );
      case 'don-hang':
        return (
          <>
            <PageHeader
              eyebrow="Đơn hàng"
              title="Theo dõi vận hành đơn hàng theo từng kênh"
              description="Tập trung vào trạng thái giao hàng, kênh bán hiệu quả và các đơn đang chờ xử lý."
            />
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={7}>
                  <OrdersSection orders={orders} />
                </Col>
                <Col xl={5}>
                  <AlertsSection alerts={alerts} />
                </Col>
              </Row>
            </section>
          </>
        );
      case 'khach-hang':
        return (
          <>
            <PageHeader
              eyebrow="Khách hàng"
              title="Quản lý hội viên và mức chi tiêu"
              description="Nhận diện khách hàng trung thành, khách mới và nhóm cần chăm sóc lại để tăng tần suất quay lại."
            />
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={8}>
                  <Card className="data-card h-100">
                    <Card.Body>
                      <div className="section-head">
                        <div>
                          <p className="section-kicker">Danh sách khách hàng</p>
                          <h3>Khách hàng nổi bật trong tháng</h3>
                        </div>
                      </div>
                      <Table responsive hover className="align-middle custom-table">
                        <thead>
                          <tr>
                            <th>Khách hàng</th>
                            <th>Phân khúc</th>
                            <th>Chi tiêu</th>
                            <th>Lượt mua</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer) => (
                            <tr key={customer.name}>
                              <td>{customer.name}</td>
                              <td><Badge bg={customer.segment === 'VIP' ? 'dark' : 'secondary'}>{customer.segment}</Badge></td>
                              <td>{customer.spend}</td>
                              <td>{customer.visits}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={4}>
                  <Card className="data-card h-100">
                    <Card.Body>
                      <p className="section-kicker">Chăm sóc khách hàng</p>
                      <h3 className="mb-4">Nhóm cần hành động</h3>
                      <div className="alert-stack">
                        <div className="alert-item">
                          <strong>Khách VIP 30 ngày chưa quay lại</strong>
                          <span>Gửi voucher 10% cho 12 khách hàng có giá trị cao.</span>
                        </div>
                        <div className="alert-item">
                          <strong>Khách mới trong tuần</strong>
                          <span>Đã có 26 tài khoản mới, nên gửi chuỗi chào mừng tự động.</span>
                        </div>
                        <div className="alert-item">
                          <strong>Khách mua theo combo</strong>
                          <span>Nên đề xuất thêm sách kỹ năng và văn học thiếu nhi.</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </section>
          </>
        );
      case 'khuyen-mai':
        return (
          <>
            <PageHeader
              eyebrow="Khuyến mãi"
              title="Theo dõi hiệu quả các chiến dịch ưu đãi"
              description="So sánh chiến dịch đang chạy, tác động đến doanh thu và chọn chương trình cần nhân rộng."
            />
            <section className="mt-4">
              <Row className="g-4">
                {promotions.map((promotion) => (
                  <Col md={6} xl={4} key={promotion.name}>
                    <Card className="summary-card promotion-card h-100">
                      <Card.Body>
                        <p className="section-kicker">{promotion.period}</p>
                        <h3>{promotion.name}</h3>
                        <p className="promotion-effect">{promotion.effect}</p>
                        <Badge bg="warning" text="dark">Đang hoạt động</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </>
        );
      case 'bao-cao':
        return (
          <>
            <PageHeader
              eyebrow="Báo cáo"
              title="Bức tranh kinh doanh theo tuần và theo tháng"
              description="Tổng hợp các chỉ số tài chính và vận hành để hỗ trợ quyết định nhập hàng, bán hàng và chăm sóc khách."
            />
            <section className="mt-4">
              <Row className="g-4">
                {reportCards.map((report) => (
                  <Col md={6} xl={4} key={report.title}>
                    <Card className="summary-card h-100">
                      <Card.Body>
                        <p>{report.title}</p>
                        <div className="summary-row">
                          <h3>{report.value}</h3>
                        </div>
                        <p className="report-description">{report.description}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <section className="mt-4">
                <Row className="g-4">
                  <Col xl={7}>
                    <OrdersSection orders={orders} />
                  </Col>
                  <Col xl={5}>
                    <StaffSection staffTasks={staffTasks} />
                  </Col>
                </Row>
              </section>
            </section>
          </>
        );
      case 'tong-quan':
      default:
        return (
          <>
            <HeroSection />
            <SummarySection summaryCards={summaryCards} />
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={8}>
                  <InventorySection featuredBooks={featuredBooks} />
                </Col>
                <Col xl={4}>
                  <AlertsSection alerts={alerts} />
                </Col>
              </Row>
            </section>
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={7}>
                  <OrdersSection orders={orders} />
                </Col>
                <Col xl={5}>
                  <StaffSection staffTasks={staffTasks} />
                </Col>
              </Row>
            </section>
          </>
        );
    }
  };

  return (
    <div className="bookstore-app-shell">
      <Container fluid className="py-4 px-3 px-xl-4">
        <Row className="g-4">
          <Col xl={2} lg={3}>
            <Sidebar menuItems={menuItems} activePage={activePage} onNavigate={handleNavigate} />
          </Col>

          <Col xl={10} lg={9}>
            <main className="content-panel">
              {errorMessage ? renderErrorState() : null}
              {isLoading ? renderLoadingState() : renderPageContent()}
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
