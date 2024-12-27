import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import ContactDetail from './components/ContactDetail';
import EditContact from './components/EditContact';
 import NotFound from './components/NotFound';

 const API_URL = 'https://contact-manager-json-server.onrender.com/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error handling

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("fetched contacts", response.data)
      setContacts(response.data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Error fetching contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addContactHandler = async (contact) => {
    try {
      const response = await axios.post(API_URL, contact);
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (err) {
      console.error('Error adding contact:', err);
      setError('Error adding contact. Please try again later.');
    }
  };

  const updateContactHandler = async (updatedContact) => {
    try { 
      console.log("Updating contact with ID:", updatedContact.id);
      await axios.put(`${API_URL}/${updatedContact.id}`, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
    } catch (err) {
      console.error('Error updating contact:', err);
      setError('Error updating contact. Please try again later.');
    }
  };

  const removeContactHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Error deleting contact. Please try again later.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {loading && <p>Loading contacts...</p>}
        {error && <p>{error}</p>} {/* Display error message */}
        <Routes>
          <Route path="/add" element={<AddContact onAddContact={addContactHandler} />} />
          <Route path="/" element={<ContactList contacts={contacts} onDeleteContact={removeContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
          <Route path="/edit/:id" element={<EditContact contacts={contacts} onUpdateContact={updateContactHandler} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
