import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { useMockedUser } from 'src/auth/hooks';
import { Divider, MenuItem } from '@mui/material';

// -------------------------------------------------------

export const UpdateUserSchema = zod.object({
  civility: zod.enum(['Monsieur', 'Madame'], {
    required_error: 'Veuillez sélectionner une civilité.',
  }),
  firstName: zod.string().min(1, { message: 'Le prénom est requis.' }),
  lastName: zod.string().min(1, { message: 'Le nom est requis.' }),
  profession: zod.string().min(1, { message: 'La profession est requise.' }),
  email: zod
    .string()
    .email({ message: 'Veuillez entrer une adresse e-mail valide.' }),
  photoURL: schemaHelper.file({
    message: { required_error: 'La photo de profil est requise.' },
  }),
  address: zod.string().min(1, { message: 'L’adresse est requise.' }),
  zipCode: zod.string().min(1, { message: 'Le code postal est requis.' }),
  city: zod.string().min(1, { message: 'La ville est requise.' }),
});

export function InformationsTab() {
  const { user } = useMockedUser();

  const defaultValues = {
    civility: 'Monsieur',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    profession: user?.profession || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    address: user?.address || '',
    zipCode: user?.zipCode || '75006',
    city: user?.city || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Informations mises à jour avec succès !');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const professionOptions = [
    { label: 'Ingénieur', value: 'ingenieur' },
    { label: 'Médecin', value: 'medecin' },
    { label: 'Enseignant', value: 'enseignant' },
    { label: 'Autre', value: 'autre' },
  ];

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Formats autorisés : *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  Taille maximale : {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.RadioGroup
                row
                name="civility"
                label="Civilité"
                options={[
                  { label: 'Monsieur', value: 'Monsieur' },
                  { label: 'Madame', value: 'Madame' },
                ]}
              />

              <Field.Text name="firstName" label="Prénom" />
              <Field.Text name="lastName" label="Nom" />

              <Field.Select
                name="profession"
                label="Profession"
                options={professionOptions}
              >
                <MenuItem>Veuillez sélectionner</MenuItem>
                <Divider />
                {
                  professionOptions.map((row, dex) => (
                    <MenuItem key={dex} value={row.value}>{row.label}</MenuItem>
                  ))
                }
              </Field.Select>

              <Field.Text name="email" label="E-mail" type="email" />
              <Field.Text name="address" label="Votre adresse personnelle" />
              <Field.Text name="zipCode" label="Code postal" />
              <Field.Text name="city" label="Ville" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Sauvegarder
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
