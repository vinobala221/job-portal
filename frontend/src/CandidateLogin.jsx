import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function CandidateLogin() {
    const navigate = useNavigate();

    const [inputdata, setInputData] = useState({
        username: "",
        password: "",
    });

    const [isPending, setIsPending] = useState(false);

    const handleinput = (e) => {
        setInputData({
            ...inputdata,
            [e.target.name]: e.target.value,
        });
    };

    const handlesend = async (e) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/login/",
                inputdata
            );

            localStorage.setItem("accessToken", res.data.access);
            localStorage.setItem("refreshToken", res.data.refresh);
            localStorage.setItem("username", inputdata.username);
            localStorage.setItem("role", "candidate");

            alert("Candidate Login Successfully");

            navigate("/jobs");

        } catch (err) {
            console.log(err.response?.data);

            alert(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Invalid Username or Password"
            );
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <header className="bg-white border-bottom">
                <div className="container py-3">
                    <NavLink to="/" className="text-decoration-none">
                        <h3 className="text-primary fw-bold mb-0">
                            JobPortal
                        </h3>
                    </NavLink>
                </div>
            </header>

            <main className="container py-5 flex-grow-1">

                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-5">

                        <div className="card shadow-sm border-0 p-4">

                            <h3 className="text-primary fw-bold text-center">
                                Candidate Login
                            </h3>

                            <p className="text-center text-muted">
                                Login to find and apply for jobs
                            </p>

                            <form onSubmit={handlesend}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={inputdata.username}
                                        onChange={handleinput}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={inputdata.password}
                                        onChange={handleinput}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isPending}
                                >
                                    {isPending
                                        ? "Logging in..."
                                        : "Candidate Login"}
                                </button>

                                <p className="text-center mt-3">
                                    New candidate?{" "}
                                    <NavLink
                                        to="/candidate-register"
                                        className="fw-bold text-decoration-none"
                                    >
                                        Register
                                    </NavLink>
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </main>

            <footer className="bg-white border-top py-3">
                <div className="container text-center text-muted">
                    © 2026 JobPortal.com
                </div>
            </footer>

        </div>
    );
}

export default CandidateLogin;