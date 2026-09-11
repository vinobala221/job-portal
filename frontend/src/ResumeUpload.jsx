import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResumeUpload() {
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!resume) {
            alert("Please select your resume");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);

        try {
            setUploading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/resume/upload/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setResume(null);

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to upload resume"
            );

        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-light min-vh-100">

            <header className="bg-white border-bottom shadow-sm">
                <div className="container py-3 d-flex justify-content-between align-items-center">

                    <h3 className="text-primary fw-bold mb-0">
                        JobPortal
                    </h3>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/jobs")}
                    >
                        Back to Jobs
                    </button>

                </div>
            </header>

            <main className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-7 col-lg-6">

                        <div className="card shadow-sm border-0">

                            <div className="card-body p-4">

                                <h3 className="fw-bold mb-2">
                                    Upload Resume
                                </h3>

                                <p className="text-muted">
                                    Upload your latest resume to apply for jobs.
                                </p>

                                <form onSubmit={handleUpload}>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Select Resume
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                                setResume(e.target.files[0]);
                                            }}
                                        />

                                        <small className="text-muted">
                                            PDF, DOC or DOCX
                                        </small>

                                    </div>

                                    {resume && (
                                        <div className="alert alert-info">
                                            Selected: {resume.name}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={uploading}
                                    >
                                        {uploading
                                            ? "Uploading..."
                                            : "Upload Resume"}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ResumeUpload;