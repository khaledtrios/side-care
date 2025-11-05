import { LoadingButton } from '@mui/lab';
import { z as zod } from 'zod';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form';
import { Scrollbar } from 'src/components/scrollbar';
import { zodResolver } from '@hookform/resolvers/zod';

export const BankAddSchema = zod.object({
    iban: zod.string().min(1, { message: 'IBAN est requis !'}),
    bic: zod.string().min(1, { message: 'BIC est requis !'})
})
export default function AddBankModal({ open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      iban: '',
      bic: '',
      rip: '',
      isDefault: false,
    }),
    []
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BankAddSchema),
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
        <DialogTitle>Ajouter un compte bancaire</DialogTitle>
        <Divider />
        <Scrollbar>
            <DialogContent>
              <Box
                rowGap={3}
                columnGap={2}
                mt={3}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)' }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">RIP</Typography>
                  <Field.Upload
                    thumbnail
                    name="rip"
                    maxSize={3145728}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
                <Field.Text name="iban" label="IBAN" />
                <Field.Text name="bic" label="BIC" />
                <Field.Checkbox label="Définir comme un compte bancaire par défault" name="isDefault" />
              </Box>
            </DialogContent>
        </Scrollbar>
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
