import React, { useState } from 'react';
import Sidebar from '../../components/hr/Sidebar';
import './Account.css';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Account = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Password visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <hr className="divider" />

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
                <div className='settings-subheader'>
                  <p>Update your password and keep your account secure.</p>
                </div>

                <div className="settings-row">

                  <div className="settings-field">
                    <label>Current Password</label>
                    <div className="input-wrapper">
                      <input
                        type={showCurrent ? "text" : "password"}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <span onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label>New Password</label>
                    <div className="input-wrapper">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span onClick={() => setShowNew(!showNew)}>
                        {showNew ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label>Confirm New Password</label>
                    <div className="input-wrapper">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
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
                  <li>
                    Use strong, unique passwords to keep your account secure and avoid using the same password across multiple platforms.
                  </li>
                  <li>
                    Enable two-factor authentication (2FA) to add an extra layer of protection to your account.
                  </li>
                  <li>
                    Always log out after using shared or public devices to prevent unauthorized access.
                  </li>
                  <li>
                    Keep your software and applications up to date to protect against security vulnerabilities.
                  </li>
                  <li>
                    Regularly monitor your account activity to quickly detect and respond to any suspicious behavior.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">Notification</h3>
            <p className="modal-message">{modalMessage}</p>

            <button
              className="modal-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;