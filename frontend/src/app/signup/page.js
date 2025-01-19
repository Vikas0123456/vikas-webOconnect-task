'use client'

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField } from 'formik-mui';
import { Button, Box, Typography } from '@mui/material';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Signup() {
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
        await axios.post(`${process.env.API_URL}/register`, values);
      setSuccessMessage('User registered successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field
                component={TextField}
                name="username"
                label="Username"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                component={TextField}
                name="email"
                label="Email"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              Signup
            </Button>
          </Form>
        )}
      </Formik>
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}
    </Box>
  );
}
