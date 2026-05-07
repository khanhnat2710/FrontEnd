import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
});

const STORAGE_KEYS = {
  products: 'bookstore-products',
  staff: 'bookstore-staff',
  orders: 'bookstore-orders',
  customers: 'bookstore-customers',
  promotions: 'bookstore-promotions',
};

const SEED_ENDPOINTS = {
  products: '/mock/products.json',
  staff: '/mock/staff.json',
  orders: '/mock/orders.json',
  customers: '/mock/customers.json',
  promotions: '/mock/promotions.json',
};

function readStoredCollection(key) {
  const storedValue = window.localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
}

function writeStoredCollection(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

async function ensureCollectionSeeded(collectionName) {
  const storageKey = STORAGE_KEYS[collectionName];
  const existingItems = readStoredCollection(storageKey);

  if (existingItems.length > 0) {
    return existingItems;
  }

  const response = await dashboardApi.get(SEED_ENDPOINTS[collectionName]);
  writeStoredCollection(storageKey, response.data);
  return response.data;
}

function generateId(prefix) {
  return `${prefix}${Date.now()}`;
}

function parseCurrency(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0;
}

function formatCurrency(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`;
}

function buildSummaryCards(products, orders, customers, staffMembers) {
  const totalRevenue = orders.reduce((sum, order) => sum + parseCurrency(order.total), 0);
  const lowStockCount = products.filter((product) => Number(product.stock) < 20).length;
  const newCustomers = customers.filter((customer) => customer.segment === 'Mới').length;
  const activeStaff = staffMembers.filter((staffMember) => staffMember.status === 'Đang làm việc').length;

  return [
    { title: 'Doanh thu đơn hàng', value: formatCurrency(totalRevenue), change: `${orders.length} đơn`, tone: 'success' },
    { title: 'Sản phẩm sắp hết', value: String(lowStockCount), change: 'Cần nhập thêm', tone: 'warning' },
    { title: 'Khách hàng mới', value: String(newCustomers), change: `${customers.length} hồ sơ`, tone: 'info' },
    { title: 'Nhân sự hoạt động', value: String(activeStaff), change: `${staffMembers.length} nhân sự`, tone: 'dark' },
  ];
}

function buildAlerts(products, orders, staffMembers) {
  const alerts = [];
  const lowStockProduct = products.find((product) => Number(product.stock) < 15);
  const pendingOrder = orders.find((order) => order.state !== 'Đã giao');
  const absentStaff = staffMembers.find((staffMember) => staffMember.status === 'Đang nghỉ phép');

  if (lowStockProduct) {
    alerts.push({
      label: lowStockProduct.name,
      detail: `Chỉ còn ${lowStockProduct.stock} cuốn trong kho, cần bổ sung sớm.`,
    });
  }

  if (pendingOrder) {
    alerts.push({
      label: `Đơn ${pendingOrder.id}`,
      detail: `${pendingOrder.customer} đang ở trạng thái "${pendingOrder.state}".`,
    });
  }

  if (absentStaff) {
    alerts.push({
      label: absentStaff.fullName,
      detail: `${absentStaff.role} đang nghỉ phép ở ${absentStaff.shift}.`,
    });
  }

  return alerts;
}

function buildStaffTasks(staffMembers) {
  return staffMembers.slice(0, 3).map((staffMember) => ({
    label: `${staffMember.role} - ${staffMember.fullName}`,
    progress: staffMember.status === 'Đang làm việc' ? 84 : staffMember.status === 'Đang nghỉ phép' ? 45 : 10,
  }));
}

function buildReportCards(products, orders, promotions) {
  const activeProducts = products.filter((product) => product.status === 'Đang bán').length;
  const deliveredOrders = orders.filter((order) => order.state === 'Đã giao').length;
  const activePromotions = promotions.filter((promotion) => promotion.status === 'Đang chạy').length;

  return [
    { title: 'Sản phẩm đang bán', value: String(activeProducts), description: `${products.length} sản phẩm đang được quản lý` },
    { title: 'Đơn đã giao', value: String(deliveredOrders), description: `${orders.length - deliveredOrders} đơn còn đang xử lý` },
    { title: 'Khuyến mãi đang chạy', value: String(activePromotions), description: `${promotions.length} chiến dịch đang theo dõi` },
  ];
}

export async function getProducts() {
  return ensureCollectionSeeded('products');
}

export async function getStaffMembers() {
  return ensureCollectionSeeded('staff');
}

export async function getOrders() {
  return ensureCollectionSeeded('orders');
}

export async function getCustomers() {
  return ensureCollectionSeeded('customers');
}

export async function getPromotions() {
  return ensureCollectionSeeded('promotions');
}

export async function getDashboardData() {
  const [products, staffMembers, orders, customers, promotions] = await Promise.all([
    getProducts(),
    getStaffMembers(),
    getOrders(),
    getCustomers(),
    getPromotions(),
  ]);

  return {
    summaryCards: buildSummaryCards(products, orders, customers, staffMembers),
    featuredBooks: products.slice(0, 4),
    orders: orders.slice(0, 4),
    alerts: buildAlerts(products, orders, staffMembers),
    staffTasks: buildStaffTasks(staffMembers),
    customers: customers.slice(0, 4),
    promotions,
    reportCards: buildReportCards(products, orders, promotions),
  };
}

export async function createProduct(productData) {
  const products = await getProducts();
  const newProduct = { id: generateId('SP'), ...productData };
  const nextProducts = [newProduct, ...products];
  writeStoredCollection(STORAGE_KEYS.products, nextProducts);
  return newProduct;
}

export async function updateProduct(productId, productData) {
  const products = await getProducts();
  const nextProducts = products.map((product) => (
    product.id === productId ? { ...product, ...productData, id: productId } : product
  ));
  writeStoredCollection(STORAGE_KEYS.products, nextProducts);
  return nextProducts.find((product) => product.id === productId);
}

export async function deleteProduct(productId) {
  const products = await getProducts();
  writeStoredCollection(STORAGE_KEYS.products, products.filter((product) => product.id !== productId));
  return productId;
}

export async function createStaffMember(staffData) {
  const staffMembers = await getStaffMembers();
  const newStaffMember = { id: generateId('NS'), ...staffData };
  const nextStaffMembers = [newStaffMember, ...staffMembers];
  writeStoredCollection(STORAGE_KEYS.staff, nextStaffMembers);
  return newStaffMember;
}

export async function updateStaffMember(staffId, staffData) {
  const staffMembers = await getStaffMembers();
  const nextStaffMembers = staffMembers.map((staffMember) => (
    staffMember.id === staffId ? { ...staffMember, ...staffData, id: staffId } : staffMember
  ));
  writeStoredCollection(STORAGE_KEYS.staff, nextStaffMembers);
  return nextStaffMembers.find((staffMember) => staffMember.id === staffId);
}

export async function deleteStaffMember(staffId) {
  const staffMembers = await getStaffMembers();
  writeStoredCollection(STORAGE_KEYS.staff, staffMembers.filter((staffMember) => staffMember.id !== staffId));
  return staffId;
}

export async function createOrder(orderData) {
  const orders = await getOrders();
  const newOrder = { id: generateId('DH'), ...orderData };
  const nextOrders = [newOrder, ...orders];
  writeStoredCollection(STORAGE_KEYS.orders, nextOrders);
  return newOrder;
}

export async function updateOrder(orderId, orderData) {
  const orders = await getOrders();
  const nextOrders = orders.map((order) => (
    order.id === orderId ? { ...order, ...orderData, id: orderId } : order
  ));
  writeStoredCollection(STORAGE_KEYS.orders, nextOrders);
  return nextOrders.find((order) => order.id === orderId);
}

export async function deleteOrder(orderId) {
  const orders = await getOrders();
  writeStoredCollection(STORAGE_KEYS.orders, orders.filter((order) => order.id !== orderId));
  return orderId;
}

export async function createCustomer(customerData) {
  const customers = await getCustomers();
  const newCustomer = { id: generateId('KH'), ...customerData };
  const nextCustomers = [newCustomer, ...customers];
  writeStoredCollection(STORAGE_KEYS.customers, nextCustomers);
  return newCustomer;
}

export async function updateCustomer(customerId, customerData) {
  const customers = await getCustomers();
  const nextCustomers = customers.map((customer) => (
    customer.id === customerId ? { ...customer, ...customerData, id: customerId } : customer
  ));
  writeStoredCollection(STORAGE_KEYS.customers, nextCustomers);
  return nextCustomers.find((customer) => customer.id === customerId);
}

export async function deleteCustomer(customerId) {
  const customers = await getCustomers();
  writeStoredCollection(STORAGE_KEYS.customers, customers.filter((customer) => customer.id !== customerId));
  return customerId;
}

export async function createPromotion(promotionData) {
  const promotions = await getPromotions();
  const newPromotion = { id: generateId('KM'), ...promotionData };
  const nextPromotions = [newPromotion, ...promotions];
  writeStoredCollection(STORAGE_KEYS.promotions, nextPromotions);
  return newPromotion;
}

export async function updatePromotion(promotionId, promotionData) {
  const promotions = await getPromotions();
  const nextPromotions = promotions.map((promotion) => (
    promotion.id === promotionId ? { ...promotion, ...promotionData, id: promotionId } : promotion
  ));
  writeStoredCollection(STORAGE_KEYS.promotions, nextPromotions);
  return nextPromotions.find((promotion) => promotion.id === promotionId);
}

export async function deletePromotion(promotionId) {
  const promotions = await getPromotions();
  writeStoredCollection(STORAGE_KEYS.promotions, promotions.filter((promotion) => promotion.id !== promotionId));
  return promotionId;
}

export { dashboardApi };
