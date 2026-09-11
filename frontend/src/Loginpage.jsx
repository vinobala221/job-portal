// import React, { useState } from "react";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";

// function Loginpage() {
//   const navigate = useNavigate();

//   const [inputdata, setInputData] = useState({
//     username: "",
//     password: "",
//   });

//   const [ispending, setIspending] = useState(false);

//   const handleinput = (e) => {
//     setInputData({
//       ...inputdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlesend = async (e) => {
//     e.preventDefault();

//     setIspending(true);

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/login/",
//         inputdata
//       );

//       console.log(res.data);

//       localStorage.setItem("accessToken", res.data.access);
//       localStorage.setItem("refreshToken", res.data.refresh);
//       localStorage.setItem("username", inputdata.username);
//       alert("Login Successfully");

//       setInputData({
//         username: "",
//         password: "",
//       });

//       navigate("/jobs");
//     } catch (err) {
//       console.log(err.response?.data);
//       alert(
//         err.response?.data?.message || "Invalid Username or Password"
//       );
//     } finally {
//       setIspending(false);
//     }
//   };

//   return (
//     <div className="bg-light text-dark">
//       <header className="bg-white border-bottom">
//         <div className="container py-3 d-flex justify-content-between align-items-center">
//           <h3 className="text-primary fw-bold m-0">JobPortal</h3>

//         </div>
//       </header>

//       <main className="container py-5">
//         <div className="row align-items-center">
//           <div className="col-md-6 d-none d-md-block">
//             <h1 className="fw-bold">Find your dream job now</h1>

//             <p className="text-secondary mt-3">
//               Login to your account and continue your job search.
//             </p>

//             <ul className="list-group list-group-flush mt-4">
//               <li className="list-group-item border-0 bg-light">
//                 ✔ Trusted by thousands of recruiters
//               </li>

//               <li className="list-group-item border-0 bg-light">
//                 ✔ Personalized job recommendations
//               </li>

//               <li className="list-group-item border-0 bg-light">
//                 ✔ Easy apply & profile visibility
//               </li>
//             </ul>
//           </div>

//           <div className="col-md-6">
//             <div className="card shadow-sm p-4">
//               <h3 className="text-primary fw-bold text-center">
//                 JobPortal
//               </h3>

//               <p className="text-center text-muted">
//                 Login to your account
//               </p>

//               <form onSubmit={handlesend}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     placeholder="Enter your username"
//                     value={inputdata.username}
//                     onChange={handleinput}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>

//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     placeholder="Enter your password"
//                     value={inputdata.password}
//                     onChange={handleinput}
//                     required
//                   />
//                 </div>

//                 <div className="text-end mb-3">
//                   <a
//                     href="#"
//                     className="text-decoration-none text-primary"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={ispending}
//                 >
//                   {ispending ? "Logging in..." : "Login"}
//                 </button>

//                 <p className="text-center mt-3">
//                   New to JobPortal?{" "}
//                   <NavLink
//                     to="/register"
//                     className="text-decoration-none fw-bold"
//                   >
//                     Register here
//                   </NavLink>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-white border-top py-3">
//         <div className="container text-center text-muted">
//           © 2026 JobPortal.com | All rights reserved
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Loginpage;