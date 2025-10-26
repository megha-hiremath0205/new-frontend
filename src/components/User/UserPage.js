import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
    const navigate = useNavigate();

    return (
        <div className="user-page">
            {/* Navigation Bar */}
            <nav className="user-nav">
                <div className="nav-container">
                    <div className="nav-logo">
                        <div className="logo-icon">👨‍🎓</div>
                        <span className="logo-text">Student Portal</span>
                    </div>
                    <button 
                        className="back-btn"
                        onClick={() => navigate('/')}
                    >
                        ← Back to Home
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="user-container">
                <div className="user-header">
                    <div className="user-info">
                        <div className="user-avatar">JD</div>
                        <div className="user-details">
                            <h1>Welcome back, John!</h1>
                            <p>Computer Science Engineering - Semester 5</p>
                        </div>
                    </div>
                    <div className="user-stats">
                        <div className="user-stat">
                            <span className="stat-value">4.8</span>
                            <span className="stat-label">CGPA</span>
                        </div>
                        <div className="user-stat">
                            <span className="stat-value">92%</span>
                            <span className="stat-label">Attendance</span>
                        </div>
                    </div>
                </div>

                {/* Quick Access */}
                <div className="quick-access">
                    <h2>Quick Access</h2>
                    <div className="access-grid">
                        <div className="access-card">
                            <div className="access-icon">📚</div>
                            <h3>My Courses</h3>
                            <p>View your enrolled courses</p>
                            <button className="access-btn">View</button>
                        </div>

                        <div className="access-card">
                            <div className="access-icon">📅</div>
                            <h3>Class Schedule</h3>
                            <p>Check your daily timetable</p>
                            <button className="access-btn">View</button>
                        </div>

                        <div className="access-card">
                            <div className="access-icon">📊</div>
                            <h3>Attendance</h3>
                            <p>Monitor your attendance</p>
                            <button className="access-btn">View</button>
                        </div>

                        <div className="access-card">
                            <div className="access-icon">🏛️</div>
                            <h3>Campus Map</h3>
                            <p>Virtual campus navigation</p>
                            <button className="access-btn">Explore</button>
                        </div>

                        <div className="access-card">
                            <div className="access-icon">📝</div>
                            <h3>Assignments</h3>
                            <p>Submit and track assignments</p>
                            <button className="access-btn">View</button>
                        </div>

                        <div className="access-card">
                            <div className="access-icon">💰</div>
                            <h3>Fee Details</h3>
                            <p>Check fee status and payments</p>
                            <button className="access-btn">View</button>
                        </div>
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="schedule-section">
                    <h2>Today's Schedule</h2>
                    <div className="schedule-list">
                        <div className="schedule-item">
                            <div className="schedule-time">
                                <span className="time">09:00 - 10:00</span>
                            </div>
                            <div className="schedule-details">
                                <h4>Computer Networks</h4>
                                <p>Prof. Bhagath Inamdar - Block 3, Room 301</p>
                            </div>
                            <div className="schedule-status active">Ongoing</div>
                        </div>

                        <div className="schedule-item">
                            <div className="schedule-time">
                                <span className="time">10:00 - 11:00</span>
                            </div>
                            <div className="schedule-details">
                                <h4>Theory of Computation</h4>
                                <p>Prof. Suman Y - Block 3, Room 302</p>
                            </div>
                            <div className="schedule-status upcoming">Upcoming</div>
                        </div>

                        <div className="schedule-item">
                            <div className="schedule-time">
                                <span className="time">11:15 - 12:15</span>
                            </div>
                            <div className="schedule-details">
                                <h4>Software Engineering</h4>
                                <p>Prof. Sunita Kallu - Block 3, Lab 2</p>
                            </div>
                            <div className="schedule-status upcoming">Upcoming</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="user-activity">
                    <h2>Recent Activity</h2>
                    <div className="activity-grid">
                        <div className="activity-card">
                            <div className="activity-icon">✅</div>
                            <div className="activity-content">
                                <h4>Assignment Submitted</h4>
                                <p>CN Assignment 3 submitted successfully</p>
                                <span className="activity-time">2 hours ago</span>
                            </div>
                        </div>

                        <div className="activity-card">
                            <div className="activity-icon">📚</div>
                            <div className="activity-content">
                                <h4>New Material</h4>
                                <p>SEPM chapter notes uploaded</p>
                                <span className="activity-time">5 hours ago</span>
                            </div>
                        </div>

                        <div className="activity-card">
                            <div className="activity-icon">🏛️</div>
                            <div className="activity-content">
                                <h4>Campus Update</h4>
                                <p>Library will close early tomorrow</p>
                                <span className="activity-time">1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;