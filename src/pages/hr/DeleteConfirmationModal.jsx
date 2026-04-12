import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ job, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal-content">
        <div className="modal-icon-warning">
          <span className="material-symbols-rounded">warning</span>
        </div>
        <h3>Delete Job Posting?</h3>
        <p>
          Are you sure you want to delete <strong>{job?.title}</strong>? 
          This action is permanent and all associated candidate data will be lost.
        </p>
        <div className="modal-buttons">
          <button className="btn-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-modal-delete" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;