import { toast } from 'sonner';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { ENTREPRISE_LIST } from 'src/_mock/_entreprises';

import { Form, Field } from 'src/components/hook-form';

// Validation schema
const CabinetSchema = zod.object({
  lastName: zod.string().min(1, { message: 'Nom est requis' }),
  firstName: zod.string().min(1, { message: 'Prénom est requis' }),
  email: zod
    .string()
    .min(1, { message: 'Email est requis' })
    .email({ message: 'Email invalide' }),
  phone: zod.string().min(1, { message: 'Téléphone est requis' }),
  cabinet: zod.string().min(1, { message: 'Nom du cabinet est requis' }),
  entreprises: zod.string().array().nonempty({ message: 'Choisissez au moins une entreprise' }),
});

export default function CabinetsFormDialog({ open, onClose }) {
  const [entreprises, setEntreprises] = useState(
    ENTREPRISE_LIST.map((row) => ({
      label: `${row.name} Siret: ${row.siret}`,
      value: row.id,
    }))
  );

  const defaultValues = useMemo(() => ({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    cabinet: '',
    entreprises: [],
  }), []);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(CabinetSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      toast.promise(promise, {
        loading: 'Ajout...',
        success: 'Cabinet ajouté avec succès !',
        error: 'Erreur lors de l’ajout !',
      });

      await promise;

      console.info('Cabinet data:', data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter un Cabinet</DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 3 }}>
          <Box
            display="grid"
            rowGap={3}
            columnGap={2}
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="firstName" label="Prénom" />
            <Field.Text name="lastName" label="Nom" />
            <Field.Text name="email" label="Email" />
            <Field.Text name="phone" label="Téléphone" />
            <Box sx={{ gridColumn: 'span 2' }}>
              <Field.Text name="cabinet" label="Nom du Cabinet" />
            </Box>
            <Box sx={{ gridColumn: 'span 2' }}>
              <Field.MultiCheckbox
                name="entreprises"
                label="Entreprises"
                options={entreprises}
                sx={{ gap: 4, gridTemplateColumns: 'repeat(2, 1fr)', display: 'grid' }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Enregistrer
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
