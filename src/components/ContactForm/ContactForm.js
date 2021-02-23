import { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import styles from './ContactForm.module.css';
import Notification from '../Notification/Notification';

uuidv4();

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0930939393')
    .required("Enter contact's phone"),
});

class ContactForm extends Component {
  state = { name: '', number: '', isContactExists: false };

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
    const { isContactExists } = this.state;
    return (
      <>
        <Notification
          isContactExists={isContactExists}
          message="This contact already exists in your phonebook."
        />
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={({ name, number }, { resetForm, setSubmitting }) => {
            this.handleSubmit({ name, number, id: uuidv4() });
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form className={styles.contactForm}>
            <label className={styles.nameLabel}>
              Name:
              <Field
                type="text"
                name="name"
                className={styles.contactFormInput}
              />
              <span className={styles.errorMessage}>
                <ErrorMessage name="name" />
              </span>
            </label>

            <label className={styles.numberLabel}>
              Number:
              <Field
                type="tel"
                name="number"
                className={styles.contactFormInput}
              />
              <span className={styles.errorMessage}>
                <ErrorMessage name="number" />
              </span>
            </label>
            <button type="submit" className={styles.submitButton}>
              Add contact
            </button>
          </Form>
        </Formik>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  addContact: contactObj => dispatch(phoneBookActions.addContact(contactObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
