import React from 'react';

// import { Download } from '@mui/icons-material';
import { Box, Card, Grid, Chip, Button, Divider, Typography, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function NotesViewPage({ note }) {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Note de frais"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Notes de frais', href: paths.comptable.notes.root },
          { name: `${fDate(note?.date)} - ${note?.type}` },
        ]}
        action={
          <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap={2}>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<Iconify icon="material-symbols:edit-rounded" />}
              href={paths.comptable.notes.edit(note.id)}
              LinkComponent={RouterLink}
            >
              Modifier
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<Iconify icon="material-symbols:delete-outline-rounded" />}
            >
              Supprimer
            </Button>
          </Box>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Détails de la note
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Employé
              </Typography>
              <Typography variant="body1">{note.employe}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body1">{note.type}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Date de la note
              </Typography>
              <Typography variant="body1">{fDate(note.date)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Date de création
              </Typography>
              <Typography variant="body1">{fDate(note.created_at)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Statut
              </Typography>
              <Chip label={note.status} color="warning" variant="outlined" sx={{ mt: 0.5 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Montant Total (€)
              </Typography>
              <Typography variant="body1">{note.amount.toFixed(2)}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">{note.description}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Pièce jointe
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="material-symbols:download-rounded" />}
                disabled={!note.file}
                href={note.file || '#'}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 1 }}
              >
                Télécharger
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Détail TVA
          </Typography>

          <Grid container spacing={2}>
            {[
              { label: 'TVA 20%', value: note.tva20 },
              { label: 'TVA 10%', value: note.tva10 },
              { label: 'TVA 5%', value: note.tva5 },
              { label: 'TVA 2%', value: note.tva2 },
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography>{item.value} €</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Iconify icon="material-symbols:check-circle-rounded" />}
            >
              Valider
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Iconify icon="material-symbols:cancel-rounded" />}
            >
              Refuser
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ComptableContent>
  );
}
