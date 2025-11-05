import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Upload } from 'src/components/upload';

// import Upload from 'src/components/upload'; // Adjust path as needed

export default function TypeEntretienDialog({ open, onClose, onSubmit, initialData }) {
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [modeleUrl, setModeleUrl] = useState('');
  const [modeleFile, setModeleFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setModeleUrl(initialData.modeleUrl || '');
      setModeleFile(initialData.modeleFile || null);
    } else {
      setTitle('');
      setModeleUrl('');
      setModeleFile(null);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const data = {
      ...(initialData || {}),
      title,
      modeleUrl,
      modeleFile,
    };
    onSubmit(data);
    onClose();
  };

  const handleFileChange = (files) => {
    setModeleFile(files?.[0] || null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Modifier le type d’entretien' : 'Créer un type d’entretien'}</DialogTitle>

      <DialogContent dividers sx={{ pt : 2}}>
        <Stack spacing={2}>
          <TextField
            label="Nom du type d'entretien"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="URL vers votre modèle de l'entretien"
            fullWidth
            value={modeleUrl}
            onChange={(e) => setModeleUrl(e.target.value)}
          />

          <Upload
            multiple={false}
            onDrop={handleFileChange}
            onRemoveAll={() => setModeleFile(null)}
            onRemove={() => setModeleFile(null)}
            files={modeleFile ? [modeleFile] : []}
            placeholder="Déposez ou sélectionnez le fichier du modèle"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? 'Enregistrer' : 'Créer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
