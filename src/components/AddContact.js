import React, { useState } from 'react';
import './Addcont.css';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddContact({ onAddContact }) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(""); // To store form validation errors
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name || !mobile || !email) {
            return "All fields are mandatory";
        }
 
         const nameregex =  /^[a-zA-Z\s]*$/;
         if(!nameregex.test(name)){
            return "Name contain only alphabetic"
         }


        // Mobile number should be exactly 10 digits
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return "Mobile number must be exactly 10 digits";
        }
        // Email validation (simple)
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return ""; // No error
    };

    const addContact = (e) => {
        e.preventDefault();
        
        // Validate form before adding
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        
        // Clear previous error message
        setError("");

        // Create new contact object
        const newContact = { name, mobile, email };
        
        // Call the onAddContact function passed as prop
        onAddContact(newContact);
        
        // Reset the form fields
        setName("");
        setMobile("");
        setEmail("");
        
        // Navigate back to the contact list
        navigate("/");
    };

    return (
        <div className='main-add-contact'>
            <h2>Add Contact</h2>
            <form onSubmit={addContact}>
                <div className="form-group">
                    <label htmlFor="usr">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="usr"
                        placeholder='Enter Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mbl">Mobile:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mbl"
                        placeholder='Enter Mobile Number'
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder='Enter Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className='addcontactbtn' >
                <button type='submit' className='btn btn-primary'>Add</button>
                <button type='button' className='btn btn-secondary' onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} /> Back to Contact List</button>

                </div>
            </form>
        </div>
    );
}

export default AddContact;
