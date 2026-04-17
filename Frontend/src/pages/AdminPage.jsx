import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, ShoppingCart, Users, DollarSign, Search, Filter, Eye, Download, LogOut } from 'lucide-react';
import logoImg from '../assets/M4ULOGO.png';
import './AdminPage.css';

const AdminPage = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'https://melody-yjff.onrender.com';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, pendingOrders: 0 });
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setLoginData({ username: '', password: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${API_URL}/api/admin/login`, loginData);
        if (res.status === 200) {
            setIsLoggedIn(true);
            fetchDashboardData();
        }
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Login failed");
    }
  };

  const fetchDashboardData = async () => {
    try {
        const statsRes = await axios.get(`${API_URL}/api/admin/stats`);
        setStats(statsRes.data);
        const ordersRes = await axios.get(`${API_URL}/api/admin/orders`);
        setOrders(ordersRes.data);
    } catch (err) {
        console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
        await axios.put(`${API_URL}/api/admin/orders/${id}`, { orderStatus: status });
        fetchDashboardData();
    } catch (err) {
        console.error(err);
    }
  };

  const downloadFiles = (order) => {
    if (order.photos && order.photos.length > 0) {
      order.photos.forEach((path, index) => {
        const link = document.createElement('a');
        link.href = `${API_URL}/${path}`;
        link.download = `photo_${index}_${order.whatsappNumber}`;
        link.target = "_blank";
        link.click();
      });
    }
    if (order.voiceNote) {
      const link = document.createElement('a');
      link.href = `${API_URL}/${order.voiceNote}`;
      link.download = `voicenote_${order.whatsappNumber}`;
      link.target = "_blank";
      link.click();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form glass-card" onSubmit={handleLogin}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
             <img src={logoImg} alt="Logo" style={{ height: '60px' }} />
          </div>
          <h2>Admin Login</h2>
          <div className="form-group">
            <label>Username</label>
            <input 
                type="text" 
                onChange={(e) => setLoginData({...loginData, username: e.target.value})} 
                required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
                type="password" 
                onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
           <img src={logoImg} alt="Melody M4U" style={{ height: '50px' }} />
        </div>
        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} /> Orders
          </div>
          <div className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            <Users size={20} /> Customers
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <img src={logoImg} alt="M4U" style={{ height: '40px', marginRight: '15px' }} />
            <h1>Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="admin-user">Admin User</div>
            <button className="btn-logout" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            <section className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-icon" style={{ background: 'rgba(255, 78, 80, 0.1)', color: '#FF4E50' }}>
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <h3>{stats.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                  <DollarSign size={24} />
                </div>
                <div>
                  <h3>₹{stats.revenue}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-icon" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                  <LayoutDashboard size={24} />
                </div>
                <div>
                  <h3>{stats.pendingOrders}</h3>
                  <p>Pending Orders</p>
                </div>
              </div>
            </section>
            
            <section className="orders-section glass-card">
               <div className="orders-header">
                 <h2>Performance Summary</h2>
               </div>
               <p style={{ color: 'var(--gray)' }}>Welcome back to your administration panel. Here you can manage all incoming song requests and track your business growth.</p>
            </section>
          </>
        )}

        {(activeTab === 'orders' || activeTab === 'dashboard') && activeTab !== 'customers' && (
          <section className="orders-section glass-card">
            <div className="orders-header">
              <h2>Recent Orders</h2>
              <div className="orders-actions">
                <div className="search-bar">
                  <Search size={18} />
                  <input 
                      type="text" 
                      placeholder="Search by WhatsApp..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn-outline"><Filter size={18} /> Filter</button>
              </div>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>WhatsApp</th>
                    <th>Mood</th>
                    <th>Date</th>
                    <th>Language</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(o => o.whatsappNumber.includes(searchTerm)).map(order => (
                    <tr key={order._id}>
                      <td>{order.whatsappNumber}</td>
                      <td>{order.mood}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.language}</td>
                      <td>₹{order.totalPrice}</td>
                      <td><span className="badge-paid">Paid</span></td>
                      <td>
                        <select 
                          className={`status-select status-${order.orderStatus.toLowerCase().replace(' ', '-')}`}
                          value={order.orderStatus}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button title="View Details" onClick={() => { setSelectedOrder(order); setShowModal(true); }}><Eye size={16} /></button>
                          <button title="Download Files" onClick={() => downloadFiles(order)}><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'customers' && (
          <section className="orders-section glass-card">
            <div className="orders-header">
              <h2>Customer Base</h2>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>WhatsApp Number</th>
                    <th>Total Orders</th>
                    <th>Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(new Set(orders.map(o => o.whatsappNumber))).map(phone => {
                    const customerOrders = orders.filter(o => o.whatsappNumber === phone);
                    return (
                      <tr key={phone}>
                        <td>{phone}</td>
                        <td>{customerOrders.length}</td>
                        <td>{new Date(customerOrders[customerOrders.length-1].createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showModal && selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content glass-card">
              <div className="modal-header">
                <h2>Order Details</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="detail-item"><strong>WhatsApp:</strong> {selectedOrder.whatsappNumber}</div>
                <div className="detail-item"><strong>Mood:</strong> {selectedOrder.mood}</div>
                <div className="detail-item"><strong>Occasion:</strong> {selectedOrder.occasion || 'N/A'}</div>
                <div className="detail-item"><strong>Song Type:</strong> {selectedOrder.songType}</div>
                <div className="detail-item"><strong>Language:</strong> {selectedOrder.language}</div>
                <div className="detail-item"><strong>Artist:</strong> {selectedOrder.preferredArtist}</div>
                <div className="detail-item"><strong>Story:</strong> <p>{selectedOrder.story}</p></div>
                <div className="detail-item"><strong>Special Lyrics:</strong> <p>{selectedOrder.specialLyrics || 'None'}</p></div>
                <div className="detail-item"><strong>Delivery Time:</strong> {selectedOrder.deliveryTime}</div>
                <div className="detail-item"><strong>Total Price:</strong> ₹{selectedOrder.totalPrice}</div>
                <div className="detail-item"><strong>Add-ons:</strong> {selectedOrder.addons.map(a => a.name).join(', ') || 'None'}</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
