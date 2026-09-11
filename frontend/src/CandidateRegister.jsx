import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function CandidateRegister() {

    const navigate = useNavigate();

    const [inputdata, setInputData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleinput = (e) => {
        setInputData({
            ...inputdata,
            [e.target.name]: e.target.value,
        });
    };

    const handlesend = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/register/",
                inputdata
            );

            console.log(res.data);

            alert("Candidate Registered Successfully");

            setInputData({
                username: "",
                email: "",
                password: "",
            });

            navigate("/candidate-login");

        } catch (err) {

            console.log(err.response?.data);

            alert(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">

            <header className="bg-white border-bottom">
                <div className="container py-3">

                    <NavLink
                        to="/"
                        className="text-decoration-none"
                    >
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
                                Candidate Registration
                            </h3>

                            <p className="text-center text-muted">
                                Create your candidate account
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
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={inputdata.email}
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
                                >
                                    Register
                                </button>

                                <p className="text-center mt-3">
                                    Already registered?{" "}
                                    <NavLink
                                        to="/candidate-login"
                                        className="fw-bold text-decoration-none"
                                    >
                                        Login
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

export default CandidateRegister;