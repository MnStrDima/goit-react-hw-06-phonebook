import { Component } from 'react';
import { connect } from 'react-redux';
import phoneBookActions from './redux/phoneBook/phoneBook-actions';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import baseTransitionStyles from './transitionStyles/baseTransitionStyles.module.css';
import filterTransitionStyles from './transitionStyles/filterTransition.module.css';
import notificationTransitionStyles from './transitionStyles/notificationTransition.module.css';
import ContactList from './components/ContactList/ContactList';
import styles from './transitionStyles/app.module.css';
import Notification from './components/Notification/Notification';

class App extends Component {
  state = {
    isContactExists: false,
  };

  handleSubmit = contactObj => {
    if (this.props.contacts.some(({ name }) => name === contactObj.name)) {
      this.setState({ isContactExists: true });
      setTimeout(() => {
        this.setState({ isContactExists: false });
      }, 3000);

      return;
    }
    this.props.addContact(contactObj);

    return this.setState({ isContactExists: false });
  };

  render() {
    const { contacts } = this.props;
    const { isContactExists } = this.state;
    return (
      <div>
        <CSSTransition
          in={isContactExists}
          timeout={250}
          unmountOnExit
          classNames={notificationTransitionStyles}
        >
          <Notification message="This contact already exists in your phonebook." />
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          classNames={baseTransitionStyles}
          timeout={500}
          unmountOnExit
        >
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>

        <ContactForm onSubmit={this.handleSubmit} />

        {contacts.length > 0 && <h2 className={styles.title}>Contacts:</h2>}

        <CSSTransition
          in={contacts.length > 1}
          classNames={filterTransitionStyles}
          timeout={250}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>

        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  addContact: contactObj => dispatch(phoneBookActions.addContact(contactObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
