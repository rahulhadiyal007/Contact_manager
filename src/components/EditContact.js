import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditContact({ contacts, updateContact }) {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const contact = contacts.find(contact => contact.id === id);

    // Initialize state with empty values
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    // Use useEffect to set the state when the contact is found
    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setMobile(contact.mobile);
            setEmail(contact.email);
        }
    }, [contact]);

    const handleSave = () => {
        const updatedContact = { id, name, mobile, email };
        updateContact(updatedContact);
        navigate(`/contact/${id}`);
    };

    const handleCancel = () => {
        navigate(`/contact/${id}`);
    };

    // If no contact is found, show a message
    if (!contact) {
        return <div>No contact details available.</div>;
    }

    return (
        <div className="edit-contact">
            <h2>Edit Contact</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        pattern="[A-Za-z\s]+" // Allows letters and spaces
                        title="Name should only contain letters and spaces."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        pattern="\d{10}" // Allows exactly 10 digits
                        title="Mobile number must be exactly 10 digits."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Basic email pattern
                        title="Please enter a valid email address."
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-warning" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditContact;