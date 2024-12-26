import React, { useState, useEffect } from 'react';
import './EditContact.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditContact({ contacts, onUpdateContact }) {
    const navigate = useNavigate();
    const { id } = useParams(); // This id comes as a string, so we will parse it
    const contact = contacts.find(contact => contact.id === parseInt(id)); // Ensure the comparison is done correctly

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setMobile(contact.mobile);
            setEmail(contact.email);
        }
    }, [contact]);

    const handleSave = (e) => {
        e.preventDefault();

        if (!name || !mobile || !email) {
            return; // Add more validation if necessary
        }

        const updatedContact = { id: parseInt(id), name, mobile, email }; // Ensure id is a number
        onUpdateContact(updatedContact); // Call the onUpdateContact function passed from the parent
        navigate(`/contact/${id}`); // Navigate to the detail page after update
    };

    const handleCancel = () => {
        navigate(`/contact/${id}`); // Navigate back to the contact detail page
    };

    if (!contact) {
        return <div>No contact details available.</div>;
    }

    return (
        <div className="edit-contact">
            <h2>Edit Contact</h2>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        pattern="[A-Za-z\s]+"  // Pattern for name validation (only letters and spaces)
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
                        pattern="\d{10}"  // Validates a 10-digit mobile number
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Email validation pattern
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
