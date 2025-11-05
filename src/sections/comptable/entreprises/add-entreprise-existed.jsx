import React from 'react';
import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Button, CardHeader, InputLabel, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export const NewEntrepriseExistedSchema = zod.object({
  raisonSociale: zod
    .string({ message: 'Raison sociale ou SIRET requis' })
    .min(2, { message: 'Raison sociale ou SIRET trop court' })
    .max(100, { message: 'Raison sociale ou SIRET trop long' }),
});

export default function AddEntrepriseExisted() {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(NewEntrepriseExistedSchema),
    // defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success("Création de l'entreprise avec succès !");
      router.push(paths.comptable.entreprise.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Card>
      <CardHeader title="Ajouter une entreprise existante" />
      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cabinet associé à l&apos;entreprise :{' '}
            <Typography variant="subtitle2">Sidecare</Typography>
          </Typography>
          <InputLabel sx={{ mt: 3, mb: 1 }}>Renseignez la raison sociale ou le SIRET</InputLabel>
          <Field.Text
            name="raisonSociale"
            fullWidth
            placeholder="Saisir la raison sociale ou le SIRET"
          />
        </Box>
        <Box sx={{ p: 3, pt: 0, textAlign: 'right' }}>
          <Button
            type="submit"
            endIcon={<Iconify icon="eva:plus-fill" />}
            variant="contained"
            color="primary"
          >
            Ajouter l&apos;entreprise
          </Button>
        </Box>
      </Form>
    </Card>
  );
}
