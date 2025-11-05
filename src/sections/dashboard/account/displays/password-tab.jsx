import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Alert,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ---------------------------------------------

const PasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule.')
      .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre.')
      .regex(/[^a-zA-Z0-9]/, 'Le mot de passe doit contenir un caractère spécial.'),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas.',
  });

export default function PasswordTab() {
  const methods = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Mot de passe mis à jour avec succès !');
      console.info('Nouveau mot de passe :', data.newPassword);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Alert severity="info">
            Votre mot de passe doit contenir au minimum <strong>8 caractères</strong>, <strong>1 chiffre</strong>, <strong>1 majuscule</strong> et <strong>1 caractère spécial</strong>.
          </Alert>

          <Field.Text
            name="newPassword"
            type="password"
            label="Nouveau mot de passe"
          />

          <Field.Text
            name="confirmPassword"
            type="password"
            label="Confirmer le mot de passe"
          />

          <Box display="flex" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Enregistrer
            </LoadingButton>
          </Box>
        </Stack>
      </Card>
    </Form>
  );
}
