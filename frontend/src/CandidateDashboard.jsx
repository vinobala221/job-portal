import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function CandidateDashboard() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const username = localStorage.getItem("username");

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const token = localStorage.getItem("accessToken");

                const res = await axios.get(
                    "http://127.0.0.1:8000/my-applications/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Dashboard Applications:", res.data);

                setApplications(res.data);

            } catch (err) {

                console.log("Dashboard Error:", err.response?.data);

                setError(
                    err.response?.data?.detail ||
                    "Failed to load dashboard"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchApplications();

    }, []);

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (app) => app.status === "pending"
    ).length;

    const shortlistedApplications = applications.filter(
        (app) => app.status === "shortlisted"
    ).length;

    const rejectedApplications = applications.filter(
        (app) => app.status === "rejected"
    ).length;

    const hiredApplications = applications.filter(
        (app) => app.status === "hired"
    ).length;

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <header className="bg-white border-bottom">

                <div className="container py-3 d-flex justify-content-between align-items-center">

                    <h3 className="text-primary fw-bold mb-0">
                        JobPortal
                    </h3>

                    <nav className="d-none d-md-flex gap-4">

                        <NavLink
                            to="/jobs"
                            className="text-decoration-none text-dark"
                        >
                            Jobs
                        </NavLink>

                        <NavLink
                            to="/candidate-dashboard"
                            className="text-decoration-none text-primary fw-semibold"
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/my-applications"
                            className="text-decoration-none text-dark"
                        >
                            My Applications
                        </NavLink>

                    </nav>

                    <div className="d-flex align-items-center gap-3">

                        <span className="text-secondary">
                            Hello, {username}
                        </span>

                        <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
                            style={{
                                width: "40px",
                                height: "40px"
                            }}
                        >
                            {username
                                ? username.charAt(0).toUpperCase()
                                : "U"}
                        </div>

                    </div>

                </div>

            </header>

            <main className="container py-5 flex-grow-1">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Welcome, {username} 👋
                    </h2>

                    <p className="text-muted">
                        Track your job applications and application status.
                    </p>

                </div>

                {loading && (
                    <div className="text-center">
                        <p>Loading dashboard...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading && !error && (

                    <>

                        <div className="row mb-4">

                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <p className="text-muted mb-1">
                                            Total Applications
                                        </p>

                                        <h2 className="fw-bold text-primary">
                                            {totalApplications}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <p className="text-muted mb-1">
                                            Pending
                                        </p>

                                        <h2 className="fw-bold text-warning">
                                            {pendingApplications}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <p className="text-muted mb-1">
                                            Shortlisted
                                        </p>

                                        <h2 className="fw-bold text-success">
                                            {shortlistedApplications}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3 mb-3">

                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <p className="text-muted mb-1">
                                            Rejected
                                        </p>

                                        <h2 className="fw-bold text-danger">
                                            {rejectedApplications}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h4 className="fw-bold mb-0">
                                        Recent Applications
                                    </h4>

                                    <NavLink
                                        to="/my-applications"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View All
                                    </NavLink>

                                </div>

                                {applications.length === 0 ? (

                                    <div className="text-center py-4">

                                        <p className="text-muted">
                                            You haven't applied for any jobs yet.
                                        </p>

                                        <NavLink
                                            to="/jobs"
                                            className="btn btn-primary"
                                        >
                                            Browse Jobs
                                        </NavLink>

                                    </div>

                                ) : (

                                    applications.slice(0, 5).map((application) => (

                                        <div
                                            key={application.id}
                                            className="border-bottom py-3"
                                        >

                                            <div className="row align-items-center">

                                                <div className="col-md-5">

                                                    <h5 className="fw-bold mb-1">
                                                        {application.job_title}
                                                    </h5>

                                                    <p className="text-muted mb-0">
                                                        {application.company}
                                                    </p>

                                                </div>

                                                <div className="col-md-3">

                                                    <span className="text-muted">
                                                        📍 {application.location}
                                                    </span>

                                                </div>

                                                <div className="col-md-2">

                                                    <small className="text-muted">
                                                        {new Date(
                                                            application.applied_on
                                                        ).toLocaleDateString()}
                                                    </small>

                                                </div>

                                                <div className="col-md-2">

                                                    <span
                                                        className={`badge ${application.status === "pending"
                                                                ? "bg-warning text-dark"
                                                                : application.status === "shortlisted"
                                                                    ? "bg-success"
                                                                    : application.status === "rejected"
                                                                        ? "bg-danger"
                                                                        : "bg-primary"
                                                            }`}
                                                    >
                                                        {application.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            application.status.slice(1)}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>

                    </>

                )}

            </main>

            <footer className="bg-white border-top py-3">

                <div className="container text-center text-muted">

                    © 2026 JobPortal.com | All rights reserved

                </div>

            </footer>

        </div>
    );
}

export default CandidateDashboard;