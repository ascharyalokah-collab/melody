import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, ShoppingCart, Users, DollarSign, Search, Filter, Eye, Download } from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, pendingOrders: 0 });
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form glass-card" onSubmit={handleLogin}>
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
          Melody<span>Admin</span>
        </div>
        <nav>
          <div className="nav-item active"><LayoutDashboard size={20} /> Dashboard</div>
          <div className="nav-item"><ShoppingCart size={20} /> Orders</div>
          <div className="nav-item"><Users size={20} /> Customers</div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard Overview</h1>
          <div className="admin-user">Admin User</div>
        </header>

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
                  <th>Song Type</th>
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
                    <td>{order.songType.split('(')[0]}</td>
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
                        <button title="View Details"><Eye size={16} /></button>
                        <button title="Download Files"><Download size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
