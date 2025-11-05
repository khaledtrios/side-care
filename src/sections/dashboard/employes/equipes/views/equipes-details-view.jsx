import React from 'react';

import {
  Card,
  Link,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  ListItemText,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { TableEmptyRows, TableHeadCustom } from 'src/components/table';

const TABLE_HEAD = [
  { id: 'employe', label: 'Employé' },
  { id: 'manager', label: 'Manager' },
  { id: 'equipes', label: 'Equipe' },
  { id: 'startDate', label: 'Début de contrat' },
  { id: 'endDate', label: 'Fin de contrat' },
];
export default function EquipesDetailsView({ team }) {
  const confirm = useBoolean();

  const notFound = !team.employes.length;

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading={`Les employés présents dans l'équipe ${team.name}`}
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Equipe', href: paths.dashboard.equipes.root },
            { name: team?.name },
          ]}
          action={
            <Button variant="contained" color="error" onClick={confirm.onTrue}>
              Supprimer
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <CardHeader sx={{ pb: 3 }} title="Liste des employés" />
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {team.employes.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <ListItemText
                      sx={{ mb: 1 }}
                      primary={
                        <Link
                          component={RouterLink}
                          href={paths.dashboard.employes.view(emp.id)}
                          color="inherit"
                        >
                          {emp.name}
                        </Link>
                      }
                      secondary={emp.entreprise}
                      primaryTypographyProps={{ typography: 'subtitle1' }}
                      secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                      }}
                    />
                  </TableCell>
                  <TableCell>{emp.manager}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{fDate(emp.contract.startDate)}</TableCell>
                  <TableCell>{fDate(emp.contract?.endDate) || '-'}</TableCell>
                </TableRow>
              ))}
              <TableEmptyRows height={20} emptyRows={notFound} />
            </TableBody>
          </Table>
        </Card>
      </DashboardContent>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer équipe"
        content={`Êtes-vous sûr de vouloir effacer ${team.name}?`}
        action={
          <Button variant="contained" color="error" onClick={confirm.onFalse}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
