import dayjs from 'dayjs';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Card, Button, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SalariesContent } from 'src/layouts/salarie';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const getMonthOptions = (isEnd = false) => {
  const options = [];
  const now = dayjs().startOf('month');

  for (let i = 0; i < 12; i += 1) {
    const date = now.add(i, 'month');
    const value = isEnd
      ? date.endOf('month').format('YYYY-MM-DD')
      : date.startOf('month').format('YYYY-MM-DD');
    const label = date.format('MMMM YYYY'); // e.g., "Juin 2025"
    options.push({ label, value });
  }

  return options;
};

export default function TransportAddReccurent({ currentTransport }) {
    const router = useRouter();
    
      const defaultValues = useMemo(
        () => ({
          employe: currentTransport?.employe || '',
          type: currentTransport?.type || '',
          amount: currentTransport?.amount || 0,
          startMonth: currentTransport?.startMonth || dayjs().startOf('month').format('YYYY-MM-DD'),
          endMonth:
            currentTransport?.endMonth || dayjs().add(11, 'month').endOf('month').format('YYYY-MM-DD'),
    
          justificatifFrequency: currentTransport?.justificatifFrequency || 'Mensuelle',
        }),
        [currentTransport]
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
          toast.success(currentTransport ? 'Mise à jour réussie !' : 'Créez le succès !');
          router.push(paths.salaries.transport.root);
          console.info('DATA', data);
        } catch (error) {
          console.error(error);
        }
      });
  return (
    <SalariesContent>
      <CustomBreadcrumbs
        heading="Ajouter un titre de transport récurrent"
        links={[
          { name: 'Tableau de bord', href: paths.salaries.root },
          { name: 'Titres de transport', href: paths.salaries.transport.root },
          { name: 'Ajouter récurrent' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
            <Card sx={{ pt: 3, pb: 5, px: 3 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} />
      
                <Grid xs={12} md={6}>
                  <Field.Select
                    fullWidth
                    name="type"
                    label="Type de transport"
                    InputLabelProps={{ shrink: true }}
                  >
                    {['Transport personnel', 'Transport public'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
      
                <Grid xs={12} md={6}>
                  <Field.Text
                    fullWidth
                    name="amount"
                    label="Montant mensuel (en €)"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
      
                <Grid xs={12} md={6}>
                  <Field.Select
                    fullWidth
                    name="startMonth"
                    label="Début de la récurrence"
                    InputLabelProps={{ shrink: true }}
                  >
                    {getMonthOptions(false).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
      
                <Grid xs={12} md={6}>
                  <Field.Select
                    fullWidth
                    name="justificatifFrequency"
                    label="Fréquence du justificatif"
                    InputLabelProps={{ shrink: true }}
                  >
                    {['Mensuelle', 'Annuelle'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
      
                <Grid xs={12} md={6}>
                  <Field.Select
                    fullWidth
                    name="endMonth"
                    label="Fin de la récurrence"
                    InputLabelProps={{ shrink: true }}
                  >
                    {getMonthOptions(true).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                <Grid>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {currentTransport ? 'Mettre à jour' : 'Enregistrer'}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Form>
    </SalariesContent>
  );
}
