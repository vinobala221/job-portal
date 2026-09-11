// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// function JobListpage() {
//   const [jobs, setJobs] = useState([]);
//   const [appliedJobIds, setAppliedJobIds] = useState([]); // Store IDs of applied jobs
//   const [loading, setLoading] = useState(true);

//   const username = localStorage.getItem("username") || "User";
//   const token = localStorage.getItem("accessToken");
//   const navigate = useNavigate();

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   // 1. Fetch All Jobs & Applied Jobs List
//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Fetch all jobs
//     fetch("http://127.0.0.1:8000/jobs/")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         return res.json();
//       })
//       .then((data) => {
//         setJobs(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch jobs:", err);
//         setLoading(false);
//       });

//     // Fetch Candidate's Applied Job IDs
//     fetch("http://127.0.0.1:8000/my-applications/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch applications");
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           // Handles both ID number or nested Job Object safely
//           const jobIds = data.map((app) =>
//             typeof app.job === "object" ? app.job.id : app.job
//           );
//           setAppliedJobIds(jobIds);
//         }
//       })
//       .catch((err) => console.error("Failed to fetch applications:", err));
//   }, [token, navigate]);

//   // 2. Handle Direct Apply Click
//   const handleApply = (jobId) => {
//     if (!token) {
//       alert("Please login to apply!");
//       navigate("/login");
//       return;
//     }

//     fetch("http://127.0.0.1:8000/apply/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ job: jobId }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.ok) {
//           alert("Application Submitted Successfully! 🎉");
//           setAppliedJobIds((prevIds) => [...prevIds, jobId]); // Instantly disable the button
//         } else {
//           alert(data.message || data.detail || "Failed to apply");
//         }
//       })
//       .catch((err) => console.error("Error applying:", err));
//   };

//   return (
//     <div className="bg-light d-flex flex-column min-vh-100">
//       {/* Header */}
//       <header className="bg-white border-bottom shadow-sm">
//         <div className="container py-3 d-flex justify-content-between align-items-center">
//           <h3 className="text-primary fw-bold m-0">JobPortal</h3>

//           {/* Navigation Links */}
//           <nav className="d-none d-md-flex gap-4">

//             <NavLink
//               to="/jobs"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-decoration-none text-primary fw-bold"
//                   : "text-decoration-none text-dark"
//               }
//             >
//               Jobs
//             </NavLink>

//             <NavLink
//               to="/my-applications"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-decoration-none text-primary fw-bold"
//                   : "text-decoration-none text-dark"
//               }
//             >
//               My Applications
//             </NavLink>

//             <NavLink
//               to="/resume-upload"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-decoration-none text-primary fw-bold"
//                   : "text-decoration-none text-dark"
//               }
//             >
//               Upload Resume
//             </NavLink>

//           </nav>
//           <div className="d-flex align-items-center gap-3">
//             <span className="text-secondary">Hello, {username}</span>

//             {/* User Avatar */}
//             <div
//               className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
//               style={{ width: "40px", height: "40px" }}
//             >
//               {username.charAt(0).toUpperCase()}
//             </div>

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="btn btn-outline-danger btn-sm"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container py-5 flex-grow-1">
//         <div className="mb-4">
//           <h2 className="fw-bold">Recommended Jobs</h2>
//           <p className="text-muted">
//             Jobs based on your profile and preferences
//           </p>
//         </div>

//         {loading ? (
//           <p className="text-center py-5">Loading available jobs...</p>
//         ) : jobs.length === 0 ? (
//           <p className="text-center py-5 text-muted">No Jobs Found</p>
//         ) : (
//           jobs.map((job) => {
//             const isApplied = appliedJobIds.includes(job.id);

//             return (
//               <div className="card shadow-sm mb-4 border-0" key={job.id}>
//                 <div className="card-body p-4">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <h4 className="text-primary fw-bold mb-1">{job.title}</h4>
//                       <h6 className="text-secondary mb-2">{job.company}</h6>
//                     </div>
//                     <small className="text-muted">
//                       {new Date(job.posted_on).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </small>
//                   </div>

//                   <p className="card-text text-secondary my-3">
//                     {job.description}
//                   </p>

//                   <div className="mb-3">
//                     <span className="badge bg-secondary me-2 p-2">
//                       📍 {job.location}
//                     </span>
//                     <span className="badge bg-success me-2 p-2">
//                       💰 {job.salary_range || "Not Specified"}
//                     </span>
//                     <span className="badge bg-primary p-2">
//                       🕒 Full Time
//                     </span>
//                   </div>

//                   <div className="text-end">
//                     {isApplied ? (
//                       <button className="btn btn-success fw-bold" disabled>
//                         Already Applied ✅
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleApply(job.id)}
//                         className="btn btn-primary fw-bold"
//                       >
//                         Apply Now
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-top py-3">
//         <div className="container text-center text-muted">
//           © 2026 JobPortal.com | All rights reserved
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default JobListpage;



