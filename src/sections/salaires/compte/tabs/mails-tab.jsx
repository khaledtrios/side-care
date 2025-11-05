import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Button, CardHeader } from '@mui/material';

import { Field } from 'src/components/hook-form';

export function MailSettingsTab() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Card sx={{ p: 3 }}>
          <CardHeader title="SIRH " sx={{ pb: 3 }} />
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
            }}
          >
            <Field.Switch
              name="notifyNewDoc"
              labelPlacement="start"
              label="Nouveau document - Nouveau document déposé par votre entreprise sur votre espace"
            />
            <Field.Switch
              name="notifyExpense"
              labelPlacement="start"
              label="Note de frais - Vous êtes informé de la validation ou du refus de votre note de frais"
            />
            <Field.Switch
              name="notifyTransport"
              labelPlacement="start"
              label="Titre de transport - Rappel mensuel de vos justificatifs de transport"
            />
          </Box>
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