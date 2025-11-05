import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { DashboardContent } from 'src/layouts/dashboard';
import { useMockedUser } from 'src/auth/hooks';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { SeoIllustration } from 'src/assets/illustrations';
import { paths } from 'src/routes/paths';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { RouterLink } from 'src/routes/components';
import { AppWelcome } from './app-welcome';

export default function DashboardPagView() {
  const { user } = useMockedUser();
  const color = 'primary';
  const theme = useTheme();
  return (
    <DashboardContent>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Bonjour 👋 \n ${user?.displayName}`}
            description="Bienvenue sur votre tableau de bord, vérifier les congés et les absences d'ajourd'hui"
            img={<SeoIllustration hideBackground />}
            action={
              <Button variant="contained" href={paths.dashboard.three} color="primary">
                Congés & absences
              </Button>
            }
          />
        </Grid>
        <Grid xs={12} md={4} container>
          <Grid xs={12} md={6}>
            <Button
              href={paths.dashboard.two}
              LinkComponent={RouterLink}
              variant="contained"
              color="primary"
              sx={{
                ...bgGradient({
                  color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
                }),
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                color: `${color}.darker`,
                backgroundColor: 'common.white',
                height: '100%',
                flex: 1,
                // border: "1px solid"
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <Iconify width={36} icon="ic:outline-sms" /> */}
                <Typography variant="span" textAlign="center">
                  Suivre les affiliations
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} md={6}>
            <Button
              href={paths.dashboard.employes.add}
              LinkComponent={RouterLink}
              variant="contained"
              color="primary"
              sx={{
                ...bgGradient({
                  color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
                }),
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                color: `${color}.darker`,
                backgroundColor: 'common.white',
                height: '100%',
                flex: 1,
                // border: "1px solid"
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <Iconify width={36} icon="ic:outline-sms" /> */}
                <Typography variant="span" textAlign="center">
                  Ajouter un employé
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} md={6}>
            <Button
              href={paths.dashboard.two}
              LinkComponent={RouterLink}
              variant="contained"
              color="primary"
              sx={{
                ...bgGradient({
                  color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
                }),
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                color: `${color}.darker`,
                backgroundColor: 'common.white',
                height: '100%',
                flex: 1,
                // border: "1px solid"
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <Iconify width={36} icon="ic:outline-sms" /> */}
                <Typography variant="span" textAlign="center">
                  Déclarer un départ
                </Typography>
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} md={6}>
            <Button
              LinkComponent={RouterLink}
              href={paths.dashboard.two}
              variant="contained"
              color="primary"
              sx={{
                ...bgGradient({
                  color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
                }),
                p: 3,
                boxShadow: 'none',
                position: 'relative',
                color: `${color}.darker`,
                backgroundColor: 'common.white',
                height: '100%',
                flex: 1,
                // border: "1px solid"
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* <Iconify width={36} icon="ic:outline-sms" /> */}
                <Typography variant="span" textAlign="center">
                  Voir mes contrats
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
