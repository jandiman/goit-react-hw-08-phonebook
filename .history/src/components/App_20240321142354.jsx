import { useEffect, lazy } from 'react';
import { UseDispatch, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { refreshUser } from '../redux/auth/authOperations';
import { useAuth } from '../hooks/useAuth';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const HomePage = lazy(() => import ('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import ('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import ('../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import ('../pages/ContactsPage/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    const dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing...</b> 
    ) : (
   <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={<LoginPage />} />
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute redirectTo="/login" component={<TasksPage />} />
          }
        />
      </Route>
    </Routes>
  );
};
