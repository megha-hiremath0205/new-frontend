import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'admin'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Demo admin credentials (in real app, this would be from backend)
    const adminCredentials = {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Check credentials (in real app, this would be an API call)
            if (formData.username === adminCredentials.username && 
                formData.password === adminCredentials.password) {
                
                // Store auth token (in real app, this would be from backend)
                localStorage.setItem('adminToken', 'demo-admin-token');
                localStorage.setItem('userRole', 'admin');
                
                // Show success message
                setErrors({ success: 'Login successful! Redirecting...' });
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    navigate('/admin');
                }, 1000);
            } else {
                setErrors({ submit: 'Invalid username or password' });
            }
        } catch (error) {
            setErrors({ submit: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // In real app, this would open a password reset modal
        alert('Please contact system administrator for password reset.');
    };

    return (
        <div className="admin-login-page">
            {/* Animated Background */}
            <div className="login-bg">
                <div className="floating-elements">
                    <div className="floating-element el-1">⚡</div>
                    <div className="floating-element el-2">🔒</div>
                    <div className="floating-element el-3">👨‍💼</div>
                    <div className="floating-element el-4">📊</div>
                </div>
            </div>

            {/* Login Container */}
            <div className="login-container">
                {/* Back to Home */}
                <button 
                    className="back-home-btn"
                    onClick={() => navigate('/')}
                >
                    ← Back to Home
                </button>

                {/* Login Card */}
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <div className="login-icon">👨‍💼</div>
                        <h1>Admin Login</h1>
                        <p>Access the administrator dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Username Field */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={errors.username ? 'error' : ''}
                                    placeholder="Enter your username"
                                    disabled={isLoading}
                                />
                                <span className="input-icon">👤</span>
                            </div>
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? 'error' : ''}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <span className="input-icon">🔒</span>
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Role Selection (Hidden but can be extended) */}
                        <input type="hidden" name="role" value="admin" />

                        {/* Remember Me & Forgot Password */}
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`login-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    Authenticating...
                                </>
                            ) : (
                                'Login to Dashboard'
                            )}
                        </button>

                        {/* Success/Error Messages */}
                        {errors.success && (
                            <div className="success-message">
                                ✅ {errors.success}
                            </div>
                        )}
                        {errors.submit && (
                            <div className="error-message submit-error">
                                ❌ {errors.submit}
                            </div>
                        )}
                    </form>

                    {/* Demo Credentials */}
                    <div className="demo-credentials">
                        <h4>Demo Credentials:</h4>
                        <p><strong>Username:</strong> admin</p>
                        <p><strong>Password:</strong> admin123</p>
                    </div>

                    {/* Security Notice */}
                    <div className="security-notice">
                        <div className="security-icon">🛡️</div>
                        <p>This is a secure admin portal. All activities are logged and monitored.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;