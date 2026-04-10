import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobPostingsTable from './JobPostingsTable';
import CreateEditJobModal from './CreateEditJobModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Sidebar from '../../components/hr/Sidebar';

import {
  fetchJobs,
  toggleJobStatus,
  createJob,
  updateJob,
  deleteJob
} from '../../store/slices/hrJobSlice';

import './JobPosting.css';

const JobPosting = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.hrJob);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedJob(null);
    setShowCreateModal(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  const handleDelete = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const handleToggleStatus = (jobId, status) => {
    dispatch(toggleJobStatus({ jobId, status }));
  };

  const handleSaveJob = async (job) => {
    try {
      if (selectedJob) {
        await dispatch(
          updateJob({
            jobId: selectedJob._id || selectedJob.id,
            jobData: job
          })
        ).unwrap();
      } else {
        await dispatch(createJob(job)).unwrap();
      }

      dispatch(fetchJobs());
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteJob(selectedJob._id || selectedJob.id)).unwrap();
      dispatch(fetchJobs());
      setShowDeleteModal(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // FIX: pastikan jobs selalu array
  const safeJobs = Array.isArray(jobs)
    ? jobs
    : Array.isArray(jobs?.data)
      ? jobs.data
      : [];


  return (
    <div className="job-posting">
      <Sidebar />
      <main className="main-content">
          <div className="job-posting-main">
            <div className="job-posting-header">
              <div>
                <h2>Job Postings</h2>
                <p>
                  Manage your active talent pipelines and AI-curated roles with
                  surgical precision.
                </p>
              </div>

              <button className="create-job-btn" onClick={handleCreate}>
                + Create New Job
              </button>
            </div>

            <JobPostingsTable
            
              jobs={safeJobs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </div>

        {showCreateModal && (
          <CreateEditJobModal
            onClose={() => setShowCreateModal(false)}
            onSave={handleSaveJob}
          />
        )}

        {showEditModal && (
          <CreateEditJobModal
            job={selectedJob}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveJob}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmationModal
            job={selectedJob}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </main>

    </div>
  );
};

export default JobPosting;