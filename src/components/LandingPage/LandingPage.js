import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLoginClick = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const handleRoleSelect = (role) => {
        if (role === 'admin') {
            navigate('/admin-login');
        } else if (role === 'user') {
            navigate('/user');
        }
        setIsLoginOpen(false);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page">
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>

            {/* Compact Navigation Bar */}
            <nav className={`navbar ${isScrolled ? 'nav-scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="nav-brand">
                        <div className="logo">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">EngiCampus</span>
                        </div>
                    </div>
                    
                    <div className="nav-actions">
                        <div className="nav-links">
                            <button 
                                className="nav-link"
                                onClick={() => scrollToSection('features')}
                            >
                                Features
                            </button>
                            <button 
                                className="nav-link"
                                onClick={() => scrollToSection('about')}
                            >
                                About
                            </button>
                        </div>
                        
                        <div className="login-wrapper">
                            <button 
                                className="login-btn"
                                onClick={handleLoginClick}
                            >
                                <span>Login</span>
                                <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </button>
                            
                            {isLoginOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item" onClick={() => handleRoleSelect('admin')}>
                                        <span className="item-icon">👨‍💼</span>
                                        <div className="item-content">
                                            <div className="item-title">Admin</div>
                                            <div className="item-desc">Faculty Access</div>
                                        </div>
                                    </div>
                                    <div className="dropdown-item" onClick={() => handleRoleSelect('user')}>
                                        <span className="item-icon">👨‍🎓</span>
                                        <div className="item-content">
                                            <div className="item-title">Student</div>
                                            <div className="item-desc">Student Portal</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Engineering Campus 
                            <span className="highlight"> Management</span> 
                            Reimagined
                        </h1>
                        
                        <p className="hero-description">
                            Streamline your academic journey with our cutting-edge campus management system. 
                            From attendance tracking to virtual campus tours.
                        </p>
                        
                        <div className="hero-buttons">
                            <button className="btn primary-btn" onClick={() => scrollToSection('features')}>
                                Explore Features
                            </button>
                            <button className="btn secondary-btn" onClick={handleLoginClick}>
                                Get Started
                            </button>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div className="visual-card">
                            <div className="card-icon">🏛️</div>
                            <h4>Virtual Campus</h4>
                            <p>3D Navigation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <h2 className="section-title">Campus Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Smart Attendance</h3>
                            <p>AI-powered tracking with real-time monitoring</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🏛️</div>
                            <h3>Virtual Campus</h3>
                            <p>Interactive 3D campus navigation</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>Digital Library</h3>
                            <p>Access engineering resources</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <h2 className="section-title">About EngiCampus</h2>
                    <p>Revolutionizing engineering education with innovative solutions.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;