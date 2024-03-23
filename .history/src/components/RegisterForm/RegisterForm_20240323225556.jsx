import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      error: '', // Clear any previous error when input changes
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setFormData(prevFormData => ({
        ...prevFormData,
        error: 'Passwords do not match',
      }));
      return;
    }

    // Password validation checks
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/^[a-zA-Z0-9]+$/.test(password)
    ) {
      setFormData(prevFormData => ({
        ...prevFormData,
        error:
          'Password should be at least 8 characters, contain at least 1 capital letter, and be a combination of letters and numbers',
      }));
      return;
    }

    dispatch(register({ name, email, password }));
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      {formData.error && <p style={{ color: 'red' }}>{formData.error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};
