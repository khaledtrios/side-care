import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function TemplatesPageView() {
  return (
    <DashboardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          mb: { xs: 3, md: 5 },
          gap: { xs: 1, md: 2 },
        }}
      >
        <CustomBreadcrumbs
          heading="Modèles de documents"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
            { name: 'Modèles de documents' },
          ]}
          sx={{ p: 0, mb: { xs: 0, md: 0 } }}
        />

        <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
            size="small"
            sx={{ width: { xs: '100%', sm: 'auto' }, textTransform: 'none' }}
          >
            Voir tous les modèles de documents
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={8} md={5} lg={4}>
          <Card
            sx={{
              height: 240,
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography variant="subtitle1">Modèle d&apos;entretien</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxHeight: 80,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Créez et gérez vos modèles personnalisés pour les entretiens des collaborateurs.
                Vous pouvez inclure des sections spécifiques, des instructions et même des pièces jointes.
              </Typography>
              <Button sx={{ width: "100%" }} variant="outlined" size="small" startIcon={<Iconify icon="gridicons:external" />}>
                Voir
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
