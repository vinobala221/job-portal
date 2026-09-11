import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);

  const [error, setError] = useState("");
  const [showJobModal, setShowJobModal] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary_range: "",
  });

  // ==============================
  // FETCH RECRUITER JOBS
  // ==============================
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/recruiter/jobs/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setError(
        error.response?.data?.message || "Failed to load posted jobs"
      );
    } finally {
      setLoadingJobs(false);
    }
  };

  // ==============================
  // FETCH APPLICATIONS
  // ==============================
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/recruiter/applications/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to load applications:", error);
      setError(
        error.response?.data?.message || "Failed to load applications"
      );
    } finally {
      setLoadingApplications(false);
    }
  };

  // ==============================
  // USE EFFECT
  // ==============================
  useEffect(() => {
    if (!token) {
      navigate("/recruiter/login");
      return;
    }

    fetchJobs();
    fetchApplications();
  }, []);

  // ==============================
  // INPUT CHANGE
  // ==============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // ==============================
  // CREATE JOB
  // ==============================
  const handleCreateJob = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/jobs/create/",
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job posted successfully!");
      setShowJobModal(false);

      setJobData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary_range: "",
      });

      fetchJobs();
    } catch (error) {
      console.error("POST JOB ERROR:", error.response?.data);
      alert(
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        "Failed to post job"
      );
    }
  };

  // ==============================
  // UPDATE APPLICATION STATUS
  // ==============================
  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/applications/${appId}/status/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application.id === appId
            ? { ...application, status: newStatus }
            : application
        )
      );
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error.response?.data);
      alert(
        error.response?.data?.message ||
        "Failed to update application status"
      );
    }
  };

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  // ==============================
  // DELETE JOB
  // ==============================
  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/jobs/${jobId}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job deleted successfully!");
      fetchJobs();
      fetchApplications();
    } catch (error) {
      console.error("DELETE JOB ERROR:", error.response?.data);
      alert(
        error.response?.data?.message || "Failed to delete job"
      );
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* ================= HEADER ================= */}
      <header className="bg-white border-bottom shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <h3 className="text-primary fw-bold mb-0">JobPortal</h3>

          <div className="d-flex align-items-center gap-3">
            <span className="text-secondary fw-semibold">
              Hello, {username}
            </span>
            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
              style={{ width: "40px", height: "40px" }}
            >
              {username ? username.charAt(0).toUpperCase() : "R"}
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Recruiter Dashboard</h2>
            <p className="text-muted">
              Manage your jobs and candidate applications.
            </p>
          </div>
          <button
            className="btn btn-primary fw-bold"
            onClick={() => setShowJobModal(true)}
          >
            + Post New Job
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* ================= STATISTICS ================= */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="text-muted">Posted Jobs</h6>
                <h2 className="fw-bold text-primary">{jobs.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="text-muted">Total Applications</h6>
                <h2 className="fw-bold text-primary">{applications.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="text-muted">Shortlisted</h6>
                <h2 className="fw-bold text-success">
                  {
                    applications.filter((app) => app.status === "shortlisted")
                      .length
                  }
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ================= POSTED JOBS ================= */}
        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">My Posted Jobs</h4>
              <span className="badge bg-primary">{jobs.length} Jobs</span>
            </div>

            {loadingJobs && <p className="text-center">Loading jobs...</p>}

            {!loadingJobs && jobs.length === 0 && (
              <p className="text-center text-muted">
                You have not posted any jobs yet.
              </p>
            )}

            {!loadingJobs && jobs.length > 0 && (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Posted Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="fw-semibold">{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{job.salary_range || "Not specified"}</td>
                        <td>
                          {new Date(job.posted_on).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ================= APPLICATIONS ================= */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="fw-bold mb-4">Received Applications</h4>

            {loadingApplications && (
              <p className="text-center">Loading applications...</p>
            )}

            {!loadingApplications && applications.length === 0 && (
              <p className="text-center text-muted">
                No applications received yet.
              </p>
            )}

            {!loadingApplications && applications.length > 0 && (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Job</th>
                      <th>Candidate</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        {/* 👈 திருத்தப்பட்ட இடங்கள் */}
                        <td className="fw-semibold">
                          {app.job_details?.title || "N/A"}
                        </td>
                        <td>
                          {app.applicant_details?.username || "N/A"}
                        </td>
                        <td>
                          {app.applicant_details?.email || "N/A"}
                        </td>
                        <td>
                          <span
                            className={
                              app.status === "shortlisted"
                                ? "badge bg-success"
                                : app.status === "rejected"
                                ? "badge bg-danger"
                                : "badge bg-warning text-dark"
                            }
                          >
                            {app.status}
                          </span>
                        </td>
                        <td>
                          {new Date(app.applied_on).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success me-2"
                            disabled={app.status === "shortlisted"}
                            onClick={() =>
                              handleStatusUpdate(app.id, "shortlisted")
                            }
                          >
                            Shortlist
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={app.status === "rejected"}
                            onClick={() =>
                              handleStatusUpdate(app.id, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================= POST JOB MODAL ================= */}
      {showJobModal && (
        <div
          className="modal d-block bg-dark bg-opacity-50"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Post a New Job</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowJobModal(false)}
                ></button>
              </div>

              <form onSubmit={handleCreateJob}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={jobData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      value={jobData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={jobData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Salary Range</label>
                    <input
                      type="text"
                      name="salary_range"
                      className="form-control"
                      placeholder="Example: 5-7 LPA"
                      value={jobData.salary_range}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      value={jobData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowJobModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publish Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;