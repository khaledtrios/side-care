import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

export default function NotesFormView({ currentNote }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      employe: currentNote?.employe || '',
      type: currentNote?.type || '',
      description: currentNote?.description || '',
      date: currentNote?.date || '',
      amount: currentNote?.amount || 0,
      tva20: currentNote?.tva20 || 0,
      tva10: currentNote?.tva10 || 0,
      tva5: currentNote?.tva5 || 0,
      tva2: currentNote?.tva2 || 0,
      file: currentNote?.file || 0,
    }),
    [currentNote]
  );

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        toast.success(currentNote ? 'Mise à jour réussie !' : 'Créez le succès !');
        router.push(paths.dashboard.evp.notes.root);
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ pt: 3, pb: 5, px: 3 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Field.Select
              fullWidth
              name="employe"
              label="Employé"
              InputLabelProps={{ shrink: true }}
            >
              {['Employé 1', 'Employé 2'].map((option) => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Select fullWidth name="type" label="Type" InputLabelProps={{ shrink: true }}>
              {['Déplacement', 'Repas durant un déplacement professionnel'].map((option) => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={12}>
            <Field.Text name="description" rows={4} label="Description" multiline/>
          </Grid>
          <Grid xs={12} md={6}>
            <Field.DatePicker name="date" label="Date" />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text name="amount" label="Montant (en €)" type="number" />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text name="tva20" label="Dont TVA 20% (en €)" type="number" />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text name="tva10" label="Dont TVA 10% (en €)" type="number" />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text name="tva5" label="Dont TVA 5,5% (en €)" type="number" />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text name="tva2" label="Dont TVA 2,1% (en €)" type="number" />
          </Grid>
          <Grid xs={12}>
            <Field.Upload name="file" />
          </Grid>
        </Grid>
        <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end" mt={2}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ ml: 2 }}
          >
            {!currentNote ? 'Creér' : 'Modifier'}
          </LoadingButton>
        </Box>
      </Card>
    </Form>
  );
}
