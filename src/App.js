import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactDetail from './components/ContactDetail';
import axios from 'axios';
import EditContact from './components/EditContact';
import NotFound from './components/NotFound';

// Use the live Render URL
const API_URL = 'https://contact-manager-json-server.onrender.com/contacts';

function App() {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL); // Updated API URL
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Generate random light background color for contact
  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Add a new contact
  const addContactHandler = async (newContact) => {
    try {
      const contactWithId = {
        ...newContact,
        id: uuidv4(),
        backgroundColor: getRandomLightColor(),
      };
      await axios.post(API_URL, contactWithId); // Updated API URL
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  // Remove a contact
  const removeContactHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Updated API URL
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Update a contact
  const updateContactHandler = async (updatedContact) => {
    try {
      await axios.put(`${API_URL}/${updatedContact.id}`, updatedContact); // Updated API URL
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact onAddContact={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                onDeleteContact={removeContactHandler}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail contacts={contacts} />}
          />
          <Route
            path="/edit/:id"
            element={
              <EditContact
                contacts={contacts}
                onUpdateContact={updateContactHandler}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
