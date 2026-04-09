import './JobPostingTable.css';
import React, { useState } from 'react';

const JobPostingsTable = ({ jobs, onEdit, onDelete, onToggleStatus }) => {
   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = Array.isArray(jobs) ? jobs.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = Array.isArray(jobs)
    ? jobs.slice(startIndex, startIndex + itemsPerPage)
    : [];
  
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
            currentData.map(job => (
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
  <span>
    Showing {startIndex + 1} to{" "}
    {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} results
  </span>

  <div className="pagination-controls">
    {/* Prev */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      {'<'}
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;
      return (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
    })}

    {/* Next */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      {'>'}
    </button>
  </div>
</div>
    </div>
  );
};

export default JobPostingsTable;