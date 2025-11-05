import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ADMINS_ROLES } from 'src/_mock/_admins';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { JOB_EMPLOYMENT_TYPE_OPTIONS } from 'src/_mock';
import { ENTREPRISE_LIST } from 'src/_mock/_entreprises';

export const UserQuickEditSchema = zod.object({
  lastName: zod.string().min(1, { message: 'Prénom est requis !' }),
  firstName: zod.string().min(1, { message: 'Nom est requis !' }),
  roles: zod.string().min(1, { message: 'Rôle est requis ' }),
  right: zod.string().min(1, { message: 'Droit est requis ' }),
  email: zod
    .string()
    .min(1, { message: 'Email est requis !' })
    .email({ message: "L'adresse e-mail doit être valide !" }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  entreprises: zod.string().array().nonempty({ message: 'Choisissez au moins une option !' }),
});

export default function AddExpertModal({ currentUser, open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      lastName: currentUser?.lastName || '',
      firstName: currentUser?.firstName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      cabinet: currentUser?.cabinet || '',
      entreprises: currentUser?.entreprises || []
    }),
    [currentUser]
  );

  const [entreprises, setEntreprises] = useState(ENTREPRISE_LIST.map((row) => ({ label: `${row.name} Siret: ${row.siret}`, value: row.id })));

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
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
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'Chargement...',
        success: 'Mise à jour réussie !',
        error: 'Erreur de mise à jour !',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Inviter votre cabinet</DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            mt={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="lastName" label="Prénom" />
            <Field.Text name="firstName" label="Nom" />
            <Field.Text name="email" label="Email" />

            <Field.Phone name="phone" label="Téléphone" />
            <Box sx={{ gridColumn: 'span 2' }} >
                <Field.MultiCheckbox
                label="Les entreprises"
            name="entreprises"
            options={entreprises}
            sx={{ gap: 4, gridTemplateColumns:'repeat(2, 1fr)', display: 'grid' }}

          />
          
            </Box>
            <Box sx={{ gridColumn: 'span 2' }} >
            <Field.Text name="cabinet" label="Cabinet" />
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
