import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './Container'
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import s from './App.module.css'


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  
  filterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  formSubmit = ({name, number}) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }
    
    const findContact = this.state.contacts.find(
      contact => contact.name === newContact.name
    );
    if (findContact) {
      alert (`${newContact.name} is already in contact`)
    }
    this.setState(({contacts}) => ({contacts: [newContact, ...contacts]}))
  }
  
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredResults = this.filterContacts();
    return (
      <Container>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={this.formSubmit}/>
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList 
      contacts={filteredResults}
      onDeleteContact={this.deleteContact}/>
      </Container>
    )
  }
}

export default App;