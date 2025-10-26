import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
        
       
        
        { id: 'campus', icon: '🏛️', label: 'Virtual Campus', badge: null, external: true },
        
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuClick = (sectionId, isExternal = false) => {
        if (isExternal) {
            // Navigate to external page (trail page)
            navigate('/trail');
        } else {
            // Handle internal section change
            setActiveSection(sectionId);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
    };

    return (
        <div className="admin-page">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="logo-icon">⚡</div>
                        {isSidebarOpen && (
                            <div className="logo-text">
                                <span className="logo-main">EngiCampus</span>
                                <span className="logo-sub">Admin</span>
                            </div>
                        )}
                    </div>
                    <button 
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? '‹' : '›'}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="sidebar-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => handleMenuClick(item.id, item.external)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {isSidebarOpen && (
                                <>
                                    <span className="nav-label">{item.label}</span>
                                    {item.badge && (
                                        <span className="nav-badge">{item.badge}</span>
                                    )}
                                </>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="sidebar-footer">
                    <button className="user-profile">
                        <div className="user-avatar">AD</div>
                        {isSidebarOpen && (
                            <div className="user-info">
                                <div className="user-name">Admin User</div>
                                <div className="user-role">Administrator</div>
                            </div>
                        )}
                    </button>
                    <button 
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        <span className="logout-icon">🚪</span>
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isSidebarOpen ? '' : 'content-expanded'}`}>
                {/* Top Navigation Bar */}
                <nav className="top-nav">
                    <div className="nav-left">
                        <button 
                            className="menu-toggle"
                            onClick={toggleSidebar}
                        >
                            ☰
                        </button>
                        <div className="breadcrumb">
                            <span>Dashboard</span>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-active">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
                        </div>
                    </div>
                    
                    <div className="nav-right">
                        <button className="nav-icon-btn">
                            <span className="icon">🔔</span>
                            <span className="notification-badge">3</span>
                        </button>
                        <button className="nav-icon-btn">
                            <span className="icon">💬</span>
                        </button>
                        <button 
                            className="back-home-btn"
                            onClick={() => navigate('/')}
                        >
                            ← Home
                        </button>
                    </div>
                </nav>

                {/* Main Content Area */}
                <div className="content-area">
                    <div className="admin-header">
                        <h1>Administrator Panel</h1>
                        <p>Manage campus operations and student data</p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="admin-grid">


                        

                        

                        
                    </div>

                    {/* Quick Actions */}
                    <div className="actions-section">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            

                            
                            
                           

                           
                            <div className="action-card">
                                <div className="action-icon">🏛️</div>
                                <h3>Virtual Campus</h3>
                                <p>3D campus navigation system</p>
                                <button 
                                    className="action-btn"
                                    onClick={() => navigate('/trail')}
                                >
                                    Access
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="activity-section">
                        
                        <div className="activity-list">
                           
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;