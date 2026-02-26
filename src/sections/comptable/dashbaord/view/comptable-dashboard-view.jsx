import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { varAlpha, bgGradient } from 'src/theme/styles';
import { ComptableContent } from 'src/layouts/comptable';
import { SeoIllustration } from 'src/assets/illustrations';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from './app-widget';
import { AppWelcome } from './app-welcome';
import { BankingOverview } from './banking-overview';

// ----------------------------------------------------------------------

export default function ComptableDashboardView() {
  const { user } = useMockedUser();
  const color = 'primary';
  const theme = useTheme();

  return (
    <ComptableContent>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Bonjour 👋 \n ${user?.displayName}`}
            description="Bienvenue sur votre espace partenaire. Gérez vos entreprises, employés et éléments de paie."
            img={<SeoIllustration hideBackground />}
            action={
              <Button variant="contained" href={paths.comptable.entreprise.root} color="primary">
                Voir les entreprises
              </Button>
            }
          />
        </Grid>

        {/* Quick Actions */}
        <Grid xs={12} md={4} container>
          <Grid xs={12} md={6}>
            <Button
              href={paths.comptable.employes.root}
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
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="span" textAlign="center">
                  Voir les effectifs
                </Typography>
              </Box>
            </Button>
          </Grid>

          <Grid xs={12} md={6}>
            <Button
              href={paths.comptable.employes.add}
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
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="span" textAlign="center">
                  Ajouter un employé
                </Typography>
              </Box>
            </Button>
          </Grid>

          <Grid xs={12} md={6}>
            <Button
              href={paths.comptable.conges.root}
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
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="span" textAlign="center">
                  Congés & absences
                </Typography>
              </Box>
            </Button>
          </Grid>

          <Grid xs={12} md={6}>
            <Button
              href={paths.comptable.cloture.root}
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
              }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="span" textAlign="center">
                  Clôture de paie
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>

        {/* Additional Quick Links */}
        <Grid xs={12} md={3}>
          <Button
            href={paths.comptable.primes.root}
            LinkComponent={RouterLink}
            variant="outlined"
            color="primary"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            fullWidth
          >
            <Typography variant="subtitle2" textAlign="center">
              Gestion des primes
            </Typography>
          </Button>
        </Grid>

        <Grid xs={12} md={3}>
          <Button
            href={paths.comptable.notes.root}
            LinkComponent={RouterLink}
            variant="outlined"
            color="primary"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            fullWidth
          >
            <Typography variant="subtitle2" textAlign="center">
              Notes de frais
            </Typography>
          </Button>
        </Grid>

        <Grid xs={12} md={3}>
          <Button
            href={paths.comptable.transport.root}
            LinkComponent={RouterLink}
            variant="outlined"
            color="primary"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            fullWidth
          >
            <Typography variant="subtitle2" textAlign="center">
              Titres de transport
            </Typography>
          </Button>
        </Grid>

        <Grid xs={12} md={3}>
          <Button
            href={paths.comptable.employes.historique}
            LinkComponent={RouterLink}
            variant="outlined"
            color="primary"
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            fullWidth
          >
            <Typography variant="subtitle2" textAlign="center">
              Historique affiliations
            </Typography>
          </Button>
        </Grid>

        {/* Banking Overview */}
        <Grid spacing={3} xs={12} md={6} lg={8}>
          <BankingOverview />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid>
      </Grid>
    </ComptableContent>
  );
}
