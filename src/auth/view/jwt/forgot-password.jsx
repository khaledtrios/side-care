import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Stack, Button, TextField, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { FormHead } from 'src/auth/components/form-head';

// ----------------------------------------------------------------------

const ForgotPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'L’adresse e-mail est requise' })
    .email({ message: 'Veuillez entrer une adresse e-mail valide' }),
});

// ----------------------------------------------------------------------

export function ForgotPasswordPage() {
  // Capture the returnTo param
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/espace-salaries';

  // Set up react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    console.log('Reset link sent to:', data.email);
    // TODO: send email to backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Form header */}
        <FormHead
          title="Mot de passe oublié"
          description={
            <>
              Saisissez l’adresse email associée{' '}
              <span style={{ color: '#D9A800' }}>à votre compte</span>, nous vous enverrons un lien
              pour  <span style={{ color: '#D9A800' }}>réinitialiser votre mot de passe</span>.
            </>
          }
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        />

        {/* Email input with validation */}
        <TextField
          fullWidth
          label="Adresse e-mail"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Submit button */}
        <Button fullWidth variant="contained" size="large" type="submit" disabled={isSubmitting}>
          Envoyer le lien
        </Button>

        {/* Back to login link */}
        <Typography variant="body2" align="center">
          <Button
            component={RouterLink}
            to={`${paths.auth.jwt.signIn}?returnTo=${returnTo}`}
            variant="text"
          >
            Je connais mon mot de passe : Se connecter à mon compte
          </Button>
        </Typography>
      </Stack>
    </form>
  );
}
