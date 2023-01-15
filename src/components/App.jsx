import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    contacts: [],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  handleFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  deleteUser = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== userId),
    }));
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({
        contacts: [...JSON.parse(localStorage.getItem('contacts'))],
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.handleFilterContacts();
    return (
      <>
        <h1 style={{ textAlign: 'center', margin: '10px 0 10px 0' }}>
          Phonebook
        </h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2 style={{ textAlign: 'center', margin: '10px 0 10px 0' }}>
          Contacts
        </h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter filter={filter} handleChange={this.handleChange} />
            <ContactList
              filterContacts={filterContacts}
              deleteUser={this.deleteUser}
            />
          </>
        ) : (
          <p style={{ textAlign: 'center', margin: '10px 0 10px 0' }}>
            You don't have contacts yet!
          </p>
        )}
      </>
    );
  }
}
