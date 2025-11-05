import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Stack, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

export const NewCongeSchema = zod.object({
  employe: zod
    .string({ message: 'Choisir votre employé' })
    .nonempty({ message: 'Choisir votre employé' }),
  typeConge: zod
    .string({ message: 'Choisir votre type de congé' })
    .nonempty({ message: 'Choisir le type de congé' }),
  description: zod.string(),
  startDate: schemaHelper.date({
    message: { required_error: 'Date de début est requis' },
  }),
  endDate: schemaHelper.date({
    message: { required_error: 'Date de fin est requis' },
  }),
});

export default function CongeAddEditForm({ currentConge }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      employe: currentConge?.employe || '',
      typeConge: currentConge?.typeConge || '',
      description: currentConge?.description || '',
    }),
    [currentConge]
  );

  const methods = useForm({
    resolver: zodResolver(NewCongeSchema),
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
      toast.success(currentConge ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <Field.Autocomplete
              name="employe"
              label="Employé"
              placeholder="Employé"
              freeSolo
              options={['Employé 1', 'Employé 2']}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
            <Field.Select
              native
              name="typeConge"
              label="Type de congé"
              helperText="Cette absence sera présente dans la clôture mais n'entraîne pas de déduction de salaire."
              InputLabelProps={{ shrink: true }}
            >
              {[
                {
                  group: 'Congé Courants',
                  classify: [
                    'Absence formation en alternance',
                    'Arrêt maladie',
                    'Congé payé',
                    'Congé sans solde',
                    'Événement familial',
                  ],
                },
                {
                  group: 'Santé',
                  classify: ['Accident de course', 'Accident de trajet', 'Accident de travail'],
                },
              ].map((category) => (
                <optgroup key={category.group} label={category.group}>
                  {category.classify.map((classify) => (
                    <option key={classify} value={classify}>
                      {classify}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Field.Select>
          </Box>
          <Field.Text name="subDescription" label="Description" multiline rows={4} />
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <Box>
              <Field.DatePicker name="startDate" label="Date de début" />
              <Field.RadioGroup
                row
                name="startDatePart"
                options={[
                  { label: 'Matin', value: 'matin' },
                  { label: 'Aprés-midi', value: 'midi' },
                ]}
                sx={{ gap: 4 }}
              />
            </Box>
            <Box>
              <Field.DatePicker name="endDate" label="Date de fin" />
              <Field.RadioGroup
                row
                name="endDatePart"
                options={[
                  { label: 'Matin', value: 'matin' },
                  { label: 'Aprés-midi', value: 'midi' },
                ]}
                sx={{ gap: 4 }}
              />
            </Box>
          </Box>
          <Field.Upload name="document" helperText="Document Justificatif"/>
          <Button type='submit' color='primary' variant='contained' sx={{ width: "max-content", marginRight: 1}}>Déclarer jour</Button>
        </Stack>
      </Card>
    </Form>
  );
}
