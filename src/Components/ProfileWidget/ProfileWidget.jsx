import React from 'react';
import './ProfileWidget.css';

const ProfileWidget = () => {
  return (
    <div className="profile-widget">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/profile-placeholder.jpg" alt="Profile" />
        </div>
        <h2 className="profile-name">Your Name</h2>
        <p className="profile-title">Your Title</p>
      </div>
      <div className="profile-bio">
        <p>This is a short bio about yourself. You can describe your experience, skills, and interests here.</p>
      </div>
      <div className="profile-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:your.email@example.com">Email</a>
      </div>
    </div>
  );
};

export default ProfileWidget;