import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function JobListpage() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const username = localStorage.getItem("username") || "User";
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // =========================
  // FETCH JOBS & APPLICATIONS
  // =========================

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch all jobs
    fetch("http://127.0.0.1:8000/jobs/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });

    // Fetch candidate's applications
    fetch("http://127.0.0.1:8000/my-applications/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const jobIds = data.map((app) =>
            typeof app.job === "object" ? app.job.id : app.job
          );

          setAppliedJobIds(jobIds);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch applications:", err);
      });
  }, [token, navigate]);

  // =========================
  // RESUME SELECT
  // =========================

  const handleResumeChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedResume(null);
      return;
    }

    // Allow only PDF / DOC / DOCX
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF, DOC or DOCX files.");
      event.target.value = "";
      setSelectedResume(null);
      return;
    }

    // Maximum file size = 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Resume size should be less than 5 MB.");
      event.target.value = "";
      setSelectedResume(null);
      return;
    }

    setSelectedResume(file);
  };

  // =========================
  // APPLY JOB WITH RESUME
  // =========================

  const handleApply = async (jobId) => {
    if (!token) {
      alert("Please login to apply!");
      navigate("/login");
      return;
    }

    if (!selectedResume) {
      alert("Please upload your resume before applying!");
      return;
    }

    setApplyingJobId(jobId);

    const formData = new FormData();

    formData.append("job", jobId);
    formData.append("resume", selectedResume);

    try {
      const res = await fetch("http://127.0.0.1:8000/apply/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Application Submitted Successfully! 🎉");

        setAppliedJobIds((prevIds) => [...prevIds, jobId]);

        setSelectedResume(null);

        // Clear all file inputs
        const fileInputs = document.querySelectorAll(
          'input[type="file"]'
        );

        fileInputs.forEach((input) => {
          input.value = "";
        });
      } else {
        alert(
          data.message ||
            data.detail ||
            "Failed to apply"
        );
      }
    } catch (err) {
      console.error("Error applying:", err);
      alert("Something went wrong while applying!");
    } finally {
      setApplyingJobId(null);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="bg-light d-flex flex-column min-vh-100">

      {/* Header */}
      <header className="bg-white border-bottom shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          <h3 className="text-primary fw-bold m-0">
            JobPortal
          </h3>

          {/* Navigation */}
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

          {/* User Section */}
          <div className="d-flex align-items-center gap-3">

            <span className="text-secondary">
              Hello, {username}
            </span>

            {/* Avatar */}
            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>

            {/* Logout */}
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
          <h2 className="fw-bold">
            Recommended Jobs
          </h2>

          <p className="text-muted">
            Jobs based on your profile and preferences
          </p>
        </div>

        {/* Loading */}
        {loading ? (

          <p className="text-center py-5">
            Loading available jobs...
          </p>

        ) : jobs.length === 0 ? (

          <p className="text-center py-5 text-muted">
            No Jobs Found
          </p>

        ) : (

          jobs.map((job) => {

            const isApplied =
              appliedJobIds.includes(job.id);

            const isApplying =
              applyingJobId === job.id;

            return (

              <div
                className="card shadow-sm mb-4 border-0"
                key={job.id}
              >

                <div className="card-body p-4">

                  {/* Job Header */}
                  <div className="d-flex justify-content-between align-items-start">

                    <div>

                      <h4 className="text-primary fw-bold mb-1">
                        {job.title}
                      </h4>

                      <h6 className="text-secondary mb-2">
                        {job.company}
                      </h6>

                    </div>

                    <small className="text-muted">

                      {new Date(
                        job.posted_on
                      ).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}

                    </small>

                  </div>

                  {/* Description */}
                  <p className="card-text text-secondary my-3">
                    {job.description}
                  </p>

                  {/* Job Details */}
                  <div className="mb-3">

                    <span className="badge bg-secondary me-2 p-2">
                      📍 {job.location}
                    </span>

                    <span className="badge bg-success me-2 p-2">
                      💰 {job.salary_range || "Not Specified"}
                    </span>

                    <span className="badge bg-primary me-2 p-2">
                      🕒 {job.job_type || "Full Time"}
                    </span>

                  </div>

                  {/* Apply Section */}
                  <div className="border-top pt-3">

                    {isApplied ? (

                      <div className="text-end">

                        <button
                          className="btn btn-success fw-bold"
                          disabled
                        >
                          Already Applied ✅
                        </button>

                      </div>

                    ) : (

                      <div>

                        {/* Resume Upload */}
                        <label className="form-label fw-bold">
                          Upload Resume
                        </label>

                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="form-control mb-3"
                          onChange={handleResumeChange}
                        />

                        {selectedResume && (

                          <div className="alert alert-info py-2">
                            Selected Resume:{" "}
                            <strong>
                              {selectedResume.name}
                            </strong>
                          </div>

                        )}

                        {/* Apply Button */}
                        <div className="text-end">

                          <button
                            onClick={() =>
                              handleApply(job.id)
                            }
                            className="btn btn-primary fw-bold"
                            disabled={isApplying}
                          >

                            {isApplying
                              ? "Applying..."
                              : "Apply Now"}

                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            );
          })

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

export default JobListpage;