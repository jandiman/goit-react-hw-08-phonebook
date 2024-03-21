import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { selectLoading } from '../../redux/tasks/tasksSelectors';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <TaskEditor />
      <div>{isLoading && 'Request in progress...'}</div>
      <TaskList />
    </HelmetProvider>
  );
};

export default ContactsPage;
