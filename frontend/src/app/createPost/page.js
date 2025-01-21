"use client";

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField } from 'formik-mui';
import { Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const PostSchema = Yup.object().shape({
  content: Yup.string()
    .min(1, 'Content must not be empty')
    .max(500, 'Content must be 500 characters or less')
    .required('Content is required'),
});

export default function CreatePost() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('You must be logged in to create a post.');
        return;
      }

      await axios.post(
        `${process.env.API_URL}/posts`,
        { content: values.content },
        { headers: { Authorization: token } }
      );
      setSuccessMessage('Post created successfully!');
      setTimeout(() => router.push('/'), 2000);
    } catch (error) {
      setErrorMessage('Failed to create post. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <Formik
        initialValues={{ content: '' }}
        validationSchema={PostSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field
                component={TextField}
                name="content"
                label="What's on your mind?"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              Post
            </Button>
          </Form>
        )}
      </Formik>
      {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
      {successMessage && <Typography color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}
    </Box>
  );
}
