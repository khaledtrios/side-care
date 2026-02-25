import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const entreprises = [
  { id: '1', label: 'En création' },
  { id: '2', label: 'Portorium Consulting' },
];

const initialTypes = [
  { id: 1, title: 'Prime de performance', entrepriseId: '1' },
  { id: 2, title: 'Prime exceptionnelle', entrepriseId: '2' },
];

export default function PrimesTypesList() {
  const open = useBoolean();
  const [selectedEntreprise, setSelectedEntreprise] = useState('1');
  const [types, setTypes] = useState(initialTypes);
  const [newTitle, setNewTitle] = useState('');
  const [currentType, setCurrentType] = useState(null); // null = create mode

  const handleOpenCreate = () => {
    setCurrentType(null);
    setNewTitle('');
    open.onTrue();
  };

  const handleOpenEdit = (type) => {
    setCurrentType(type);
    setNewTitle(type.title);
    open.onTrue();
  };

  const handleSave = () => {
    if (currentType) {
      // Edit mode
      setTypes((prev) =>
        prev.map((t) =>
          t.id === currentType.id ? { ...t, title: newTitle } : t
        )
      );
    } else {
      // Create mode
      const newId = Math.max(...types.map((t) => t.id), 0) + 1;
      setTypes([
        ...types,
        { id: newId, title: newTitle, entrepriseId: selectedEntreprise },
      ]);
    }
    setNewTitle('');
    setCurrentType(null);
    open.onFalse();
  };

  const handleDelete = (id) => {
    setTypes(types.filter((t) => t.id !== id));
  };

  const filteredTypes = types.filter((t) => t.entrepriseId === selectedEntreprise);

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading={`Paramétrage des primes de ${entreprises.find((e) => e.id === selectedEntreprise)?.label}`}
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Primes', href: paths.comptable.primes.root },
          { name: 'Paramétrer' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Box>
            <Button
              onClick={handleOpenCreate}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Ajouter un type de prime
            </Button>
          </Box>
        }
      />

      <FormControl sx={{ width: 240, mb: 3 }}>
        <InputLabel>Entreprise</InputLabel>
        <Select
          value={selectedEntreprise}
          label="Entreprise"
          onChange={(e) => setSelectedEntreprise(e.target.value)}
        >
          {entreprises.map((ent) => (
            <MenuItem key={ent.id} value={ent.id}>
              {ent.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack spacing={2}>
        {filteredTypes.map((type) => (
          <Box
            key={type.id}
            sx={{
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">{type.title}</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => handleOpenEdit(type)}>
                <Iconify icon="lucide:edit" />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(type.id)}>
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Dialog open={open.value} onClose={open.onFalse} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentType ? 'Modifier le type de prime' : 'Ajouter un type de prime'}
        </DialogTitle>
        <DialogContent dividers sx={{pt: 2}}>
          <TextField
            fullWidth
            label="Titre"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={open.onFalse}>Annuler</Button>
          <Button variant="contained" onClick={handleSave} disabled={!newTitle.trim()}>
            {currentType ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </ComptableContent>
  );
}
