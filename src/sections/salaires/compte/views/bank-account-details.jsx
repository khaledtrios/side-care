import React from 'react';
import { useParams } from 'react-router-dom';

import { Card, Alert, Stack, Button, Typography, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deleteBankAccount, getBankAccountById } from 'src/_mock/_bankAccounts';

export default function CompteBancaireDetails() {
  const router = useRouter();
  const { id } = useParams();
  const account = getBankAccountById(id);

  if (!account) {
    return (
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h6">Ce compte bancaire est introuvable.</Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => router.push(paths.salaries.compte.root)}>
            Retour
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleEdit = () => {
    router.push(paths.salaries.compte.editBankAccount(account.id));
  };

  const handleDelete = () => {
    const ok = deleteBankAccount(account.id);
    if (ok) {
      router.push(paths.salaries.compte.root);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            Compte bancaire - {account.libelle}
          </Typography>
          <Alert
            severity="warning"
            sx={{
              padding: '16px',
            }}
            padding={1}
          >
            On ne peut pas supprimer un compte bancaire une fois créé en effet pour des raisons de
            suivi et d&apos;historisation SideCare a besoin de conserver les traces de
            l&apos;utilisation d&apos;un compte bancaire.
          </Alert>
          <Card sx={{ p: 3 }}>
            <Stack
              spacing={1}
              margin={2}
              alignItems={{ md: 'flex-start' }}
              direction={{ xs: 'column-reverse', md: 'column' }}
              sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral' }}
            >
              <Typography variant="h5">Informations sur le compte</Typography>
              <Typography variant="h6">Libellé:</Typography>
              <Typography variant="body1">{account.libelle}</Typography>

              <Typography variant="h6">RIB:</Typography>
              <Typography variant="body1">{account.rib || '—'}</Typography>

              <Typography variant="h6">IBAN:</Typography>
              <Typography variant="body1">{account.iban || '—'}</Typography>

              <Typography variant="h6">BIC:</Typography>
              <Typography variant="body1">{account.bic || '—'}</Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={handleEdit}>
                  Modifier
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={Boolean(account.isPersisted)}
                  onClick={handleDelete}
                >
                  Supprimer
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
