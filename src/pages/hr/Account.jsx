import React, { useState } from 'react';
import Sidebar from '../../components/hr/Sidebar';
import './Account.css';
import IconSecurity from '../../assets/IconSecurity.svg';

const Account = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Mock user data
  const user = {
    name: 'HR Admin',
    email: 'hrdemo@gmail.com'
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setModalMessage('Please fill in all password fields.');
      setShowModal(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage('New passwords do not match. Please try again.');
      setShowModal(true);
      return;
    }

    if (newPassword.length < 8) {
      setModalMessage('Password must be at least 8 characters long.');
      setShowModal(true);
      return;
    }

    setModalMessage('✓ Your password has been successfully updated!');
    setShowModal(true);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className="account-page">
      <Sidebar />

     <main className="main-content">
        <div className="account-content">
          <div className="account-wrapper">

            {/* HEADER */}
            <div className="account-heading">
              <h1>Account Settings</h1>
              <p>Manage your administrative security preferences.</p>
            </div>

            {/* USER INFO FULL WIDTH */}
            <div className="user-info full-width">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p className="user-role">HR Admin</p>
                <p className="user-joined">Joined: Apr 2026</p>
              </div>
            </div>

            {/* GRID */}
            <div className="content-grid">

              {/* LEFT: FORM */}
              <div className="settings-card">
                <div className="settings-header">
                <h2>Security</h2>
                </div>
                <p>Update your password and keep your account secure.</p>

                <div className="settings-row">
                  <div className="settings-field">
                    <label>Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="settings-field">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="settings-field">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button className="settings-button" onClick={handleUpdatePassword}>
                  Update Password
                </button>

                <p className="settings-note">
                  Password must contain uppercase, number, and symbol.
                </p>
              </div>

              {/* RIGHT: TIPS */}
              <div className="security-tips-card">
                <div className="tips-header">
                  <h3> Security Tips</h3>
                </div>
                <ul className="tips-list">
                  <li>Use strong, unique passwords</li>
                  <li>Enable 2FA whenever possible</li>
                  <li>Log out from shared devices</li>
                  <li>Keep software updated</li>
                  <li>Monitor account activity</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;