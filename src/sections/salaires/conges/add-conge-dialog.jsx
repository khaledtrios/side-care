import React, { useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Stack,
  Radio,
  Dialog,
  Button,
  MenuItem,
  TextField,
  Typography,
  RadioGroup,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material';

const congeTypes = [
  { value: 'cp', label: 'Congé payé' },
  { value: 'rtt', label: 'RTT' },
  { value: 'maladie', label: 'Congé maladie' },
  { value: 'autre', label: 'Autre' },
];

export default function AddCongeDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    type: '',
    description: '',
    startDate: null,
    endDate: null,
    startHalf: 'morning',
    endHalf: 'afternoon',
    justificatif: null,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      handleChange('justificatif', event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajouter un congé</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {/* Type de congé */}
          <TextField
            select
            label="Type de Congé"
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            fullWidth
          >
            {congeTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />

          {/* Dates */}
          <Stack direction="row" spacing={2}>
            <DatePicker
              label="Date de début"
              value={form.startDate}
              onChange={(date) => handleChange('startDate', date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="Date de fin"
              value={form.endDate}
              onChange={(date) => handleChange('endDate', date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Stack>

          {/* Half-day options */}
          <Stack direction="row" spacing={4}>
            <Stack>
              <Typography variant="caption">Début</Typography>
              <RadioGroup
                row
                value={form.startHalf}
                onChange={(e) => handleChange('startHalf', e.target.value)}
              >
                <FormControlLabel value="morning" control={<Radio />} label="Matin" />
                <FormControlLabel value="afternoon" control={<Radio />} label="Après-midi" />
              </RadioGroup>
            </Stack>
            <Stack>
              <Typography variant="caption">Fin</Typography>
              <RadioGroup
                row
                value={form.endHalf}
                onChange={(e) => handleChange('endHalf', e.target.value)}
              >
                <FormControlLabel value="morning" control={<Radio />} label="Matin" />
                <FormControlLabel value="afternoon" control={<Radio />} label="Après-midi" />
              </RadioGroup>
            </Stack>
          </Stack>

          {/* Justificatif */}
          <Button
            variant="contained"
            component="label"
            // startIcon={<CloudUploadIcon />}
          >
            {form.justificatif ? form.justificatif.name : 'Ajouter un justificatif'}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Déclarer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
