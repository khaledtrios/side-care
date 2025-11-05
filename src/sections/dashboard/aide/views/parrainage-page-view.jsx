import React from 'react';

import { Box, Grid, Card, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function ParrainagePageView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Parrainage"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: "Centre d'aide", href: paths.dashboard.aide.root },
          { name: 'Parrainage' },
        ]}
      />

      <Grid container spacing={3} mt={2}>
        {/* Left side */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Comment ça marche ?
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              {[
                "Renseignez le nom, le prénom et l'entreprise de votre contact",
                'On le charme (en tout bien tout honneur) pour en savoir plus',
                'Ça signe ? Vous êtes remercié comme il se doit !',
              ].map((text, idx) => (
                <Box key={idx} display="flex" alignItems="flex-start" gap={1}>
                  <Iconify
                    icon="ic:baseline-check-circle"
                    color="success"
                    fontSize="small"
                    sx={{ mt: 0.3 }}
                  />
                  <Typography>{text}</Typography>
                </Box>
              ))}
            </Box>

            <Box mt={4}>
              <Typography variant="subtitle1" gutterBottom>
                Votre récompense
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'green.50',
                  border: '1px solid',
                  borderColor: 'success.light',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Entre 50 et 200 €
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Le gain dépend du nombre de salariés de l&apos;entreprise parrainée.
                </Typography>
              </Box>
            </Box>

            <Button sx={{ mt: 3 }} color="error">
              Je parraine un ami
            </Button>
          </Card>
        </Grid>

        {/* Right side */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              bgcolor: 'orange.50',
            }}
          >
            {/* Illustration placeholder */}
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Mascotte"
              sx={{ width: 120, height: 120, mb: 3 }}
            />

            <Box width="100%" textAlign="left" mb={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontWeight="500">Gain max</Typography>
                <Typography
                  sx={{
                    bgcolor: 'warning.light',
                    px: 1,
                    borderRadius: 1,
                    fontWeight: 'bold',
                  }}
                >
                  200€
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="500">Temps</Typography>
                <Typography fontWeight="600" color="text.primary">
                  Moins d&apos;une minute
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} color="success.main">
                <Iconify
                  icon="ic:baseline-check-circle"
                  color="success"
                  fontSize="small"
                  sx={{ mt: 0.3 }}
                />

                <Typography>Parrainez autant de personnes que vous souhaitez</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{ mt: 3, bgcolor: 'orange.500', '&:hover': { bgcolor: 'orange.600' } }}
            >
              Je gagne jusqu&apos;à 200€ →
            </Button>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
