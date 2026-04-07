import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobPostingsTable from './JobPostingsTable';
import CreateEditJobModal from './CreateEditJobModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Sidebar from '../../components/hr/Sidebar';
import { fetchJobs, toggleJobStatus } from '../../store/slices/hrJobSlice.js';
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

    const handleSaveJob = (job) => {
        // Mock save - dispatch would go here with real thunks
        console.log('Save job:', job);
        // Add to local jobs for demo
        const newJob = { ...job, id: Date.now() };
        // dispatch(createJob(newJob)); // when thunk ready
        // dispatch(fetchJobs()); // refresh list
        setShowCreateModal(false);
        setShowEditModal(false);
    };

    const handleConfirmDelete = () => {
        // TODO: Add delete thunk
        console.log('Delete job:', selectedJob.id);
        setShowDeleteModal(false);
    };

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    return (
        <div className="job-posting-layout">
            <Sidebar />
            <div className="job-posting-main">
                <div className="job-posting-header">
                    <div>
                        <h2>Job Postings</h2>
                        <p>Manage your active talent pipelines and AI-curated roles with surgical precision.</p>
                    </div>
                    <button className="create-job-btn" onClick={handleCreate}>+ Create New Job</button>
                </div>
                <JobPostingsTable
                    jobs={jobs}
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
        </div>
    );
};

export default JobPosting;