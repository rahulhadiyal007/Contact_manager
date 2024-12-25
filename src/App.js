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
import NotFound from './components/NotFound'; // Create this component

const API_URL = 'https://my-json-server.typicode.com/rahulhadiyal007/Contact_manager';

function App() {
  const [contacts, setContacts] = useState([]);

  async function fetchContacts() {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const addContactHandler = async (newContact) => {
    try {
      const contactWithId = { ...newContact, id: uuidv4(), backgroundColor: getRandomLightColor() };
      await axios.post(`${API_URL}/contacts`, contactWithId);
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const removeContactHandler = async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`);
    fetchContacts();
  };

  const updateContactHandler = async (updatedContact) => {
    try {
      await axios.put(`${API_URL}/contacts/${updatedContact.id}`, updatedContact);
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
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for undefined paths */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;