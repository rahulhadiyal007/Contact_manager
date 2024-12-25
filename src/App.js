// ... other imports
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

const API_URL = 'https://contact-manager-json-server.onrender.com/contacts';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Fetched contacts:', response.data); // Log the response
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // ... other functions

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
                onDeleteContact={removeContactHandler} // Ensure this is passed correctly
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