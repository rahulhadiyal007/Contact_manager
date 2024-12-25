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

const API_URL = 'http://localhost:5000/contacts';

function App() {
  const [contacts, setContacts] = useState([]);

  async function fetchContacts() {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  const getRandomLightColor = () => {
    // Generate random values for red, green, and blue
    const r = Math.floor(Math.random() * 128 + 127); // Range: 127 to 255
    const g = Math.floor(Math.random() * 128 + 127); // Range: 127 to 255
    const b = Math.floor(Math.random() * 128 + 127); // Range: 127 to 255

    return `rgb(${r}, ${g}, ${b})`; // Return the RGB color
};

// Example of adding a new contact
const addContactHandler = async (newContact) => {
    try {
        const contactWithId = { ...newContact, id: uuidv4(), backgroundColor: getRandomLightColor() }; // Generate a unique ID and random color
        await axios.post(API_URL, contactWithId);
        fetchContacts(); // Refresh the contact list
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

  const removeContactHandler = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };

  const updateContactHandler = async (updatedContact) => {
    try {
      await axios.put(`${API_URL}/${updatedContact.id}`, updatedContact);
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/add' element={<AddContact abc={addContactHandler} />} />
          <Route path='/' element={<ContactList xyz={contacts} getcontactid={removeContactHandler} />} />
          <Route path='/contact/:id' element={<ContactDetail contacts={contacts} />} />
          <Route path='/edit/:id' element={<EditContact contacts={contacts} updateContact={updateContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;