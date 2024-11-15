import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import Modal from './components/Modal';
import { User, Product, Order, Address, Transaction, ServerAddress, ServerUser } from './types';
import { fetchProducts } from './api/products';
import { fetchTransactions } from './api/transactions';
import { fetchAddresses } from './api/addresses';
import { fetchUsers } from './api/users';
import ProductForm from './components/ProductForm';
import { addProduct } from './api/products';
import { updateProduct } from './api/products';
import { deleteProduct } from './api/products';

// Mock data for other entities
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2024-03-10',
  },
];

const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    products: [{ productId: '1', quantity: 1, price: 199.99 }],
    total: 199.99,
    status: 'pending',
    createdAt: '2024-03-10',
  },
];

const mockAddresses: Address[] = [
  {
    id: '1',
    userId: '1',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10001',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<ServerAddress[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [users, setUsers] = useState<ServerUser[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'orders') {
      loadTransactions();
    } else if (activeTab === 'addresses') {
      loadAddresses();
    } else if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    setTransactionLoading(true);
    setTransactionError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setTransactionError(err instanceof Error ? err.message : 'Failed to load transactions');
      console.error('Error loading transactions:', err);
    } finally {
      setTransactionLoading(false);
    }
  };

  const loadAddresses = async () => {
    setAddressLoading(true);
    setAddressError(null);
    try {
      const data = await fetchAddresses();
      setAddresses(data);
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Failed to load addresses');
      console.error('Error loading addresses:', err);
    } finally {
      setAddressLoading(false);
    }
  };

  const loadUsers = async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setUserError(err instanceof Error ? err.message : 'Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setUserLoading(false);
    }
  };

  const getTableConfig = () => {
    switch (activeTab) {
      case 'users':
        return {
          data: users,
          columns: [
            { key: 'username', label: 'Name' },
            { key: 'email', label: 'Email' },
            { 
              key: 'role', 
              label: 'Role',
              render: () => 'user'
            },
            { 
              key: 'gender', 
              label: 'Gender',
              render: (value: string) => value || 'N/A'
            }
          ],
          loading: userLoading,
          error: userError,
        };
      case 'products':
        return {
          data: products,
          columns: [
            {
              key: 'image',
              label: 'Image',
              render: (value: string) => (
                <img
                  src={value}
                  alt="Product"
                  className="h-12 w-12 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48';
                  }}
                />
              ),
            },
            { key: 'productName', label: 'Name' },
            { 
              key: 'productDescription', 
              label: 'Description',
              render: (value: string) => (
                <div className="max-w-md truncate" title={value}>
                  {value}
                </div>
              )
            },
            { 
              key: 'pointsCost', 
              label: 'Points',
              render: (value: number) => (
                <span className="font-medium text-blue-600">
                  {value.toLocaleString()} pts
                </span>
              )
            },
            { 
              key: 'stock', 
              label: 'Stock',
              render: (value: number) => (
                <span className={`font-medium ${value < 50 ? 'text-red-600' : 'text-green-600'}`}>
                  {value}
                </span>
              )
            },
          ],
          loading,
          error,
        };
      case 'orders':
        return {
          data: transactions,
          columns: [
            { key: 'transactionId', label: 'Transaction ID' },
            { key: 'userId', label: 'User ID' },
            { 
              key: 'changeAmount', 
              label: 'Amount',
              render: (value: number) => (
                <span className={`font-medium ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {value.toLocaleString()} pts
                </span>
              )
            },
            { key: 'transactionType', label: 'Type' },
            { key: 'description', label: 'Description' }
          ],
          loading: transactionLoading,
          error: transactionError,
        };
      case 'addresses':
        return {
          data: addresses,
          columns: [
            { key: 'addressId', label: 'ID' },
            { key: 'userId', label: 'User ID' },
            { key: 'street', label: 'Street' },
            { key: 'city', label: 'City' },
            { key: 'state', label: 'State' },
            { key: 'country', label: 'Country' },
            { key: 'postalCode', label: 'Postal Code' },
            { 
              key: 'createdAt', 
              label: 'Created At',
              render: (value: string) => new Date(value).toLocaleDateString()
            }
          ],
          loading: addressLoading,
          error: addressError,
        };
      default:
        return { data: [], columns: [] };
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await addProduct(formData);
      setIsModalOpen(false);
      loadProducts(); // 重新加载商品列表
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const handleEdit = (item: Product) => {
    setSelectedProduct(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Product) => {
    try {
      await deleteProduct(item.productId);
      loadProducts(); // 重新加载商品列表
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleRetry = () => {
    loadProducts();
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateProduct(formData);
      setIsModalOpen(false);
      setSelectedProduct(null);
      loadProducts(); // 重新加载商品列表
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab}
          </h2>
          <p className="text-gray-600">
            Manage your {activeTab.toLowerCase()} here
          </p>
        </div>

        <DataTable
          {...getTableConfig()}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRetry={handleRetry}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        title={`${modalMode === 'add' ? 'Add' : 'Edit'} ${activeTab.slice(0, -1)}`}
      >
        {activeTab === 'products' && (
          <ProductForm
            mode={modalMode}
            initialData={selectedProduct}
            onSubmit={modalMode === 'add' ? handleSubmit : handleUpdate}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;