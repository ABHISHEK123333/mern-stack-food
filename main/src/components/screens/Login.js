import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const navigate=useNavigate();
    const [credentials, setcredentials] = useState({

        email: "",

        password: "",

    });
    const change = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email: credentials.email,
                password: credentials.password,

            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Please Enter Valid Data");
        }
        if(json.success){
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("token",json.token);
            console.log(localStorage.setItem("token",json.token));
            navigate("/");
        }

    }
    return (

        <div>
            <div className="container">
                <form onSubmit={handlesubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={change} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={change} id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Don't Have An Account</Link>
                </form>
            </div>
        </div>

    )
}
export default Login;