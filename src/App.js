import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Button, Card, Col, Container, ProgressBar, Row, Spinner } from 'react-bootstrap';
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
const emptyList = [];

const pageHeaders = {
  'san-pham': {
    eyebrow: 'Quản lý sản phẩm',
    title: 'Theo dõi vòng đời và tồn kho của từng đầu sách',
    description: 'Tạo mới, cập nhật, xóa sản phẩm và kiểm soát trạng thái bán ngay trong cùng một màn hình quản trị.',
  },
  'nhan-su': {
    eyebrow: 'Quản lý nhân sự',
    title: 'Điều phối đội ngũ vận hành theo ca làm việc',
    description: 'Tạo mới, cập nhật, xóa hồ sơ nhân sự và kiểm soát trạng thái làm việc của từng thành viên.',
  },
  'don-hang': {
    eyebrow: 'Quản lý đơn hàng',
    title: 'Theo dõi và cập nhật luồng xử lý đơn hàng',
    description: 'Tạo mới, cập nhật, xóa đơn hàng và đồng bộ tình trạng vận hành theo từng kênh bán.',
  },
  'khach-hang': {
    eyebrow: 'Quản lý khách hàng',
    title: 'Theo dõi giá trị và tần suất mua của từng khách',
    description: 'Tạo mới, cập nhật, xóa hồ sơ khách hàng và kiểm soát phân khúc thành viên trong hệ thống.',
  },
  'khuyen-mai': {
    eyebrow: 'Quản lý khuyến mãi',
    title: 'Điều phối chiến dịch ưu đãi đang chạy',
    description: 'Tạo mới, cập nhật, xóa chương trình khuyến mãi và theo dõi hiệu quả của từng chiến dịch.',
  },
  'kho-sach': {
    eyebrow: 'Kho sách',
    title: 'Kiểm soát nhập xuất và mức tồn kho',
    description: 'Kho sách được kết nối trực tiếp với dữ liệu sản phẩm. Mọi thay đổi CRUD ở trang sản phẩm sẽ phản ánh tại đây.',
  },
  'bao-cao': {
    eyebrow: 'Báo cáo',
    title: 'Bức tranh kinh doanh được tổng hợp từ toàn bộ dữ liệu',
    description: 'Các chỉ số dưới đây được tính lại từ sản phẩm, đơn hàng, khách hàng, khuyến mãi và nhân sự sau mỗi thao tác CRUD.',
  },
};

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '');
  return menuItems.some((item) => item.id === hash) ? hash : defaultPage;
}

function buildDefaultCollections() {
  return {
    products: emptyList,
    staffMembers: emptyList,
    orders: emptyList,
    customers: emptyList,
    promotions: emptyList,
  };
}

function updateItemInList(list, itemId, nextItem) {
  return list.map((item) => (item.id === itemId ? nextItem : item));
}

function removeItemFromList(list, itemId) {
  return list.filter((item) => item.id !== itemId);
}

