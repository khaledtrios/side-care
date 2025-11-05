import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Switch, Divider, MenuItem, CardHeader, FormControlLabel } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

export default function AddEmployesForm({ currentEmploye }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      id: currentEmploye?.id || null,
      gender: currentEmploye?.gender || 'm',
      firstName: currentEmploye?.firstName || '',
      lastName: currentEmploye?.lastName || '',
      email: currentEmploye?.email || '',
      entreprise: currentEmploye?.entreprise || '',
      contract: {
        type: currentEmploye?.type || '',
        college: currentEmploye?.college || '',
        enterDate: currentEmploye?.enterDate || '',
      },
      manager: currentEmploye?.manager || '',
      matricule: currentEmploye?.matricule || '',
    }),
    [currentEmploye]
  );

  const methods = useForm({
    mode: 'all',
    // resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentEmploye ? 'Mise à jour réussie !' : 'Créer avec succès !');
      router.push(paths.dashboard.employes.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader
        title="Informations générales"
        subheader="Toutes les informations sont requises afin de créer un compte SideCare pour votre employé"
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.RadioGroup
          row
          name="gender"
          label="Civilité"
          options={[
            { label: 'Homme', value: 'm' },
            { label: 'Femme', value: 'f' },
          ]}
        />

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="firstName" label="Prénom" />
          <Field.Text name="lastName" label="Nom" />
          <Field.Text
            name="email"
            label="E-mail"
            type="email"
            helperText="Cette adresse sera utilisée par l'employé pour se connecter à son espace personnel"
          />
          <Field.Select name="entreprise" label="Entreprise">
            {OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
        </Box>
      </Stack>
    </Card>
  );

  const renderContract = (
    <Card>
      <CardHeader
        title="Contrat"
        subheader="Toutes les informations liées au contrat de travail de l'employé"
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select name="contract.type" label="Type de contrat">
            {OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Select name="contract.college" label="Collège">
            {OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.DatePicker name="contract.enterDate" label="Date d'entrée dans l'entreprise" />
        </Box>
      </Stack>
    </Card>
  );

  const renderMore = (
    <Card>
      <CardHeader
        title="En plus"
        subheader="Informations supplémentaires optionnelles"
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select
            name="manager"
            label="Manager"
            helperText="Le manager pourra valider ses congés et absences"
          >
            <MenuItem value="">Aucun Manager</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text
            name="matricule"
            label="Matricule"
            helperText="Identifiant unique renseigné dans votre DSN"
          />
        </Box>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Inviter par mail"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentEmploye ? "Créer l'employé" : 'Confirmer modification'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderContract}
        {renderMore}
        {renderActions}
      </Stack>
    </Form>
  );
}
