import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate=useNavigate();
    const [credentials, setcredentials] = useState({
        name: "",

        email: "",

        password: "",

    });
    const change = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,

            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            navigate("/");
            
        }

    }
    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={change} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={change} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={change} id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
            </div>
        </>
    )
}
export default Signup;