function LoadingState() {
  return (
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
}

function ErrorState({ message }) {
  return (
    <Alert variant="warning" className="mb-4">
      <Alert.Heading className="h5">Tải API không thành công</Alert.Heading>
      <p className="mb-3">{message}</p>
      <Button variant="dark" onClick={() => window.location.reload()}>
        Tải lại trang
      </Button>
    </Alert>
  );
}

function InventoryHighlights({ featuredBooks }) {
  return (
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
  );
}

function ReportsGrid({ reportCards }) {
  return (
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
  );
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [products, setProducts] = useState(emptyList);
  const [staffMembers, setStaffMembers] = useState(emptyList);
  const [orders, setOrders] = useState(emptyList);
  const [customers, setCustomers] = useState(emptyList);
  const [promotions, setPromotions] = useState(emptyList);
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

    async function loadInitialData() {
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
          const emptyData = buildDefaultCollections();
          setProducts(emptyData.products);
          setStaffMembers(emptyData.staffMembers);
          setOrders(emptyData.orders);
          setCustomers(emptyData.customers);
          setPromotions(emptyData.promotions);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();
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
    setProducts((current) => updateItemInList(current, productId, updatedProduct));
    await refreshDashboard();
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setProducts((current) => removeItemFromList(current, productId));
    await refreshDashboard();
  };

  const handleCreateStaff = async (staffData) => {
    const newStaffMember = await createStaffMember(staffData);
    setStaffMembers((current) => [newStaffMember, ...current]);
    await refreshDashboard();
  };

  const handleUpdateStaff = async (staffId, staffData) => {
    const updatedStaffMember = await updateStaffMember(staffId, staffData);
    setStaffMembers((current) => updateItemInList(current, staffId, updatedStaffMember));
    await refreshDashboard();
  };

  const handleDeleteStaff = async (staffId) => {
    await deleteStaffMember(staffId);
    setStaffMembers((current) => removeItemFromList(current, staffId));
    await refreshDashboard();
  };

  const handleCreateOrder = async (orderData) => {
    const newOrder = await createOrder(orderData);
    setOrders((current) => [newOrder, ...current]);
    await refreshDashboard();
  };

  const handleUpdateOrder = async (orderId, orderData) => {
    const updatedOrder = await updateOrder(orderId, orderData);
    setOrders((current) => updateItemInList(current, orderId, updatedOrder));
    await refreshDashboard();
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    setOrders((current) => removeItemFromList(current, orderId));
    await refreshDashboard();
  };

  const handleCreateCustomer = async (customerData) => {
    const newCustomer = await createCustomer(customerData);
    setCustomers((current) => [newCustomer, ...current]);
    await refreshDashboard();
  };

  const handleUpdateCustomer = async (customerId, customerData) => {
    const updatedCustomer = await updateCustomer(customerId, customerData);
    setCustomers((current) => updateItemInList(current, customerId, updatedCustomer));
    await refreshDashboard();
  };

  const handleDeleteCustomer = async (customerId) => {
    await deleteCustomer(customerId);
    setCustomers((current) => removeItemFromList(current, customerId));
    await refreshDashboard();
  };

  const handleCreatePromotion = async (promotionData) => {
    const newPromotion = await createPromotion(promotionData);
    setPromotions((current) => [newPromotion, ...current]);
    await refreshDashboard();
  };

  const handleUpdatePromotion = async (promotionId, promotionData) => {
    const updatedPromotion = await updatePromotion(promotionId, promotionData);
    setPromotions((current) => updateItemInList(current, promotionId, updatedPromotion));
    await refreshDashboard();
  };

  const handleDeletePromotion = async (promotionId) => {
    await deletePromotion(promotionId);
    setPromotions((current) => removeItemFromList(current, promotionId));
    await refreshDashboard();
  };

  const {
    alerts,
    featuredBooks,
    reportCards,
    staffTasks,
    summaryCards,
  } = dashboardData;

  const renderPageHeader = (pageId) => {
    const pageHeader = pageHeaders[pageId];

    return pageHeader ? (
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        description={pageHeader.description}
      />
    ) : null;
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'san-pham':
        return (
          <>
            {renderPageHeader(activePage)}
            <ProductManagementSection products={products} onCreateProduct={handleCreateProduct} onDeleteProduct={handleDeleteProduct} onUpdateProduct={handleUpdateProduct} />
          </>
        );
      case 'nhan-su':
        return (
          <>
            {renderPageHeader(activePage)}
            <StaffManagementSection staffMembers={staffMembers} onCreateStaff={handleCreateStaff} onDeleteStaff={handleDeleteStaff} onUpdateStaff={handleUpdateStaff} />
          </>
        );
      case 'don-hang':
        return (
          <>
            {renderPageHeader(activePage)}
            <OrderManagementSection customers={customers} orders={orders} products={products} onCreateOrder={handleCreateOrder} onDeleteOrder={handleDeleteOrder} onUpdateOrder={handleUpdateOrder} />
          </>
        );
      case 'khach-hang':
        return (
          <>
            {renderPageHeader(activePage)}
            <CustomerManagementSection customers={customers} onCreateCustomer={handleCreateCustomer} onDeleteCustomer={handleDeleteCustomer} onUpdateCustomer={handleUpdateCustomer} />
          </>
        );
      case 'khuyen-mai':
        return (
          <>
            {renderPageHeader(activePage)}
            <PromotionManagementSection promotions={promotions} onCreatePromotion={handleCreatePromotion} onDeletePromotion={handleDeletePromotion} onUpdatePromotion={handleUpdatePromotion} />
          </>
        );
      case 'kho-sach':
        return (
          <>
            {renderPageHeader(activePage)}
            <section className="mt-4">
              <Row className="g-4">
                <Col xl={8}>
                  <InventorySection featuredBooks={featuredBooks} />
                </Col>
                <Col xl={4}>
                  <InventoryHighlights featuredBooks={featuredBooks} />
                </Col>
              </Row>
            </section>
          </>
        );
      case 'bao-cao':
        return (
          <>
            {renderPageHeader(activePage)}
            <section className="mt-4">
              <ReportsGrid reportCards={reportCards} />
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
              {errorMessage ? <ErrorState message={errorMessage} /> : null}
              {isLoading ? <LoadingState /> : renderPageContent()}
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
