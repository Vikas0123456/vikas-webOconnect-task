"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from "formik-mui";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/login`, values);
      localStorage.setItem('token', response.data.token);
      router.push('/like-dislike');
    } catch (error) {
      setErrorMessage('Invalid credentials');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </Box>
  );
}