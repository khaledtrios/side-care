import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { PRIME_TYPES } from 'src/_mock';

import { Form, Field } from 'src/components/hook-form';

const MOCK_EMPLOYEES = [
  { id: 'emp1', name: 'Jean Dupont', poste: 'Développeur' },
  { id: 'emp2', name: 'Marie Martin', poste: 'Designer UI/UX' },
  { id: 'emp3', name: 'Pierre Bernard', poste: 'Chef de projet' },
  { id: 'emp4', name: 'Sophie Laurent', poste: 'Comptable' },
  { id: 'emp5', name: 'Lucas Moreau', poste: 'Commercial' },
];

const MOCK_ENTREPRISES = [
  { id: 'ent1', name: 'Tech Solutions SARL' },
  { id: 'ent2', name: 'Digital Agency SAS' },
  { id: 'ent3', name: 'Innovation Lab' },
];

const PrimeSchema = zod.object({
  employeId: zod.string().min(1, { message: 'L\'employé est requis' }),
  entrepriseId: zod.string().min(1, { message: 'L\'entreprise est requise' }),
  type: zod.string().min(1, { message: 'Le type de prime est requis' }),
  amount: zod.number().min(1, { message: 'Le montant doit être supérieur à 0' }),
  period: zod.string().min(1, { message: 'La période est requise' }),
  description: zod.string().optional(),
});

export default function PrimesAddDialog({ open, onClose, onSubmit }) {
  const defaultValues = useMemo(
    () => ({
      employeId: '',
      entrepriseId: '',
      type: '',
      amount: 0,
      period: '',
      description: '',
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(PrimeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      const employe = MOCK_EMPLOYEES.find((e) => e.id === data.employeId);
      const entreprise = MOCK_ENTREPRISES.find((e) => e.id === data.entrepriseId);
      const primeType = PRIME_TYPES.find((t) => t.value === data.type);

      const newPrime = {
        id: `prime-${Date.now()}`,
        employe: {
          id: employe.id,
          name: employe.name,
          poste: employe.poste,
        },
        entreprise: {
          id: entreprise.id,
          name: entreprise.name,
        },
        type: data.type,
        typeLabel: primeType.label,
        amount: data.amount,
        period: data.period,
        status: 'pending',
        description: data.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (onSubmit) {
        onSubmit(newPrime);
      }

      handleClose();
    } catch (error) {
      console.error('Error adding prime:', error);
    }
  });

  const generatePeriodOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i += 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];
      options.push({
        value: `${year}-${month}`,
        label: `${months[date.getMonth()]} ${year}`,
      });
    }
    return options;
  };

  const periodOptions = generatePeriodOptions();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter une prime</DialogTitle>

      <Form methods={methods} onSubmit={onFormSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <Field.Select name="entrepriseId" label="Entreprise">
              {MOCK_ENTREPRISES.map((entreprise) => (
                <MenuItem key={entreprise.id} value={entreprise.id}>
                  {entreprise.name}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Select name="employeId" label="Employé">
              {MOCK_EMPLOYEES.map((employe) => (
                <MenuItem key={employe.id} value={employe.id}>
                  {employe.name} - {employe.poste}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Select name="type" label="Type de prime">
              {PRIME_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Field.Text
                name="amount"
                label="Montant"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
                sx={{ flex: 1 }}
              />

              <Field.Select name="period" label="Période" sx={{ flex: 1 }}>
                {periodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Field.Text
              name="description"
              label="Description (optionnel)"
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Ajouter
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
