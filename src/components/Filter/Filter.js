import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import styles from './Filter.module.css';

function Filter({ initialValue, onFilterChange }) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.filterLabel}>
        Find contacts by name:
        <input
          className={styles.filterInput}
          type="text"
          name="name"
          value={initialValue}
          onChange={e => {
            onFilterChange(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

const mapStateToProps = state => ({
  initialValue: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: value => dispatch(phoneBookActions.changeFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.defaultProps = {
  initialValue: '',
};
Filter.propTypes = PropTypes.shape({
  initialValue: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}).isRequired;
