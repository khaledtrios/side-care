import React, { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material';

export default function DocumentDialog({ open, onClose, document, documentTypes, isEdit }) {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    file: null,
  });

  useEffect(() => {
    if (isEdit && document) {
      setFormData({
        type: document.type || '',
        name: document.name || '',
        file: null, // File is not pre-filled for security reasons
      });
    } else {
      setFormData({ type: '', name: '', file: null });
    }
  }, [isEdit, document, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, type: newValue ? newValue.value : '' }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = () => {
    // Handle document submission logic here
    console.log(isEdit ? 'Edit document:' : 'Add document:', formData);
    onClose();
    setFormData({ type: '', name: '', file: null });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Modifier le document' : 'Ajouter un document'}</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={documentTypes}
          getOptionLabel={(option) => option.label}
          value={documentTypes.find((t) => t.value === formData.type) || null}
          onChange={handleAutocompleteChange}
          renderInput={(params) => (
            <TextField {...params} label="Type de document" margin="dense" fullWidth />
          )}
        />
        <TextField
          margin="dense"
          name="name"
          label="Nom du document"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
        />
        <Button component="label" variant="outlined" fullWidth sx={{ mt: 2 }}>
          Télécharger le fichier
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {formData.file && (
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Fichier sélectionné : {formData.file.name}
          </Typography>
        )}
        {isEdit && !formData.file && (
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Fichier actuel : {document?.file}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.type || !formData.name || (!formData.file && !isEdit)}
        >
          {isEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}