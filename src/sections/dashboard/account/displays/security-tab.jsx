import React, { useState } from 'react';
import {
  Card,
  Switch,
  Stack,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';

export default function SecurityTab() {
  const [settings, setSettings] = useState({
    doubleAuth: true,
    sessionExpiration: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const cards = [
    {
      key: 'doubleAuth',
      title: 'Double authentification par e-mail',
      description:
        'Pour vous connecter à votre espace, vous devez renseigner le code à 6 chiffres de confirmation envoyé par e-mail.',
    },
    {
      key: 'sessionExpiration',
      title: 'Expiration de ma session SideCare',
      description:
        "En activant cette option, votre session SideCare expirera au bout de 12 heures d'inactivité.",
    },
  ];

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.key} item xs={12} md={6}>
            <Card>
              <CardHeader
                title={card.title}
                action={
                  <Switch
                    checked={settings[card.key]}
                    onChange={() => handleToggle(card.key)}
                  />
                }
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
