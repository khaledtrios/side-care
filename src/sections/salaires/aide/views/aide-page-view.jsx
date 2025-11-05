import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Button, CardHeader, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

import { AppWelcome } from '../app-welcome';
import { CustomerService } from '../customer-service';
import { BoiteOutilsItems } from '../course-widget-summary';

const videos = [
  {
    id: 1,
    title: "La SideCard : l'ultime avantage de vos salariés",
    description: 'LA carte bancaire qui avance les frais de santé de vos salariés ! ',
    videoUrl: 'https://www.youtube.com/embed/CMfmGjjYPEA',
  },
  {
    id: 2,
    title: 'Comment utiliser la SideCard ?',
    description:
      'Découvrez comment utiliser la SideCard pour avancer les frais de santé de vos salariés.',
    videoUrl: 'https://www.youtube.com/embed/CMfmGjjYPEA',
  },
  {
    id: 3,
    title: 'Comment parrainer vos amis ?',
    description: 'Apprenez à parrainer vos amis et à gagner des récompenses.',
    videoUrl: 'https://www.youtube.com/embed/CMfmGjjYPEA',
  },
  {
    id: 4,
    title: 'Comment exporter vos justificatifs ?',
    description: 'Découvrez comment exporter tous vos justificatifs en un clic.',
    videoUrl: 'https://www.youtube.com/embed/CMfmGjjYPEA',
  },
];

export default function AidePageView() {
  return (
    <DashboardContent>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Vous avez besoin d’un coup de main ? \n `}
            description="Notre centre d’aide vous accompagne sur la gestion de vos contrats de santé, le suivi des affiliations de vos salariés, etc"
            img={<SeoIllustration hideBackground />}
            action={
              <Button
                endIcon={<Iconify icon="gridicons:external" />}
                variant="contained"
                color="primary"
              >
                Consulter la FAQ
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <CustomerService
            //   price="$50"
            title="Support"
            description="Vous n’avez pas trouvé de réponse à votre question ?"
            imgUrl={`${CONFIG.assetsDir}/assets/illustrations/characters/call-center-agent.png`}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <BoiteOutilsItems
            icon={`${CONFIG.assetsDir}/assets/icons/navbar/ic-booking.svg`}
            title="Toutes les infos utiles pour démarrer sereinement"
            total="Démarrer sur SideCare"
            link={paths.salaries.aide.onboarding}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <BoiteOutilsItems
            icon={`${CONFIG.assetsDir}/assets/icons/navbar/ic-analytics.svg`}
            title="Vous avez une idée pour améliorer votre expérience"
            color="success"
            total="Demande d’amélioration"
            link={paths.salaries.aide.amelioration}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <BoiteOutilsItems
            icon={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`}
            title="Gagnez jusqu’à 200 € en carte cadeau en parrainant vos amis"
            color="info"
            total="Parrainage"
            link={paths.salaries.aide.parrainage}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <BoiteOutilsItems
            icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
            title="Exportez tous vos justificatifs en 1 clic"
            color="error"
            total="Contrôle URSSAF"
            link={paths.salaries.aide.urssaf}
          />
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6">Nos vidéo</Typography>
        </Grid>
        {videos.map((item, index) => (
          <Grid xs={12} md={4} key={index}>
            <Card sx={{ position: 'relative', mb: 3, maxHeight: 350, height: '100%' }}>
              <Box sx={{ width: '100%', height: 200 }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={item?.videoUrl}
                  title={item?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <CardHeader title={item?.title} />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {item?.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
