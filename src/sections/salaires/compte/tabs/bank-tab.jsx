import React from 'react';

import { Box, Card, Button, Typography, CardContent, Grid, Stack } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { seedBankAccounts, listBankAccounts } from 'src/_mock/_bankAccounts';

export function BankTab() {
  const router = useRouter();

  seedBankAccounts();
  const mockBankAccounts = listBankAccounts();

  const handleAddAccount = () => {
    router.push(paths.salaries.compte.addBankAccount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Informations Bancaires
      </Typography>

      {/* If no bank accounts exist, show "Aucun compte bancaire créé." */}
      {mockBankAccounts.length === 0 ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Aucun compte bancaire créé.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            {mockBankAccounts.map((account) => (
              <Box key={account.id} sx={{ mb: 2 }}>
                <Stack
                  margin={2}
                  spacing={3}
                  alignItems={{ md: 'flex-start' }}
                  direction={{ xs: 'column-reverse', md: 'column' }}
                  sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral' }}
                >
                  <Button variant="text" onClick={() => router.push(paths.salaries.compte.bankAccountDetails(account.id))}>
                    <Typography variant="h6">
                      {account.libelle}
                    </Typography>
                  </Button>

                  <Grid container spacing={2} direction="column">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        IBAN
                      </Typography>
                      <Typography variant="body1">{account.iban}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        BIC
                      </Typography>
                      <Typography variant="body1">{account.bic}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Document attaché:
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                      {account.document || '—'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Button to add a new bank account */}
      <Button variant="contained" onClick={handleAddAccount}>
        Ajouter un compte bancaire
      </Button>
    </Box>
  );
}
