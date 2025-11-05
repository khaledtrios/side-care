import React, { useState } from 'react';

import {
  Card,
  Grid,
  Stack,
  Switch,
  Divider,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';

export default function EmailsTab() {
  const [categories, setCategories] = useState([
    {
      id: 'affiliations',
      title: 'Affiliations',
      features: [
        {
          id: 'historique_sante',
          title: 'Historique affiliations Santé',
          description:
            'Suivez toutes les modifications sur les affiliations Santé de vos salariés en temps réel qui vont impacter la paie.',
          enabled: true,
        },
      ],
    },
    {
      id: 'arret_travail',
      title: 'Arrêt de travail',
      features: [
        {
          id: 'creation_arret',
          title: 'Création arrêt par le gestionnaire de paie',
          description:
            'Vous êtes informé lorsque les gestionnaires de paie de vos entreprises créent un arrêt de travail depuis leur espace expert-comptable SideCare.',
          enabled: true,
        },
      ],
    },
    {
      id: 'gestion_effectifs',
      title: 'Gestion des effectifs',
      features: [
        {
          id: 'document_salarie',
          title: 'Nouveau document salarié',
          description:
            'Ajout d’un document (ex : RIB, attestation de sécurité sociale, etc.)',
          enabled: false,
        },
        {
          id: 'document_expert',
          title: 'Nouveau document expert-comptable',
          description:
            'Ajout d’un document d’un expert-comptable sur son espace',
          enabled: false,
        },
        {
          id: 'offboarding',
          title: 'Offboarding',
          description:
            '1 rappel des tâches à réaliser, 7 jours avant la date de fin de contrat d’un salarié.',
          enabled: true,
        },
        {
          id: 'periode_essai',
          title: 'Période d’essai',
          description:
            '2 rappels avant la fin de période d\'essai d\'un employé : 30 et 7 jours avant la date de fin.',
          enabled: true,
        },
      ],
    },
    {
      id: 'sirh',
      title: 'SIRH',
      features: [
        {
          id: 'note_frais',
          title: 'Notes de frais',
          description: 'Ajout d’une note de frais par un salarié.',
          enabled: true,
        },
        {
          id: 'note_frais_validation',
          title: 'Notes de frais en attente de validation',
          description: 'Notification quand une note de frais est en attente.',
          enabled: true,
        },
        {
          id: 'titre_transport',
          title: 'Titre de transport',
          description: 'Ajout d’un titre de transport par un salarié.',
          enabled: true,
        },
        {
          id: 'conges',
          title: 'Congés & Absences',
          description: 'Nouvelle demande de congés par un salarié.',
          enabled: true,
        },
        {
          id: 'conges_validation',
          title: 'Congés en attente de validation',
          description: 'Notification pour les congés non encore validés.',
          enabled: true,
        },
        {
          id: 'moodboard',
          title: 'Récapitulatif Moodboard',
          description:
            'Récapitulatif mensuel des résultats du Moodboard de votre équipe.',
          enabled: false,
        },
        {
          id: 'responsable_tache',
          title: 'Responsable tâche',
          description:
            'Une nouvelle tâche a été créée et vous êtes responsable.',
          enabled: false,
        },
        {
          id: 'evenements',
          title: 'Événements',
          description:
            'Récapitulatif hebdomadaire des événements d\'entreprises (ex : arrivées, départs, anniversaires, etc.)',
          enabled: true,
        },
      ],
    },
  ]);

  const handleToggle = (categoryId, featureId, newValue) => {
    const updated = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            features: category.features.map((feature) =>
              feature.id === featureId
                ? { ...feature, enabled: newValue }
                : feature
            ),
          }
        : category
    );
    setCategories(updated);
  };

  return (
    <Stack spacing={5}>
      {categories.map((category) => (
        <Stack key={category.id} spacing={2}>
          <Typography variant="h5">{category.title}</Typography>

          <Grid container spacing={2}>
            {category.features.map((feature) => (
              <Grid key={feature.id} item xs={12} md={6} lg={4}>
                <Card>
                  <CardHeader
                    title={feature.title}
                    action={
                      <Switch
                        checked={feature.enabled}
                        onChange={(e) =>
                          handleToggle(category.id, feature.id, e.target.checked)
                        }
                      />
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
}
