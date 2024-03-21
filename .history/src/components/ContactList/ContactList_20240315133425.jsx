import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// prettier-ignore
import { selectFilteredContacts, selectError, selectIsLoading } from '../../redux/contacts/contactsSelector';
import { fetchContacts } from '../../redux/contacts/contactsOperation';
import { ContactListItem } from './ContactListItem/ContactListItem';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul>
      {isLoading && !error && <Loader />}

      {!isLoading && !error && filteredContacts.length === 0 && (
        <p>The Phonebook is empty. Please add a contact</p>
      )}

      {!isLoading &&
        !error &&
        filteredContacts.length > 0 &&
        filteredContacts.map(filteredContact => (
          <ContactListItem
            key={filteredContact.id}
            filteredContact={filteredContact}
          />
        ))}
    </ul>
  );
};
