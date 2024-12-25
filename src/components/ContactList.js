import React, { useState } from 'react';
import './contactList.css';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

function ContactList(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const deleteContactHandler = (id) => {
        props.getcontactid(id);
    };

    const filteredContacts = props.xyz.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.mobile.includes(searchTerm)
    );

    const renderContactList = filteredContacts.map((contact) => {
        return (
            <ContactCard key={contact.id} contact={contact} clickHandler={deleteContactHandler} />
        );
    });

    return (
        <div className='maincontlist'>
            <header className="contact-list-header">
                <h2>Contact List</h2>

            </header>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/add" className="link-button">
                    <button className='btn btn-success'>Add Contact</button>
                </Link>
            </div>
            <div className="contact-list">
                {renderContactList.length > 0 ? renderContactList : <p>No contacts found.</p>}
            </div>
        </div>
    );
}

export default ContactList;