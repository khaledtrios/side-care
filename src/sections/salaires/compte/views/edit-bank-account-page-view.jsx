import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Typography, Grid } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { getBankAccountById, updateBankAccount } from 'src/_mock/_bankAccounts';
import { Form, Field } from 'src/components/hook-form';

export default function EditBankAccountView() {
  const router = useRouter();
  const { id } = useParams();
  const account = getBankAccountById(id);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      libelle: account?.libelle || '',
      rib: account?.rib || '',
      iban: account?.iban || '',
      bic: account?.bic || '',
      document: account?.document || null,
    }
  });

  const onSubmit = async (data) => {
    try {
      updateBankAccount(id, {
        libelle: data.libelle,
        rib: data.rib || '',
        iban: data.iban || '',
        bic: data.bic || '',
        document: data.document || null,
        isPersisted: true,
      });
      router.push(paths.salaries.compte.bankAccountDetails(id));
    } catch (error) {
      console.error(error);
    }
  };

  if (!account) {
    return (
      <Card sx={{ p: 3 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Ce compte bancaire est introuvable.</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Form methods={{ control, handleSubmit }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Modifier le compte bancaire
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

            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                RIB
              </Typography>
              <Field.Upload
                name="rib"
                fullWidth
                sx={{ mb: 2 }}
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


