import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {

    const [credentials, setcredentials] = useState({name: "", email: "", password: "", confirmpassword: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Account Created Successfully", "success");
        }
        else{
            props.showAlert("Invald Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value});
    }

    return(
        <div className="container mt-2">
             <h2 className="my-3">Signup to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} aria-describedby="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword"  onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}