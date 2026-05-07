import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Badge, Button, Card, Col, Container, ProgressBar, Row, Spinner, Table } from 'react-bootstrap';
import AlertsSection from './components/AlertsSection';
import CustomerManagementSection from './components/CustomerManagementSection';
import HeroSection from './components/HeroSection';
import InventorySection from './components/InventorySection';
import OrderManagementSection from './components/OrderManagementSection';
import OrdersSection from './components/OrdersSection';
import PageHeader from './components/PageHeader';
import ProductManagementSection from './components/ProductManagementSection';
import PromotionManagementSection from './components/PromotionManagementSection';
import Sidebar from './components/Sidebar';
import StaffManagementSection from './components/StaffManagementSection';
import StaffSection from './components/StaffSection';
import SummarySection from './components/SummarySection';
import { dashboardData as initialDashboardData, menuItems } from './components/bookstoreData';
import {
  createCustomer,
  createOrder,
  createProduct,
  createPromotion,
  createStaffMember,
  deleteCustomer,
  deleteOrder,
  deleteProduct,
  deletePromotion,
  deleteStaffMember,
  getCustomers,
  getDashboardData,
  getOrders,
  getProducts,
  getPromotions,
  getStaffMembers,
  updateCustomer,
  updateOrder,
  updateProduct,
  updatePromotion,
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
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [promotions, setPromotions] = useState([]);
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

    async function loadAllData() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [dashboardResponse, productsResponse, staffResponse, ordersResponse, customersResponse, promotionsResponse] = await Promise.all([
          getDashboardData(),
          getProducts(),
          getStaffMembers(),
          getOrders(),
          getCustomers(),
          getPromotions(),
        ]);

        if (!ignore) {
          setDashboardData(dashboardResponse);
          setProducts(productsResponse);
          setStaffMembers(staffResponse);
          setOrders(ordersResponse);
          setCustomers(customersResponse);
          setPromotions(promotionsResponse);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage('Không thể tải dữ liệu từ API. Đang hiển thị dữ liệu mẫu.');
          setDashboardData(initialDashboardData);
          setProducts([]);
          setStaffMembers([]);
          setOrders([]);
          setCustomers([]);
          setPromotions([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadAllData();
    return () => {
      ignore = true;
    };
  }, []);

  const refreshDashboard = async () => {
    const dashboardResponse = await getDashboardData();
    setDashboardData(dashboardResponse);
  };

  const handleNavigate = (pageId) => {
    window.location.hash = pageId;
    setActivePage(pageId);
  };

  const handleCreateProduct = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts((current) => [newProduct, ...current]);
    await refreshDashboard();
  };

  const handleUpdateProduct = async (productId, productData) => {
    const updatedProduct = await updateProduct(productId, productData);
    setProducts((current) => current.map((product) => (product.id === productId ? updatedProduct : product)));
    await refreshDashboard();
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setProducts((current) => current.filter((product) => product.id !== productId));
    await refreshDashboard();
  };

  const handleCreateStaff = async (staffData) => {
    const newStaffMember = await createStaffMember(staffData);
    setStaffMembers((current) => [newStaffMember, ...current]);
    await refreshDashboard();
  };

  const handleUpdateStaff = async (staffId, staffData) => {
    const updatedStaffMember = await updateStaffMember(staffId, staffData);
    setStaffMembers((current) => current.map((staffMember) => (staffMember.id === staffId ? updatedStaffMember : staffMember)));
    await refreshDashboard();
  };

  const handleDeleteStaff = async (staffId) => {
    await deleteStaffMember(staffId);
    setStaffMembers((current) => current.filter((staffMember) => staffMember.id !== staffId));
    await refreshDashboard();
  };

  const handleCreateOrder = async (orderData) => {
    const newOrder = await createOrder(orderData);
    setOrders((current) => [newOrder, ...current]);
    await refreshDashboard();
  };

  const handleUpdateOrder = async (orderId, orderData) => {
    const updatedOrder = await updateOrder(orderId, orderData);
    setOrders((current) => current.map((order) => (order.id === orderId ? updatedOrder : order)));
    await refreshDashboard();
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    setOrders((current) => current.filter((order) => order.id !== orderId));
    await refreshDashboard();
  };

  const handleCreateCustomer = async (customerData) => {
    const newCustomer = await createCustomer(customerData);
    setCustomers((current) => [newCustomer, ...current]);
    await refreshDashboard();
  };

  const handleUpdateCustomer = async (customerId, customerData) => {
    const updatedCustomer = await updateCustomer(customerId, customerData);
    setCustomers((current) => current.map((customer) => (customer.id === customerId ? updatedCustomer : customer)));
    await refreshDashboard();
  };

  const handleDeleteCustomer = async (customerId) => {
    await deleteCustomer(customerId);
    setCustomers((current) => current.filter((customer) => customer.id !== customerId));
    await refreshDashboard();
  };

  const handleCreatePromotion = async (promotionData) => {
    const newPromotion = await createPromotion(promotionData);
    setPromotions((current) => [newPromotion, ...current]);
    await refreshDashboard();
  };

  const handleUpdatePromotion = async (promotionId, promotionData) => {
    const updatedPromotion = await updatePromotion(promotionId, promotionData);
    setPromotions((current) => current.map((promotion) => (promotion.id === promotionId ? updatedPromotion : promotion)));
    await refreshDashboard();
  };

  const handleDeletePromotion = async (promotionId) => {
    await deletePromotion(promotionId);
    setPromotions((current) => current.filter((promotion) => promotion.id !== promotionId));
    await refreshDashboard();
  };

  const {
    alerts,
    featuredBooks,
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
            <ProductManagementSection products={products} onCreateProduct={handleCreateProduct} onDeleteProduct={handleDeleteProduct} onUpdateProduct={handleUpdateProduct} />
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
            <StaffManagementSection staffMembers={staffMembers} onCreateStaff={handleCreateStaff} onDeleteStaff={handleDeleteStaff} onUpdateStaff={handleUpdateStaff} />
          </>
        );
      case 'don-hang':
        return (
          <>
            <PageHeader
              eyebrow="Quản lý đơn hàng"
              title="Theo dõi và cập nhật luồng xử lý đơn hàng"
              description="Tạo mới, cập nhật, xóa đơn hàng và đồng bộ tình trạng vận hành theo từng kênh bán."
            />
            <OrderManagementSection customers={customers} orders={orders} products={products} onCreateOrder={handleCreateOrder} onDeleteOrder={handleDeleteOrder} onUpdateOrder={handleUpdateOrder} />
          </>
        );
      case 'khach-hang':
        return (
          <>
            <PageHeader
              eyebrow="Quản lý khách hàng"
              title="Theo dõi giá trị và tần suất mua của từng khách"
              description="Tạo mới, cập nhật, xóa hồ sơ khách hàng và kiểm soát phân khúc thành viên trong hệ thống."
            />
            <CustomerManagementSection customers={customers} onCreateCustomer={handleCreateCustomer} onDeleteCustomer={handleDeleteCustomer} onUpdateCustomer={handleUpdateCustomer} />
          </>
        );
      case 'khuyen-mai':
        return (
          <>
            <PageHeader
              eyebrow="Quản lý khuyến mãi"
              title="Điều phối chiến dịch ưu đãi đang chạy"
              description="Tạo mới, cập nhật, xóa chương trình khuyến mãi và theo dõi hiệu quả của từng chiến dịch."
            />
            <PromotionManagementSection promotions={promotions} onCreatePromotion={handleCreatePromotion} onDeletePromotion={handleDeletePromotion} onUpdatePromotion={handleUpdatePromotion} />
          </>
        );
      case 'kho-sach':
        return (
          <>
            <PageHeader
              eyebrow="Kho sách"
              title="Kiểm soát nhập xuất và mức tồn kho"
              description="Kho sách được kết nối trực tiếp với dữ liệu sản phẩm. Mọi thay đổi CRUD ở trang sản phẩm sẽ phản ánh tại đây."
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
                        <div className="task-block" key={book.id || book.name}>
                          <div className="task-head">
                            <span>{book.name}</span>
                            <strong>{book.stock} cuốn</strong>
                          </div>
                          <ProgressBar now={Math.min(Number(book.stock) * 2, 100)} variant={Number(book.stock) < 15 ? 'warning' : 'success'} />
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </section>
          </>
        );
      case 'bao-cao':
        return (
          <>
            <PageHeader
              eyebrow="Báo cáo"
              title="Bức tranh kinh doanh được tổng hợp từ toàn bộ dữ liệu"
              description="Các chỉ số dưới đây được tính lại từ sản phẩm, đơn hàng, khách hàng, khuyến mãi và nhân sự sau mỗi thao tác CRUD."
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
                    <OrdersSection orders={orders.slice(0, 4)} />
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
                  <OrdersSection orders={orders.slice(0, 4)} />
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
