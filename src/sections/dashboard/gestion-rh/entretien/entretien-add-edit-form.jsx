import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Stack, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

export default function EntretienAddEditForm({ currentEntretien }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      entreprise: currentEntretien?.entreprise || '',
      employe: currentEntretien?.employe || '',
      type: currentEntretien?.type || '',
      date: currentEntretien?.date || '',
      info: currentEntretien?.info || '',
    }),
    [currentEntretien]
  );

  const methods = useForm({
    mode: 'onSubmit',
    // resolver: zodResolver(NewUserSchema),
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
      toast.success(currentEntretien ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.gestionRh.entretien.root);
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
              name="entreprise"
              label="Entreprise"
              InputLabelProps={{ shrink: true }}
            >
              {['Entreprise 1', 'Entreprise 2'].map((option) => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
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
            <Field.Select
              fullWidth
              name="type"
              label="Type d'entretien"
              InputLabelProps={{ shrink: true }}
            >
              {['Entretien étape projet', 'Entretien professionel'].map((option) => (
                <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={1.5}>
              <Field.MobileDateTimePicker name="date" label="Date" />
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Field.Text
              name="info"
              multiline
              rows={4}
              label="Informations"
              placeholder="Informations pour le salarié (ex: lieu, etc.)"
              InputLabelProps={{ shrink: true }}
            />
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
            {!currentEntretien ? 'Creér' : 'Modifier'}
          </LoadingButton>
        </Box>
      </Card>
    </Form>
  );
}
