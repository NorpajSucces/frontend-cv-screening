import React, { useState } from 'react';
import './CreateEditJobModal.css';

const defaultJob = {
  title: '',
  aboutPosition: '',
  location: '',
  employmentType: '',
  description: '',
  requirements: '',
  status: 'open',
};

const employmentTypes = ['Full-time', 'Part-time', 'Internship'];


const CreateEditJobModal = ({ job, onClose, onSave }) => {
  const [form, setForm] = useState(job ? { ...job, requirements: job.requirements?.join('\n') } : defaultJob);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEmploymentType = (type) => {
    setForm({ ...form, employmentType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      requirements: form.requirements.split('\n').map(r => r.trim()).filter(Boolean),
      _id: job?._id || job?.id,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal job-modal">
        <h3>{job ? 'Edit Job Posting' : 'Create New Job Post'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="modal-row">
            <div className="modal-field">
              <label>Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Senior Product Manager" />
            </div>
            {/* <div className="modal-field">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange} required>
                <option value="">Select</option>
                {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div> */}
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="City, Country" />
            </div>
            <div className="modal-field">
              <label>Employment Type</label>
              <div className="employment-type-group">
                {employmentTypes.map(type => (
                  <button
                    type="button"
                    key={type}
                    className={form.employmentType === type ? 'active' : ''}
                    onClick={() => handleEmploymentType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-field">
            <label>Job Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe the core mission of this role..." />
          </div>
          <div className="modal-field">
            <label>About Position</label>
            <textarea name="aboutPosition" value={form.aboutPosition} onChange={handleChange} required placeholder="Describe responsibilities of this role..." />
          </div>
          <div className="modal-field">
            <label>Requirements</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} required placeholder="List key qualifications, skills, and experience needed... (one per line)" />
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="open">OPEN</option>
                <option value="closed">CLOSED</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{job ? 'Save Changes' : 'Create Post'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditJobModal;
