import React from 'react';

import { Box, Grid, Card, Button, Typography } from '@mui/material';
// import { MailOutline } from '@mui/icons-material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const steps = [
  {
    step: '1ère étape',
    color: 'error.main',
    title: 'Exportez vos contrats d’assurance',
    description:
      'Retrouvez toutes les conditions particulières et les DUE associées aux contrats collectifs de vos entreprises.',
    button: 'Recevoir par e-mail',
    imageUrl:
      'https://www.sidecare.com/assets/espace-entreprise/urssaf_controls/step_1-646dcd2278f34f6dec3845a52ca4b1b59c844c5e99ad5be103fa240df86687dc.webp',
  },
  {
    step: '2ème étape',
    color: 'warning.main',
    title: 'Exportez vos justificatifs de dispense',
    description:
      'Récupérez en un clic tous les justificatifs de dispense signés par vos salariés, pour l’ensemble de vos entités.',
    button: 'Recevoir par e-mail',
    imageUrl: 'https://www.sidecare.com/assets/espace-entreprise/urssaf_controls/step_2-2d315dfda1a9bd64ca28540bfa6ba48cbb7e925c1acd2001e908c45b3a96acb4.webp', // placeholder URL
  },
  {
    step: '3ème étape',
    color: 'secondary.main',
    title: 'Exportez les dates d’émargement des DUE',
    description:
      'Pour chaque affiliation, un email contenant la DUE est envoyé. Exportez ici le fichier certifié par SideCare avec les dates d’émargement de vos salariés.',
    button: 'Recevoir par e-mail',
    imageUrl: 'https://www.sidecare.com/assets/espace-entreprise/urssaf_controls/step_3-c7ab1c8683d5ace70f2250ea0c6f771291216090fac196f22ab744be62ed33fe.webp', // placeholder URL
  },
];

export default function UrssafPageView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="URSSAF"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: "Centre d'aide", href: paths.dashboard.aide.root },
          { name: 'URSSAF' },
        ]}
      />

      <Typography variant="body2" color="text.secondary" mb={3}>
        SideCare vous accompagne <br />
        Vos justificatifs seront envoyés à <b>chihahou10@gmail.com</b>
      </Typography>

      <Grid container spacing={3}>
        {steps.map((step, idx) => (
          <Grid item xs={12} key={idx}>
            <Card
              sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              {/* Left: Step details */}
              <Box flex={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: step.color, fontWeight: 'bold', mb: 1 }}
                >
                  {step.step}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {step.description}
                </Typography>
                <Button
                  variant="outlined"
                //   startIcon={<MailOutline />}
                  sx={{ textTransform: 'none' }}
                >
                  {step.button}
                </Button>
              </Box>

              {/* Right: Illustration */}
              <Box
                component="img"
                src={step.imageUrl}
                alt={`Illustration ${step.step}`}
                sx={{
                  ml: 3,
                  width: { xs: 240, md: 300 },
                  height: 'auto',
                  borderRadius: 1,
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
