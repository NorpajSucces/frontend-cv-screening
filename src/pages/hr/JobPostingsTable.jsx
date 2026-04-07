import React from 'react';
import './JobPostingTable.css';

const JobPostingsTable = ({ jobs, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="job-table-container">
      <table className="job-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Employment Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) ? (
            jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>
                  <span className={`employment-type ${job.employmentType.toLowerCase()}`}>{job.employmentType}</span>
                </td>
                <td>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={job.status === 'open'} 
                      onChange={(e) => onToggleStatus(job._id, e.target.checked ? 'open' : 'closed')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className={job.status === 'open' ? 'status-open' : 'status-closed'}>
                    {job.status === 'open' ? 'OPEN' : 'CLOSED'}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(job)}>
                    <span role="img" aria-label="edit">edit</span>
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(job)}>
                    <span role="img" aria-label="delete">delete</span>
                  </button>
                </td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
      {/* Pagination (static for now) */}
      <div className="pagination">
        <span>Showing 1 to {Array.isArray(jobs) ? jobs.length : 0} of 24 results</span>
        <div className="pagination-controls">
          <button disabled>{'<'}</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingsTable;
