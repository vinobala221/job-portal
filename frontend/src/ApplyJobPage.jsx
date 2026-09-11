import React, { useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

function ApplyJobPage() {
    const { jobId } = useParams();
    const username = localStorage.getItem("username");

    const [result, setResult] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handlesend = async (e) => {
        e.preventDefault();

        setIsPending(true);

        try {
            const token = localStorage.getItem("accessToken");

            console.log("TOKEN:", token);
            console.log("JOB ID:", jobId);

            const res = await axios.post(
                "http://127.0.0.1:8000/apply/",
                {
                    job: jobId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", res.data);

            setResult({
                success: true,
                message: res.data.message,
            });

        } catch (err) {
            console.log("ERROR:", err.response?.data);

            setResult({
                success: false,
                message:
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    "Something went wrong",
            });

        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <header className="bg-white border-bottom">
                <div className="container py-3 d-flex justify-content-between align-items-center">

                    <h3 className="text-primary fw-bold mb-0">
                        JobPortal
                    </h3>

                    <nav className="d-none d-md-flex gap-4">
                        <a href="#" className="text-decoration-none text-dark">
                            Jobs
                        </a>

                        <a href="#" className="text-decoration-none text-dark">
                            Companies
                        </a>

                        <a href="#" className="text-decoration-none text-dark">
                            My Applications
                        </a>
                    </nav>

                    <div className="d-flex align-items-center gap-3">
                        <span className="text-secondary">
                            Hello, {username}
                        </span>

                        <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
                            style={{ width: "40px", height: "40px" }}
                        >
                            {username
                                ? username.charAt(0).toUpperCase()
                                : "U"}
                        </div>
                    </div>

                </div>
            </header>

            <main className="container flex-grow-1 py-4">

                <div className="mb-4">
                    <NavLink
                        to="/jobs"
                        className="text-decoration-none fw-semibold text-primary"
                    >
                        ← Back to Jobs
                    </NavLink>
                </div>

                <div className="d-flex justify-content-center">

                    <div
                        className="card shadow-sm"
                        style={{ maxWidth: "450px", width: "100%" }}
                    >

                        <div className="card-body p-4">

                            <h3 className="fw-bold">
                                Apply for this Job
                            </h3>

                            <p className="text-muted">
                                Your profile will be shared with the recruiter.
                            </p>

                            <form onSubmit={handlesend}>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mt-3"
                                    disabled={isPending}
                                >
                                    {isPending
                                        ? "Applying..."
                                        : "Apply Now"}
                                </button>

                                {result && (
                                    <p
                                        className={`text-center mt-3 ${
                                            result.success
                                                ? "text-success"
                                                : "text-danger"
                                        }`}
                                    >
                                        {result.message}
                                    </p>
                                )}

                            </form>

                        </div>

                    </div>

                </div>

            </main>

            <footer className="bg-white border-top py-3 mt-auto">
                <div className="container text-center text-muted">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>

        </div>
    );
}

export default ApplyJobPage;