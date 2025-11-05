import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Box,
  Link,
  Stack,
  Paper,
  Button,
  Divider,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { EmptyContent } from 'src/components/empty-content';

import { BankDialog } from '../add-bank-dialog';

export function BankTab() {
  const { watch } = useFormContext();
  const values = watch();
  const banks = values?.banks || [];

  const open = useBoolean()

  if (!banks.length) {
    return (
      <EmptyContent
        title="Aucun compte bancaire trouvé"
        description="Ajoutez un compte bancaire pour le voir apparaître ici."
      />
    );
  }

  return (
    <>
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={open.onTrue}>Ajouter un compte bancaire</Button>
      </Stack>

      <Stack spacing={2}>
        {banks.map((bank, index) => (
          <Paper
            key={index}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {bank.title}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            <Typography variant="body2" color="text.secondary">
              <strong>IBAN:</strong> {bank.iban}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>BIC:</strong> {bank.bic}
            </Typography>

            {bank.document && (
              <Link
                href={bank.document}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ mt: 1, display: 'inline-block' }}
              >
                Voir le document
              </Link>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
    <BankDialog open={open.value} onClose={open.onFalse}/>
    </>
  );
}
