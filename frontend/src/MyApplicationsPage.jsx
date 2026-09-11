import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://127.0.0.1:8000/my-applications/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Applications:", res.data);
        setApplications(res.data);
      } catch (err) {
        console.log("ERROR:", err.response?.data);
        setError(
          err.response?.data?.detail || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <h3 className="text-primary fw-bold mb-0">JobPortal</h3>

          <nav className="d-none d-md-flex gap-4">
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none text-primary fw-bold"
                  : "text-decoration-none text-dark"
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to="/my-applications"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none text-primary fw-bold"
                  : "text-decoration-none text-dark"
              }
            >
              My Applications
            </NavLink>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <span className="text-secondary">Hello, {username}</span>

            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
              style={{ width: "40px", height: "40px" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5 flex-grow-1">
        <div className="mb-4">
          <h2 className="fw-bold">My Applications</h2>
          <p className="text-muted">Track the jobs you have applied for.</p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <p>Loading applications...</p>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && applications.length === 0 && (
          <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
              <h5>No Applications Found</h5>
              <p className="text-muted">
                You haven't applied for any jobs yet.
              </p>
              <NavLink to="/jobs" className="btn btn-primary">
                Browse Jobs
              </NavLink>
            </div>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="row">
            {applications.map((application) => {
              // Extract fields safely whether flat or nested from DRF Serializer
              const title =
                application.job_title ||
                application.job_details?.title ||
                application.job?.title ||
                "N/A";

              const company =
                application.company ||
                application.job_details?.company ||
                application.job?.company ||
                "N/A";

              const location =
                application.location ||
                application.job_details?.location ||
                application.job?.location ||
                "N/A";

              const status = application.status || "pending";

              return (
                <div className="col-md-6 mb-4" key={application.id}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body p-4">
                      <h4 className="text-primary fw-bold mb-1">{title}</h4>
                      <h6 className="text-dark mb-2">{company}</h6>

                      <p className="text-muted mb-2">📍 {location}</p>

                      <p className="mb-3 text-secondary small">
                        Applied on:{" "}
                        {new Date(application.applied_on).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <span
                        className={`badge ${
                          status === "pending"
                            ? "bg-warning text-dark"
                            : status === "shortlisted"
                            ? "bg-success"
                            : status === "rejected"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-3">
        <div className="container text-center text-muted">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default MyApplications;