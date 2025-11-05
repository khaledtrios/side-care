import React, { useState } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  IconButton,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { ADMINS } from 'src/_mock/_admins';

import { Iconify } from 'src/components/iconify';
import { TableHeadCustom } from 'src/components/table';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';

import AddAdminModal from './add-admin-modal';

const TABLE_HEAD = [
  { id: 'name', label: 'Nom et prénom' },
  { id: 'rights', label: 'Droit' },
  { id: 'roles', label: 'Rôles' },
  { id: 'email', label: 'Email' },
  { id: '' },
];
export default function AdminsEntrepriseTable() {
  const [adminsList, setAdminsList] = useState(ADMINS);

  const openAdd = useBoolean();

  const handleDelete = (indexToDelete) => {
    setAdminsList(adminsList.filter((_, index) => indexToDelete !== index));
  };
  return (
    <>
      <Card>
        <CardHeader
          title="Administrateurs Comptes RH"
          subheader="Les administrateurs de l'entreprise peuvent accéder à l'espace RH de l'entreprise ."
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="material-symbols:add-rounded" />}
              onClick={openAdd.onTrue}
            >
              Ajouter
            </Button>
          }
        />
        <CardContent>
          {adminsList.length ? (
            <Table>
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {adminsList.map((row, index) => (
                <AdminRow key={index} row={row} handleDelete={() => handleDelete(index)} />
              ))}
            </TableBody>
          </Table>
          ): <EmptyContent title='Aucun admin pour cet entreprise' />}
        </CardContent>
      </Card>
      <AddAdminModal open={openAdd.value} onClose={openAdd.onFalse}/>
    </>
  );
}

export const AdminRow = ({ row, handleDelete }) => {
  const openDelete = useBoolean();
  const openEdit = useBoolean();
  return (
    <>
      <TableRow>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.right}</TableCell>
        <TableCell>{row.roles}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell align="right" sx={{ px: 1 }}>
          {!row.isAdmin && (
            <Stack flexDirection="row">
              <IconButton color="error" onClick={openDelete.onTrue}>
                <Iconify icon="tabler:trash" />
              </IconButton>
              <IconButton onClick={openEdit.onTrue}>
                <Iconify icon="material-symbols:edit-outline" />
              </IconButton>
            </Stack>
          )}
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={openDelete.value}
        onClose={openDelete.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {row.name} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDelete();
              openDelete.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />
      <AddAdminModal open={openEdit.value} onClose={openEdit.onFalse} currentUser={row} />
    </>
  );
};
