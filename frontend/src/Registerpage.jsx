// import React, { useState } from "react";
// import axios from "axios"
// import { NavLink } from "react-router-dom";

// function Registerpage() {
//   const [inputdata, setInputData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleinput = (e) => {
//     setInputData({
//       ...inputdata,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlesend = async (e) => {
//     e.preventDefault();

//     console.log(inputdata);

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/register/",
//         inputdata
//       );

//       alert("Registered Successfully");
//       console.log(res.data);

//       setInputData({
//         username: "",
//         email: "",
//         password: "",
//       });

//     } catch (err) {
//       console.log(err.response?.data);
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
//               Register with JobPortal and get matched with the right
//               opportunities. Build your profile and apply to jobs in top
//               companies.
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
//               <h3 className="fw-bold">Create your JobPortal profile</h3>

//               <p className="text-muted">
//                 Search & apply to jobs from India's top companies
//               </p>

//               <form onSubmit={handlesend}>
//                 <div className="mb-3">
//                   <label className="form-label">Username</label>
//                   <input
//                     name="username"
//                     type="text"
//                     className="form-control"
//                     value={inputdata.username}
//                     placeholder="Enter username"
//                     onChange={handleinput}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Email ID</label>
//                   <input
//                     name="email"
//                     type="email"
//                     className="form-control"
//                     value={inputdata.email}
//                     placeholder="Enter email"
//                     onChange={handleinput}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     name="password"
//                     type="password"
//                     className="form-control"
//                     value={inputdata.password}
//                     placeholder="Minimum 6 characters"
//                     onChange={handleinput}
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary w-100">submit
//                 </button>

//                 <p className="text-center text-muted small mt-3">
//                   By registering, you agree to our{" "}
//                   <a href="#" className="text-decoration-none">
//                     Terms & Conditions
//                   </a>
//                 </p>

//                 <p className="text-center mt-2">
//                   Already registered?{" "}
//                   <NavLink to={"/login"} className="text-decoration-none fw-bold">
//                     Login here
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

// export default Registerpage; 