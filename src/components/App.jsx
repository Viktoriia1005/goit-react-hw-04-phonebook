import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container'
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import useLocalStorage from '../hooks/useLocalStorage'

import s from './App.module.css'


export default function App () {
  const [contacts, setContacts] = useLocalStorage('contactList', []);
  const [filter, setFilter] = useState('');

  
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  
 const filterContacts = () => {
  
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const formSubmit = ({ name, number }) => {
    const isContact = contacts.find(contact => contact.name === name);
    if (isContact) {
      alert(`${name} is already in contact`);
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };
  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
    };

    return (
      <Container>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmit}/>
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList 
      contacts={filterContacts(filter)}
      onDeleteContact={deleteContact}/>
      </Container>
    )
  
}
