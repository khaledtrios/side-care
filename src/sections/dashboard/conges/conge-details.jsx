import React, { useRef, useState } from 'react';

// import UploadIcon from '@mui/icons-material/Upload';
import { Box, Typography, Chip, Button, Stack, Card, Divider } from '@mui/material';

export default function CongeDetails({ conge }) {
    const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  if (!conge) return null;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Here you can also handle the file upload logic (e.g., send to API)
      console.log('Uploaded file:', file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        p: 3,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {conge.employe.name} - {conge.type} - {conge.daysCount} Jours
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Demande créée le {new Date(conge.createDate).toLocaleDateString('fr-FR')}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Box textAlign="center">
          <Typography variant="caption" fontWeight="bold" color="white" bgcolor="orange" px={1} borderRadius={1}>
            {new Date(conge.startDate).getFullYear()}
          </Typography>
          <Card variant="outlined" sx={{ mt: 0.5, px: 2, py: 1 }}>
            <Typography variant="body2">{formatDate(conge.startDate)}</Typography>
            <Typography variant="caption">Matin</Typography>
          </Card>
        </Box>

        <Typography fontSize={28}>›</Typography>

        <Box textAlign="center">
          <Typography variant="caption" fontWeight="bold" color="white" bgcolor="orange" px={1} borderRadius={1}>
            {new Date(conge.endDate).getFullYear()}
          </Typography>
          <Card variant="outlined" sx={{ mt: 0.5, px: 2, py: 1 }}>
            <Typography variant="body2">{formatDate(conge.endDate)}</Typography>
            <Typography variant="caption">Matin</Typography>
          </Card>
        </Box>
      </Stack>

      <Divider />

      <Typography>
        <strong>Description :</strong> {conge.description || 'Aucune description'}
      </Typography>

       <Box>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button
          size="small"
        //   startIcon={<UploadIcon />}
          variant="contained"
          color="warning"
          onClick={handleUploadClick}
        >
          Ajouter un justificatif
        </Button>
        {uploadedFileName && (
          <Typography variant="caption" color="text.secondary" mt={1}>
            Fichier sélectionné : {uploadedFileName}
          </Typography>
        )}
      </Box>

      <Typography>
        <strong>Message à l&apos;employé :</strong>{' '}
        {conge.message || <em style={{ color: '#999' }}>Non défini</em>}
      </Typography>

      <Box sx={{ mt: 'auto' }}>
        <Button variant="contained" color="secondary" fullWidth>
          Voir
        </Button>
      </Box>
    </Card>
  );
}
