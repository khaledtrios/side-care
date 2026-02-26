import React from 'react';
import { useParams } from 'react-router-dom';

import { Card, Grid, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { transportData } from 'src/_mock/_transport';
import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function TransportViewPage() {
  const { id } = useParams();
  const transport = transportData.find((t) => t.id === id);

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Détails du titre de transport"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Titres de transport', href: paths.comptable.transport.root },
          { name: 'Détails' },
        ]}
        action={
          <Button LinkComponent={RouterLink} href={paths.comptable.transport.root} variant="outlined">
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ p: 3 }}>
        {transport ? (
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">Employé</Typography>
              <Typography>{transport.employe}</Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">Type</Typography>
              <Typography>{transport.type}</Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">Montant</Typography>
              <Typography>{transport.amount} €</Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">Période</Typography>
              <Typography>{transport.startMonth} — {transport.endMonth}</Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2">Fréquence justificatif</Typography>
              <Typography>{transport.justificatifFrequency}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography>Aucun enregistrement trouvé pour cet identifiant.</Typography>
        )}
      </Card>
    </ComptableContent>
  );
}
