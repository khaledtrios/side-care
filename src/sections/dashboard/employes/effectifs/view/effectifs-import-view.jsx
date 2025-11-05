import React from 'react';
import { useTheme } from '@emotion/react';

import { Box, Card, List, Alert, Stack, Button, ListItem  , Typography, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function EffectifsImportView() {

    const theme = useTheme();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Importation des employés"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Importation' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card sx={{ backgroundColor: '#FFF8F2', p: 4 }}>
      <Stack spacing={4}>
        {/* 1. Download Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            1. Télécharger le fichier Excel
          </Typography>
          <Button
            variant="outlined"
            // startIcon={<DownloadIcon />}
            sx={{ color: '#F46A11', borderColor: '#F46A11', '&:hover': { borderColor: '#c9580e' } }}
          >
            Télécharger
          </Button>
        </Box>

        {/* 2. Instructions Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            2. Compléter le fichier avec les informations requises
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            Attention, tous les champs sont <strong>obligatoires</strong> sauf ceux indiqués comme
            facultatifs sur l&apos;excel.
          </Alert>

          <List dense>
            <ListItem>
              <ListItemText
                primary={
                  <Typography>
                    <strong style={{ color: '#F46A11' }}>• Type de contrat :</strong> CDI, CDD,
                    CDD d&apos;usage, Contrat de professionnalisation, Freelance, Interim (contrat
                    de mission), Mandat social (non assimilé salarié), Mandat social (assimilé
                    salarié), Stage, Apprenti, Autre type de contrat
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Typography>
                    <strong style={{ color: '#F46A11' }}>• Collège :</strong> Cadre, Non cadre
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Typography>
                    <strong style={{ color: '#F46A11' }}>• Les dates</strong> sont au format
                    JJ/MM/AAAA
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Typography>
                    <strong>• Pour les salariés en reprise de portabilité uniquement</strong>, précisez la
                    date de fin de contrat et indiquez “Oui” sur la colonne la reprise de
                    portabilité. Les employés seront créés automatiquement.
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>

        {/* 3. Import Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            3. Importer le fichier
          </Typography>

          <Button
            variant="outlined"
            // startIcon={<UploadIcon />}
            sx={{
              borderStyle: 'dashed',
              borderColor: '#F46A11',
              color: '#F46A11',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor: '#c9580e',
              },
            }}
          >
            Déposer
          </Button>
        </Box>
      </Stack>
    </Card>
    </DashboardContent>
  );
}
