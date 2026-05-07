import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
});

const PRODUCT_STORAGE_KEY = 'bookstore-products';
const STAFF_STORAGE_KEY = 'bookstore-staff';

export async function getDashboardData() {
  const response = await dashboardApi.get('/mock/dashboard.json');
  return response.data;
}

function readStoredProducts() {
  const storedProducts = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
}

function writeStoredProducts(products) {
  window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

function readStoredStaff() {
  const storedStaff = window.localStorage.getItem(STAFF_STORAGE_KEY);
  return storedStaff ? JSON.parse(storedStaff) : [];
}

function writeStoredStaff(staffMembers) {
  window.localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staffMembers));
}

async function ensureProductsSeeded() {
  const existingProducts = readStoredProducts();

  if (existingProducts.length > 0) {
    return existingProducts;
  }

  const response = await dashboardApi.get('/mock/products.json');
  writeStoredProducts(response.data);
  return response.data;
}

export async function getProducts() {
  return ensureProductsSeeded();
}

async function ensureStaffSeeded() {
  const existingStaff = readStoredStaff();

  if (existingStaff.length > 0) {
    return existingStaff;
  }

  const response = await dashboardApi.get('/mock/staff.json');
  writeStoredStaff(response.data);
  return response.data;
}

export async function getStaffMembers() {
  return ensureStaffSeeded();
}

export async function createProduct(productData) {
  const products = await ensureProductsSeeded();
  const newProduct = {
    id: `SP${Date.now()}`,
    ...productData,
  };

  const nextProducts = [newProduct, ...products];
  writeStoredProducts(nextProducts);
  return newProduct;
}

export async function updateProduct(productId, productData) {
  const products = await ensureProductsSeeded();
  const nextProducts = products.map((product) => (
    product.id === productId ? { ...product, ...productData, id: productId } : product
  ));

  writeStoredProducts(nextProducts);
  return nextProducts.find((product) => product.id === productId);
}

export async function deleteProduct(productId) {
  const products = await ensureProductsSeeded();
  const nextProducts = products.filter((product) => product.id !== productId);
  writeStoredProducts(nextProducts);
  return productId;
}

export async function createStaffMember(staffData) {
  const staffMembers = await ensureStaffSeeded();
  const newStaffMember = {
    id: `NS${Date.now()}`,
    ...staffData,
  };

  const nextStaffMembers = [newStaffMember, ...staffMembers];
  writeStoredStaff(nextStaffMembers);
  return newStaffMember;
}

export async function updateStaffMember(staffId, staffData) {
  const staffMembers = await ensureStaffSeeded();
  const nextStaffMembers = staffMembers.map((staffMember) => (
    staffMember.id === staffId ? { ...staffMember, ...staffData, id: staffId } : staffMember
  ));

  writeStoredStaff(nextStaffMembers);
  return nextStaffMembers.find((staffMember) => staffMember.id === staffId);
}

export async function deleteStaffMember(staffId) {
  const staffMembers = await ensureStaffSeeded();
  const nextStaffMembers = staffMembers.filter((staffMember) => staffMember.id !== staffId);
  writeStoredStaff(nextStaffMembers);
  return staffId;
}

export { dashboardApi };
