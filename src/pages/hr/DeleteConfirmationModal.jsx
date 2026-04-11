import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ job, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <h3>Delete Job Posting?</h3>
        <p>Are you sure you want to delete this job? This action cannot be undone and all candidate data specifically associated with this posting will be archived.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
        <div className="system-id">SYSTEM ID: {job?.id}-DEL</div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;