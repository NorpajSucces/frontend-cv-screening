import React, { useState } from 'react';
import Sidebar from '../../components/hr/Sidebar';
import './Account.css';

const Account = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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

        // Simulate successful update
        setModalMessage('✓ Your password has been successfully updated!');
        setShowModal(true);

        // Reset form
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
            <main className="account-content">
                <div className="account-heading">
                    <h1>Settings</h1>
                    <p>Manage your administrative security preferences.</p>
                </div>
                <div className="settings-card">
                    <h2>
                        <img src={IconSecurity} alt="Security Icon" className="security-icon-svg" />
                        Security
                    </h2>
                    <p>Update your password and keep your account secure.</p>

                    <div className="settings-row">
                        <div className="settings-field">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                id="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="settings-field">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Min. 8 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="settings-field">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="settings-button" onClick={handleUpdatePassword}>Update Password</button>

                    <p className="settings-note">
                        Password must contain at least one uppercase letter, one special character, and one number.
                    </p>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-icon">
                                {modalMessage.includes('✓') ? '✓' : '!'}
                            </div>
                        </div>
                        <div className="modal-body">
                            <p>{modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-button" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;