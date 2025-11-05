import dayjs from 'dayjs';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Button,
  MenuItem,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

export default function TransportFormPonctuel({ currentTransport }) {
  const router = useRouter();

  const defaultValues = useMemo(() => ({
    employe: currentTransport?.employe || '',
    period: currentTransport?.period || dayjs().startOf('month').format('YYYY-MM-DD'),
    type: currentTransport?.type || '',
    amount: currentTransport?.amount || 0,
    justificatif: currentTransport?.justificatif || null,
  }), [currentTransport]);

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success(currentTransport ? 'Mise à jour réussie !' : 'Création réussie !');
      reset();
      router.push(paths.dashboard.evp.notes.root);
      console.info('SUBMIT DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ pt: 3, pb: 5, px: 3 }}>
        <Grid container spacing={3}>
          {/* Employé */}
          <Grid xs={12} md={6}>
            <Field.Select
              fullWidth
              name="employe"
              label="Employé"
              InputLabelProps={{ shrink: true }}
            >
              {['Employé 1', 'Employé 2'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          {/* Période */}
          <Grid xs={12} md={6}>
            <Field.DatePicker
              fullWidth
              name="period"
              label="Période"
              views={['month', 'year']}
              format="MMMM YYYY"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Type */}
          <Grid xs={12} md={6}>
            <Field.Select
              fullWidth
              name="type"
              label="Type de frais de transport"
              InputLabelProps={{ shrink: true }}
            >
              {['Transport personnel', 'Transport public', 'Transport vélo'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          {/* Montant */}
          <Grid xs={12} md={6}>
            <Field.Text
              fullWidth
              name="amount"
              label="Montant mensuel (en €)"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Justificatif */}
          <Grid xs={12}>
            <Field.Upload
              name="justificatif"
              label="Ajouter un justificatif pour la période"
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {currentTransport ? 'Mettre à jour' : 'Enregistrer'}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Form>
  );
}
