import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

export default function LandingChooseSpace() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h2" textAlign="center">
          Bienvenue sur SideCare
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Sélectionnez l’espace où vous souhaitez vous connecter :
        </Typography>

        <Stack spacing={2} width="100%">
          <Button
            component={RouterLink}
            href={`${paths.auth.jwt.signIn}?returnTo=/espace-salaries`}
            variant="contained"
            color="inherit"
            size="large"
          >
            Personnel
          </Button>

          <Button
            component={RouterLink}
            href={`${paths.auth.jwt.signIn}?returnTo=/dashboard`}
            variant="contained"
            color="inherit"
            size="large"
          >
            Entreprise
          </Button>

          <Button
            component={RouterLink}
            href={`${paths.auth.jwt.signIn}?returnTo=/espace-partenaire`}
            variant="contained"
            color="inherit"
            size="large"
          >
            Expert-comptable
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}


