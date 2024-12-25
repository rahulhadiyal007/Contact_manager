import React, { useState } from 'react';
import './Addcont.css';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddContact({ abc }) {
    const [state, setState] = useState({
        name: "",
        mobile: "",
        email: ""
    });

    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if (state.name === "" || state.mobile === "" || state.email === "") {
            alert("All fields are mandatory");
            return;
        }

        abc(state);
        setState({
            name: "",
            mobile: "",
            email: ""
        });

    
    };

    return (
        <div className='main-add-contact'>
            <h2>Add Contact</h2>
            <form onSubmit={add}>
                <div className="form-group">
                    <label htmlFor="usr">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="usr"
                        placeholder='Enter Name'
                        pattern="[A-Za-z\s]+" // Only allows letters and spaces
                        required
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mbl">Mobile:</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mbl"
                        placeholder='Enter Mobile Number'
                        pattern="\d{10}" 
                        required
                        value={state.mobile}
                        onChange={(e) => setState({ ...state, mobile: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder='Enter Email'
                        value={state.email}
                        required
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Add</button>
                <button type='button' className='btn btn-secondary' onClick={() => navigate("/")}><FontAwesomeIcon icon={faArrowLeft} />  Back to Contact List</button>
            </form>
        </div>
    );
}

export default AddContact;