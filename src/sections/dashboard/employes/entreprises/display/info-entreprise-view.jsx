import React, { useState, useCallback } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { fData } from 'src/utils/format-number';

import { UploadAvatar } from 'src/components/upload';
import { EmptyContent } from 'src/components/empty-content';

export default function InfoEntrepriseView() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const handleDropAvatar = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setAvatarUrl(newFile);
  }, []);
  return (
    <Grid container spacing={2}>
        <Grid>
          <Card>
            <CardHeader
              title="Informations générales"
              action={
                <Button variant="contained" color="primary">
                  Modifier
                </Button>
              }
              sx={{ pb: 1 }}
            />
            <Divider />
            <Grid container spacing={2} p={2}>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Forme juridique de l’entreprise</Typography>
                </Grid>
                <Grid xs={6}>Association</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Raison sociale</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">SIREN</Typography>
                </Grid>
                <Grid xs={6}>12345678</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">SIRET</Typography>
                </Grid>
                <Grid xs={6}>12345678</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Numéro de TVA</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Siège social</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Code Postal</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Ville</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Activité de l&apos;entreprise</Typography>
                </Grid>
                <Grid xs={6}>Accueil de jeunes enfants</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Code APE/NAF</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Votre convention collective</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Votre convention collective</Typography>
                </Grid>
                <Grid xs={6}>-</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Chiffre d&apos;affaires</Typography>
                </Grid>
                <Grid xs={6}>Non renseigné</Grid>
              </Grid>
              <Grid container xs={12} md={6}>
                <Grid xs={6}>
                  <Typography variant="caption">Entreprise créée</Typography>
                </Grid>
                <Grid xs={6}>Oui</Grid>
              </Grid>
              <Grid xs={12}>
                <Divider />
              </Grid>
              <Grid xs={12}>
                <UploadAvatar
                  value={avatarUrl}
                  onDrop={handleDropAvatar}
                  validator={(fileData) => {
                    if (fileData.size > 1000000) {
                      return {
                        code: 'file-too-large',
                        message: `File is larger than ${fData(1000000)}`,
                      };
                    }
                    return null;
                  }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid>
          <Card>
            <CardHeader
              title="Démographie de votre entreprise"
              subheader="Afin de répondre à toutes vos obligations sociales il est important pour les assureurs de connaître les caractéristiques sur l'ensemble de vos salariés ainsi que la répartition entre cadres et non cadres."
            />
            <Divider />
            <CardContent>
              <Grid container>
                <Grid xs={12} md={4}>
                  <Typography textAlign="center" variant="h6">
                    Nombre de salariés
                  </Typography>
                  <EmptyContent title="Aucun résultat pour le moment..." />
                </Grid>
                <Grid xs={12} md={4}>
                  <Typography textAlign="center" variant="h6">
                    Âge moyen des salariés
                  </Typography>
                  <EmptyContent title="Aucun résultat pour le moment..." />
                </Grid>
                <Grid xs={12} md={4}>
                  <Typography textAlign="center" variant="h6">
                    Proportion hommes / femmes
                  </Typography>
                  <EmptyContent title="Aucun résultat pour le moment..." />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card>
            <CardHeader
              title="Masse salariale / Calcul Prévoyance"
              subheader="La prévoyance dépend des salaires bruts annuels de vos salariés. Grâce à ces salaires on peut calculer pour votre entreprise la masse salariale dans la tranche A, B, C. Pour plus d'informations sur les modalités de ce calcul veuillez vous référer à l'article suivant."
            />
            <Divider />
            <CardContent>
              <Grid container>
                <Grid xs={12} md={6}>
                  <Typography textAlign="center" variant="h6">
                    Masse salariale TA
                  </Typography>
                  <EmptyContent title="Aucun résultat pour le moment..." />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography textAlign="center" variant="h6">
                    Masse salariale TB
                  </Typography>
                  <EmptyContent title="Aucun résultat pour le moment..." />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  );
}
