import { toast } from 'sonner';
import React, { useState } from 'react';

import {
  Box,
  Table,
  Button,
  Dialog,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function DemandeAmeliorationView() {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      description: "Ajouter un mode sombre à l'application",
      date: today(),
    },
    {
      id: 2,
      description: 'Permettre le téléchargement des rapports en PDF',
      date: today(),
    },
    {
      id: 3,
      description: 'Améliorer la vitesse de chargement du tableau de bord',
      date: today(),
    },
    {
      id: 4,
      description: 'Ajouter un champ de recherche dans la section clients',
      date: today(),
    },
  ]);

  const [description, setDescription] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // track row being edited

  const open = useBoolean();

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDescription(row.description);
    open.onTrue();
  };

  const handleSubmit = () => {
    if (description.trim()) {
      if (selectedRow) {
        // Update existing row
        const updatedData = tableData.map((item) =>
          item.id === selectedRow.id ? { ...item, description, date: today() } : item
        );
        setTableData(updatedData);
        toast.success("Demande d'amélioration mise à jour avec succès!");
      } else {
        // Add new row
        const newEntry = {
          id: tableData.length + 1,
          description,
          date: today(),
        };
        setTableData([...tableData, newEntry]);
        toast.success("Demande d'amélioration soumise avec succès!");
      }
      // Reset
      setDescription('');
      setSelectedRow(null);
      open.onFalse();
    } else {
      toast.error('Veuillez entrer une description.');
    }
  };

  const handleClose = () => {
    open.onFalse();
    setSelectedRow(null);
    setDescription('');
  };

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Suggestions d'améliorations"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: "Centre d'aide", href: paths.dashboard.aide.root },
            { name: 'Demande d’amélioration' },
          ]}
          action={
            <Button
              onClick={() => {
                setSelectedRow(null); // reset edit mode
                setDescription('');
                open.onTrue();
              }}
              variant="contained"
            >
              Proposer une amélioration
            </Button>
          }
        />
        <Box mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{fDate(row.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!tableData.length && <EmptyContent />}
        </Box>
      </DashboardContent>
      <Dialog open={open.value} onClose={handleClose}>
        <DialogTitle>
          {selectedRow ? "Modifier l'amélioration" : 'Proposer une amélioration'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci de votre intérêt pour l&apos;amélioration de notre application.
            {selectedRow
              ? ' Vous pouvez modifier votre suggestion ci-dessous.'
              : ' Veuillez décrire votre suggestion ci-dessous.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {selectedRow ? 'Mettre à jour' : 'Envoyer'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
