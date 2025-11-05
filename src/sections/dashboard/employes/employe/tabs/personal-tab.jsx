import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Stack, Button, Divider, MenuItem, Typography, IconButton } from '@mui/material';

import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Field } from 'src/components/hook-form';

import { Iconify } from '../../../../../components/iconify';

export function PersonalTab() {
  const { control } = useFormContext();

  const {
    fields: emergencyContacts,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'emergencyContacts',
  });

  const handleAdd = () =>
    append({
      lastName: '',
      firstName: '',
      phone: '',
      relationship: '',
      priority: 1,
    });
  return (
    <Grid container spacing={3}>
      {/* Avatar & Personal Info Card */}
      <Grid xs={12} md={4}>
        <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
          <Label color="success" sx={{ position: 'absolute', top: 24, right: 24 }}>
            Active
          </Label>
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
                Autorisé *.jpeg, *.jpg, *.png, *.gif
                <br /> Taille maximale de {fData(3145728)}
              </Typography>
            }
          />
          <Button variant="soft" color="error" sx={{ mt: 3 }}>
            Supprimer le collaborateur
          </Button>
        </Card>
      </Grid>

      {/* Main Form Card */}
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
            {/* Fields... */}
            <Field.Select name="civility" label="Civilité">
              <MenuItem value="">Aucun</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {[
                { label: 'Monsieur', value: 'm' },
                { label: 'Madame', value: 'mdm' },
              ].map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name="lastName" label="Nom" />
            <Field.Text name="maidenName" label="Nom de naissance" />
            <Field.Text name="firstName" label="Prénom" />
            <Field.Text name="nationality" label="Nationalité" />
            <Field.Text name="idCard" label="Pièce d’identité" />
            <Field.Text name="address" label="Adresse" />
            <Field.Text name="postalCode" label="Code postal" />
            <Field.Text name="city" label="Ville" />
            <Field.DatePicker name="birthDate" label="Date de naissance" />
            <Field.Text name="birthCity" label="Ville de naissance" />
            <Field.Text name="birthPostalCode" label="Code postal de naissance" />
            <Field.Text name="birthCountry" label="Pays de naissance" />
            <Field.Text name="personalEmail" label="E-mail personnel" />
            <Field.Phone name="phone" label="Téléphone" />
            <Field.Text name="socialSecurityNumber" label="N° de sécurité sociale" />
            <Field.Text name="ameliCertificate" label="Attestation Ameli" />
          </Box>
        </Card>
      </Grid>
      <Grid xs={12} md={4} />
      {/* Emergency Contact & Allergies Card */}
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Contact en cas d’urgence & Allergies
          </Typography>

          <Stack spacing={3} divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />}>
            {emergencyContacts.map((item, index) => (
              <Box key={item.id}>
                <Grid container spacing={2} mb={2}>
                  <Grid xs={12} sm={6}>
                    <Field.Text name={`emergencyContacts[${index}].lastName`} label="Nom" />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Field.Text name={`emergencyContacts[${index}].firstName`} label="Prénom" />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Field.Phone name={`emergencyContacts[${index}].phone`} label="Téléphone" />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Field.Text
                      name={`emergencyContacts[${index}].relationship`}
                      label="Lien de parenté"
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Field.Text
                      name={`emergencyContacts[${index}].priority`}
                      label="Priorité du contact"
                      type="number"
                    />
                  </Grid>
                </Grid>

                <Button
                  size="small"
                  color="error"
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                  onClick={() => remove(index)}
                >
                  Supprimer
                </Button>
              </Box>
            ))}

            <Button
              size="small"
              variant="outlined"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
              sx={{ width: 'max-content' }}
            >
              Ajouter un contact d’urgence
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Allergies
          </Typography>
          <Field.Text name="allergies" label="Allergies (laisser vide si aucune)" />
        </Card>
      </Grid>
    </Grid>
  );
}
