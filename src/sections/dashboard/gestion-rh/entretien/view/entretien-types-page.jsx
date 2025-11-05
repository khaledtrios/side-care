import React, { useState } from 'react';

import {
  Card,
  Table,
  Button,
  Switch,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TypeEntretienDialog from '../type-entretien-dialog';

const typesEntretienInitial = [
  {
    id: 1,
    title: 'Entretien étape projet',
    entreprise: 'Société 1',
  },
];

const entreprises = [
  { id: '1', label: 'Société 1' },
  { id: '2', label: 'Portorium Consulting' },
];

export default function EntretienTypesPage() {
  const router = useRouter();
  const { id } = useParams();
  const selectedEntreprise = entreprises.find((e) => e.id === id) || entreprises[0];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [typesEntretien, setTypesEntretien] = useState(typesEntretienInitial);
  const [currentType, setCurrentType] = useState(null);

  const handleOpenCreate = () => {
    setCurrentType(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (type) => {
    setCurrentType(type);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (typeData) => {
    if (typeData.id) {
      // Edit mode
      setTypesEntretien((prev) => prev.map((t) => (t.id === typeData.id ? typeData : t)));
    } else {
      // Create mode
      const newId = Math.max(0, ...typesEntretien.map((t) => t.id)) + 1;
      setTypesEntretien((prev) => [...prev, { ...typeData, id: newId }]);
    }
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Paramétrage des entretiens"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
          { name: 'Entretien', href: paths.dashboard.gestionRh.entretien.root },
          { name: 'Personnaliser' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            color="primary"
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={handleOpenCreate}
          >
            Ajouter un type d&apos;entretien
          </Button>
        }
      />

      {!typesEntretien.length ? (
        <EmptyContent
          description={`Le module d'entretiens n'est pas activé pour ${selectedEntreprise}`}
          action={<Switch size="sm" label="Activer le module" />}
        />
      ) : (
        <Card>
          <CardHeader
            title="Types d'entretiens"
            action={
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Entreprise</InputLabel>
                <Select
                  value={selectedEntreprise.id}
                  label="Entreprise"
                  onChange={(e) =>
                    router.push(paths.dashboard.gestionRh.entretien.types(e.target.value))
                  }
                >
                  {entreprises.map((ent) => (
                    <MenuItem key={ent.id} value={ent.id}>
                      {ent.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
            sx={{pb : 2}}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Entretien</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {typesEntretien?.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>{type.title}</TableCell>
                  <TableCell>{type.entreprise}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenEdit(type)}>
                      <Iconify icon="lucide:edit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <TypeEntretienDialog
        open={dialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={currentType}
      />
    </DashboardContent>
  );
}
