import { toast } from 'sonner';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Stack, Button, MenuItem } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

export default function DemarcheFormModal({ currentTask, open, onClose, employeeId }) {
  const defaultValues = useMemo(
    () => ({
      title: currentTask?.title || '',
      description: currentTask?.description || '',
      responsable: currentTask?.responsable || '',
      dueDate: currentTask?.dueDate || '',
      file: currentTask?.file || '',
      employeeId,
    }),
    [currentTask, employeeId]
  );

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // 👇 Reset the form when modal opens or currentTask changes
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const promise = new Promise((resolve) => setTimeout(resolve, 1000));

      toast.promise(promise, {
        loading: 'Chargement...',
        success: 'Tâche enregistrée avec succès !',
        error: 'Erreur lors de la création de la tâche.',
      });

      await promise;

      console.info('DATA', data);

      reset();
      onClose();
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
        <DialogTitle>{currentTask?.id ? 'Modifier' : 'Ajouter'} une tâche</DialogTitle>

        <DialogContent>
          <Stack pt={2} spacing={3}>
            <Field.Text name="title" label="Titre" />
            <Field.Text name="description" label="Description" multiline rows={3} />
            <Field.Select name="responsable" label="Responsable">
              {['Un administrateur', 'Un employé'].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.DatePicker name="dueDate" label="Échéance" />
            <Field.Upload
              name="file"
              maxSize={3145728}
              onDelete={() => setValue('file', null, { shouldValidate: true })}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            {currentTask?.id ? 'Mettre à jour' : 'Créer la tâche'}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
