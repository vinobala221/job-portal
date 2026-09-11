import React from "react";
import { NavLink } from "react-router-dom";
import homeBanner from "./assets/image1.png";
function Home() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* 1. HEADER / NAVBAR */}
      <header className="bg-white border-bottom sticky-top">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <NavLink to="/" className="text-decoration-none">
            <h3 className="text-primary fw-bold mb-0">JobPortal</h3>
          </NavLink>

          <nav className="d-none d-md-flex gap-4 align-items-center">

            <NavLink to="/about" className="text-decoration-none text-dark">
              About Us
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none text-dark">
              Contact
            </NavLink>
          </nav>

          {/* Candidate & Recruiter Dropdowns */}
          <div className="d-flex gap-2">
            {/* Candidate Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="candidateDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Candidate
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="candidateDropdown">
                <li>
                  <NavLink to="/candidate-login" className="dropdown-item">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/candidate-register" className="dropdown-item">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Recruiter Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="recruiterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recruiter
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="recruiterDropdown">
                <li>
                  <NavLink to="/recruiter-login" className="dropdown-item">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/recruiter-register" className="dropdown-item">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="bg-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">
                💼 Find Your Dream Job
              </span>
              <h1 className="display-4 fw-bold lh-sm mb-3">
                Find The Job That Fits <span className="text-primary">Your Life</span>
              </h1>
              <p className="lead text-muted mb-4">
                Search from thousands of job opportunities and build your career with top companies.
              </p>

              {/* Search Bar Container */}
              <div className="card border-0 shadow-sm p-2 mb-4 bg-light">
                <div className="row g-2">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent"
                      placeholder="🔍 Job title, keywords..."
                    />
                  </div>
                  <div className="col-md-4 border-start">
                    <input
                      type="text"
                      className="form-control border-0 bg-transparent"
                      placeholder="📍 Location"
                    />
                  </div>
                  <div className="col-md-3">
                    <NavLink to="/jobs" className="btn btn-primary w-100 fw-bold">
                      Search Jobs
                    </NavLink>
                  </div>
                </div>
              </div>

            </div>

            {/* Illustration Section */}
            <div className="col-lg-6 text-center">
              <img
                src={homeBanner}
                alt="Job Illustration"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "350px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR JOB CATEGORIES */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Popular Job Categories</h2>
            <p className="text-muted">Explore jobs in top categories and find the right opportunity for you.</p>
          </div>

          <div className="row g-4">
            {[
              { icon: "💻", title: "IT & Software", jobs: "2,345 Jobs" },
              { icon: "📈", title: "Marketing", jobs: "1,234 Jobs" },
              { icon: "💼", title: "Finance", jobs: "1,876 Jobs" },
              { icon: "👥", title: "Human Resources", jobs: "987 Jobs" },
              { icon: "🎨", title: "Design", jobs: "765 Jobs" },
              { icon: "➕", title: "More Categories", jobs: "Explore all" },
            ].map((cat, index) => (
              <div key={index} className="col-md-4 col-lg-2">
                <div className="card border-0 shadow-sm text-center p-3 h-100 bg-white hover-shadow transition">
                  <div className="fs-1 mb-2">{cat.icon}</div>
                  <h6 className="fw-bold mb-1">{cat.title}</h6>
                  <small className="text-muted">{cat.jobs}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 4. RECRUITER CTA BANNER */}
      <section className="container my-5">
        <div className="bg-primary text-white p-4 p-md-5 rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-center shadow">
          <div>
            <h3 className="fw-bold mb-2">Are you hiring?</h3>
            <p className="mb-0 text-white-50">Post a job and find the perfect candidate for your company.</p>
          </div>
          <NavLink to="/recruiter-register" className="btn btn-light text-primary btn-lg fw-bold mt-3 mt-md-0 px-4">
            Post a Job
          </NavLink>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
        <div className="container">
          <div className="row g-4 pb-4 border-bottom border-secondary">
            <div className="col-lg-4">
              <h4 className="text-primary fw-bold mb-3">JobPortal</h4>
              <p className="text-secondary">
                Connecting talent with opportunity. Find jobs, build careers, and grow your future with us.
              </p>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">For Candidates</h6>
              <ul className="list-unstyled text-secondary d-flex flex-column gap-2">
                <li><NavLink to="/jobs" className="text-decoration-none text-secondary">Browse Jobs</NavLink></li>
                <li><NavLink to="/candidate-login" className="text-decoration-none text-secondary">Candidate Login</NavLink></li>
                <li><NavLink to="/candidate-register" className="text-decoration-none text-secondary">Candidate Register</NavLink></li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">For Employers</h6>
              <ul className="list-unstyled text-secondary d-flex flex-column gap-2">
                <li><NavLink to="/recruiter-register" className="text-decoration-none text-secondary">Post a Job</NavLink></li>
                <li><NavLink to="/recruiter-login" className="text-decoration-none text-secondary">Employer Login</NavLink></li>
                <li><NavLink to="/recruiter-register" className="text-decoration-none text-secondary">Employer Register</NavLink></li>
              </ul>
            </div>

            <div className="col-lg-4">
              <h6 className="fw-bold mb-3">Newsletter</h6>
              <p className="text-secondary small">Subscribe to get the latest job updates directly to your inbox.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="text-center text-secondary pt-3 small">
            © 2026 JobPortal.com | All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;