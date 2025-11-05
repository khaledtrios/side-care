import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ADMIN_DOCS } from 'src/_mock';
import React, { useCallback, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import { useBoolean } from 'src/hooks/use-boolean';
import { EmptyContent } from 'src/components/empty-content';
import DocumentItem from '../document-item';

export default function DocumentsEntrepriseView() {
  const [documents, setDocuments] = useState(ADMIN_DOCS);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);

  const open = useBoolean();

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);
  const deleteDocument = (indexToDelete) =>
    setDocuments(documents.filter((_, index) => index !== indexToDelete));
  return (
    <>
      <Stack spacing={2}>
        <Alert severity="info">
          Nous vous conseillons d&apos;ajouter des documents comme l&apos;affichage obligatoire, la
          CCN de votre entreprise ou tous les documents légaux ou de bienvenue pour les salariés.
          Depuis leur espace personnel, vos salariés pourront consulter ces documents.
        </Alert>
        <Card>
          <CardHeader
            title="Les documents de votre entreprise"
            action={
              <Button
                onClick={() => open.onTrue()}
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="ep:upload-filled" />}
              >
                Déposer un document
              </Button>
            }
          />
          <CardContent>
            <Stack spacing={2}>
              {documents.length ? (
                documents.map((row, index) => (
                  <DocumentItem key={index} row={row} toDelete={() => deleteDocument(index)} />
                ))
              ) : (
                <EmptyContent title="Pas de document" />
              )}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Les documents que nous vous suggérons d'ajouter à votre espace Entreprise" />
          <CardContent>
            <Stack spacing={2}>
              <Typography>Document unique d&apos;évaluation des risques (DUER) :</Typography>
              <Upload value={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
              <FormControlLabel
                label="Rendre ce document visible par les employés"
                control={
                  <Checkbox
                    size="medium"
                    defaultChecked
                    value={visible}
                    onChange={(e) => setVisible(e.target.value)}
                  />
                }
              />
              <Stack alignItems="flex-end">
                <Button variant="contained" color="primary">
                  Ajouter le document
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Dialog open={open.value} onClose={open.onFalse}>
        <DialogTitle>Déposer des fichiers</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1} my={2}>
            <Select
              value="Type 1"
              label="Type de document"
              input={<OutlinedInput label="Type de document" />}
            >
              {['Type 1'].map((type, index) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
            <TextField label="Nom de fichier" />
            <Upload />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack flexDirection="row" spacing={1}>
            <Button onClick={() => open.onFalse}>Annuler</Button>
            <Button variant="contained" color="primary">
              Enregistrer
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
