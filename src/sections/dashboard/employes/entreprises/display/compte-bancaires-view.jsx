import React, { useState } from 'react'

import { Card, Stack, Table, Button, TableRow, TableBody, TableCell, CardHeader, CardContent } from '@mui/material'

import { useBoolean } from 'src/hooks/use-boolean'

import { BANK_ACCOUNT } from 'src/_mock/_admins'

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify'
import { TableHeadCustom } from 'src/components/table'
import { EmptyContent } from 'src/components/empty-content'
import { ConfirmDialog } from 'src/components/custom-dialog'

import AddBankModal from './add-bank-modal'

const TABLE_HEAD = [
    { id: 'user', label: 'Utilisateur' },
    { id: 'iban', label: 'IBAN' },
    { id: 'bic', label: 'BIC' },
    { id: 'isDefault', label: 'Statut' },
    { id: '' },
  ];
export default function CompteBancairesView() {
    const [accounts, setAccounts] = useState(BANK_ACCOUNT)
    const openAdd = useBoolean()
    const handleDelete = (indexToDelete) => {
        setAccounts(accounts.filter((_,index) => index !== indexToDelete))
    }
  return (
    <>
    <Card>
          <CardHeader
            title="Comptes bancaires de l'entreprise"
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
            {accounts.length ? (
              <Table>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {accounts.map((row, index) => (
                    <AdminRow key={index} row={row} handleDelete={() => handleDelete(index)} />
                ))}
              </TableBody>
            </Table>
            ): <EmptyContent title='Pas des comptes bancaires' />}
          </CardContent>
        </Card>
        <AddBankModal open={openAdd.value} onClose={openAdd.onFalse} />
        </>
  )
}

export const AdminRow = ({ row, handleDelete }) => {
    const openDelete = useBoolean();
    return (
      <>
        <TableRow>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.iban}</TableCell>
          <TableCell>{row.bic}</TableCell>
          <TableCell>
            {row.isDefault && <Label variant="filled" color="primary">Default</Label>}
          </TableCell>
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
              Êtes-vous sûr de vouloir supprimer ce compte bancaire?
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