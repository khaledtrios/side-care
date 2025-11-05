import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from '@mui/material';
  import React, { useState } from 'react';
  import { EXPERTS } from 'src/_mock/_admins';
  import { ConfirmDialog } from 'src/components/custom-dialog';
  import { Iconify } from 'src/components/iconify';
  import { TableHeadCustom } from 'src/components/table';
  import { useBoolean } from 'src/hooks/use-boolean';
  import { EmptyContent } from 'src/components/empty-content';
import AddExpertModal from './add-expert-modal';
  
  const TABLE_HEAD = [
    { id: 'entreprise', label: 'Entreprise' },
    { id: 'cabinet', label: 'Cabinet Comptable' },
    { id: 'gestion', label: 'Gestionnaire de paie' },
    { id: 'email', label: 'Email' },
    { id: '' },
  ];
  export default function ExpertComptableTable() {
    const [adminsList, setAdminsList] = useState(EXPERTS);

    const openAdd = useBoolean()
  
    const handleDelete = (indexToDelete) => {
      setAdminsList(adminsList.filter((_, index) => indexToDelete !== index));
    };
    return (
      <>
        <Card>
          <CardHeader
            title="Expert-Comptable : Invitez votre Gestionnaire de paie"
            subheader="Dans cette section vous pouvez inviter votre gestionnaire de paie si vous avez un gestionnaire de paie au sein d'un cabinet d'expertise comptable. Ce gestionnaire aura alors un espace dédié qui lui permettra d'avoir accès aux informations relatives à la paie et à la gestion de vos contrats d'assurance."
            action={
              adminsList.length ? '' : (
                <Button
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="material-symbols:add-rounded" />}
                onClick={openAdd.onTrue}
             >
                Ajouter
              </Button>
              )
            }
          />
          <CardContent>
            {adminsList.length ? (
              <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {adminsList.map((row, index) => (
                  <>
                    <AdminRow key={index} row={row} handleDelete={() => handleDelete(index)} />
                  </>
                ))}
              </TableBody>
            </Table>
            ): <EmptyContent title='Pas des experts comptables pour cet entreprise' />}
          </CardContent>
        </Card>
        <AddExpertModal open={openAdd.value} onClose={openAdd.onFalse} />
      </>
    );
  }
  
  export const AdminRow = ({ row, handleDelete }) => {
    const openDelete = useBoolean();
    return (
      <>
        <TableRow>
          <TableCell>{row.entreprise}</TableCell>
          <TableCell>{row.cabinet}</TableCell>
          <TableCell>{row.gestion}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell align="right" sx={{ px: 1 }}>
           
              <Stack flexDirection="row">
                <Button variant='contained' startIcon={<Iconify icon="tabler:trash" />} color="error" onClick={openDelete.onTrue}>
                  Retirer
                </Button>
              </Stack>
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
      </>
    );
  };
  