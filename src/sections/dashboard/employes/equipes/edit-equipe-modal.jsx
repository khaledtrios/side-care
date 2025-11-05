import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  Button,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

export default function EditEquipeModal({ currentTeam, open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      entreprise: currentTeam?.entreprise || '',
      name: currentTeam?.name || '',
      description: currentTeam?.description || '',
      employes: currentTeam?.employes || [],
      parent: currentTeam?.parent || '',
    }),
    [currentTeam]
  );

  const methods = useForm({
    mode: 'all',
    // resolver: zodResolver(UserQuickEditSchema),
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
        success: currentTeam ? 'Modification effectué!' : 'Création effectué',
        error: currentTeam ? 'Erreur lors du modification!' : 'Erreur lors de création',
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
        <DialogTitle>{currentTeam ? "Modifier l'équipe" : 'Créer un équipe'}</DialogTitle>

        <DialogContent>
          <Box rowGap={3} columnGap={2} p={3} display="grid">
            {!currentTeam && (
<Field.Select name="entreprise" label="Employés" multiple>
              {['Portorium Consulting', 'Po'].map((employee) => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
              ))}
            </Field.Select>
            )}
            
            <Field.Text name="name" label="Nom de l'équipe" />
            <Field.Text name="description" label="Description" multiline rows={3} />
            <Field.Select name="employes" label="Employés" multiple>
              {['Alice', 'Bob', 'Charlie', 'Diana'].map((employee) => (
                <MenuItem key={employee} value={employee}>
                  {employee}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Select name="parent" label="L'équipe est une sous-équipe de">
              {['Team 1', 'Team 2'].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Field.Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentTeam ? "Modifier" : "Créer"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
