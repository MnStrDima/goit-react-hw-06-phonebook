import { connect } from 'react-redux';
import Title from './components/Title/Title';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import styles from './transitionStyles/app.module.css';

const App = ({ contacts }) => {
  return (
    <div>
      <Title title="Phonebook" />

      <ContactForm />

      {contacts.length > 0 && <h2 className={styles.title}>Contacts:</h2>}

      <Filter />

      <ContactList />
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

export default connect(mapStateToProps, null)(App);
