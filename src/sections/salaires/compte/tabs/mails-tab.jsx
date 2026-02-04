import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Alert, Button, CardHeader, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';

export function MailSettingsTab() {
  return (
    <Grid spacing={3}>
      <Grid xs={12}>
        <Card sx={{ p: 3 }}>
          {/* Info alert */}
          <Alert severity="info" sx={{ mb: 3 }}>
            Sur cette page, vous pouvez activer ou désactiver les emails que vous souhaitez recevoir
          </Alert>
          {/* Increase font size for the SIRH title */}
          <CardHeader
            title="SIRH"
            sx={{
              pb: 2,
              fontSize: '2rem',
            }}
          />
          <Box rowGap={3} columnGap={2} display="grid">
            {/* Individual Settings Cards */}
            <Card sx={{ p: 2 }}>
              <Typography variant="h6">Nouveau document</Typography>
              <Field.Switch
                name="notifyNewDoc"
                labelPlacement="start"
                label="Nouveau document déposé par votre entreprise sur votre espace"
              />
            </Card>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6">Note de frais</Typography>
              <Field.Switch
                name="notifyExpense"
                labelPlacement="start"
                label="Vous êtes informé de la validation ou du refus de votre note de frais"
              />
            </Card>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6">Titre de transport</Typography>
              <Field.Switch
                name="notifyTransport"
                labelPlacement="start"
                label="Rappel mensuel de vos justificatifs de transport"
              />
            </Card>
          </Box>
          {/* Save button */}
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Sauvegarder
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
