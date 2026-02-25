import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Card, Button, Divider, MenuItem, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ComptableContent } from 'src/layouts/comptable';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function TransportParameter({ currentTransport }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      entreprise: currentTransport?.entreprise || '',
      prise: currentTransport?.prise || 50,
      relance: currentTransport?.relance || 'oui',
    }),
    [currentTransport]
  );

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
      toast.success(currentTransport ? 'Mise à jour réussie !' : 'Paramètres enregistrés !');
      reset();
      router.push(paths.comptable.transport.root);
      console.info('SUBMIT DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  // Mock data - replace with actual data
  const entreprisesList = ['Entreprise 1', 'Entreprise 2', 'Portorium Consulting', 'Sofrecom'];

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Politique de titres de transport"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Titres de transport', href: paths.comptable.transport.root },
          { name: 'Paramètres' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ pt: 3, pb: 5, px: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Field.Select
                fullWidth
                name="entreprise"
                label="Entreprise"
                InputLabelProps={{ shrink: true }}
              >
                {entreprisesList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field.Select>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            <Grid xs={12} md={6}>
              <Field.Text
                type="number"
                helperText="Le % est applicable aux transports publiques et personnels"
                name="prise"
                label="Part de prise en charge par l'entreprise (en %)"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">
                Relance automatique des collaborateurs pour l&apos;import des justificatifs ?
              </Typography>
              <Field.RadioGroup
                name="relance"
                row
                options={[
                  { value: 'oui', label: 'Oui' },
                  { value: 'non', label: 'Non' },
                ]}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Form>
    </ComptableContent>
  );
}
