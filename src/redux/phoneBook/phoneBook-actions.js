import { createAction } from '@reduxjs/toolkit';

const DELETE = 'phoneBook/Delete';
const ADD = 'phoneBook/Add';
const CHANGE_FILTER = 'phoneBook/ChangeFilter';

const addContact = createAction(ADD);

const deleteContact = createAction(DELETE);

const changeFilter = createAction(CHANGE_FILTER);

export default { addContact, deleteContact, changeFilter };
