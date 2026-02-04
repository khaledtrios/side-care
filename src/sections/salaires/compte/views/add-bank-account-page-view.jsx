import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Button, TextField, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uuidv4 } from 'src/utils/uuidv4';

import { createBankAccount } from 'src/_mock/_bankAccounts';

// Assuming you have the custom `Field` component in your project
import { Form, Field } from 'src/components/hook-form'; 

export default function AjouterCompteBancaire() {
  const router = useRouter();

  // Initialize react-hook-form
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      libelle: '',
      rib: '',
      iban: '',
      bic: '',
      document: null,
    }
  });

  const onSubmit = async (data) => {
    try {
      const id = uuidv4();
      const payload = {
        id,
        libelle: data.libelle,
        rib: data.rib || '',
        iban: data.iban || '',
        bic: data.bic || '',
        document: data.document || null,
        isPersisted: true,
      };
      createBankAccount(payload);
      router.push(paths.salaries.compte.bankAccountDetails(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form methods={{ control, handleSubmit }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter un compte bancaire
        </Typography>

        <Card sx={{ mb: 3 }}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <Field.Text
                name="libelle"
                label="Libellé"
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Field.Text
                name="rib"
                label="RIB"
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                RIB
              </Typography>
              <Field.Upload
                name="rib"
                fullWidth
                sx={{ mb: 2 }}  // Ensure consistent margin like other fields
              />
            </Grid>

            <Grid item xs={12}>
              <Field.Text
                name="iban"
                label="IBAN (Exemple : FR14 2004 1010 0505 0001 3M02)"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field.Text
                name="bic"
                label="BIC (Exemple : CRPLYFRPP)"
                fullWidth
              />
            </Grid>

            {/* File Upload Field */}
            {/* <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Joindre un document
              </Typography>
              <Field.Upload
                name="document"
                fullWidth
                sx={{ mb: 2 }}  // Ensure consistent margin like other fields
              />
            </Grid> */}
          </Grid>

          <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end" mt={2} sx={{ p: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              onClick={onSubmit}
            >
              Enregistrer
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </Form>
  );
}
