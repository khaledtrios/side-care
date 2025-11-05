import React from 'react';

import {
  Box,
  Card,
  Grid,
  Link,
  Stack,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function EntretienViewPage({ entretien }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={`Entretien avec ${entretien?.employe}`}
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
          { name: 'Entretien', href: paths.dashboard.gestionRh.entretien.root },
          { name: 'Info' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Stack display="flex" gap={2} flexDirection="row">
            <Button
              component={RouterLink}
              href={paths.dashboard.gestionRh.entretien.edit(entretien?.id)}
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
              color="primary"
            >
              Modifier
            </Button>
            <Button color="error" variant="outlined">
                Annuler l&apos;entretien
            </Button>
          </Stack>
        }
      />

      <Card sx={{mb: 2}}>
        <CardHeader title="Informations" sx={{ mb: 1 }} />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Entreprise
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {entretien?.entreprise || 'En création'}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Manager pour l&apos;entretien
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {entretien?.employe || 'Wissem Chihaoui'}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Type d&apos;entretien
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {entretien?.type || 'Entretien étape projet'}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Date et heure de l&apos;entretien
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fDate(entretien?.date) || '25/06/2025 00h00'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Informations pour le salarié
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {entretien?.info || '-'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Modèle d&apos;entretien
              </Typography>
              <Box mt={1}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="eva:download-outline" />}
                  component={Link}
                  href={entretien?.modeleUrl || '#'}
                  target="_blank"
                >
                  Télécharger le modèle
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Upload />
    </DashboardContent>
  );
}
