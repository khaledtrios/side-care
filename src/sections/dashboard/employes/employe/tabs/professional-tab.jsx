import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Divider,
  MenuItem,
  CardHeader,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { ENTREPRISE_LIST } from 'src/_mock/_entreprises';

import { Field } from 'src/components/hook-form';

export function ProfessionalTab() {
  const [formats, setFormats] = useState(() => ['bold', 'italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const formatContent = [
    <ToggleButton key="monday" value="monday">
      L
    </ToggleButton>,
    <ToggleButton key="tuesday" value="tuesday">
      M
    </ToggleButton>,
    <ToggleButton key="wednesday" value="wednesday">
      M
    </ToggleButton>,
    <ToggleButton key="thursday" value="thursday">
      J
    </ToggleButton>,
    <ToggleButton key="friday" value="friday">
      V
    </ToggleButton>,
    <ToggleButton key="saturday" value="saturday">
      S
    </ToggleButton>,
    <ToggleButton key="sunday" value="sunday">
      D
    </ToggleButton>,
  ];
  return (
    <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              pt: 2,
              pb: 5,
              px: 3,
            }}
          >
            <CardHeader title="Informations professionnelles" sx={{ pb: 3 }} />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Select name="company" multiple label="Entreprise">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {ENTREPRISE_LIST.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="matricule" label="Matricule de l'employé" />
              <Field.Text name="poste" label="Poste" />
              <Field.Select name="team" multiple label="Equipe">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: 'Comptable', value: 'comptable' },
                  { label: 'Po', value: 'po' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="manager" label="Manager">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: 'AAA', value: 'aaa' },
                  { label: 'BBB', value: 'bbb' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="empManager" multiple label="Employés managés">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: 'AAA', value: 'aaa' },
                  { label: 'BBB', value: 'bbb' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="emailPro" label="E-mail professionnel" />
              <Field.Phone name="phonePro" label="Téléphone professionnel" />
              <Field.Switch name="arret" labelPlacement="start" label="En arrêt" />
              <Field.Switch name="handicap" labelPlacement="start" label="Travailleur handicapé" />
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card
            sx={{
              pt: 2,
              pb: 5,
              px: 3,
              mb:2
            }}
          >
            <CardHeader title="Contrat de travail" sx={{ pb: 3 }} />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.DatePicker name="startDate" label="Date de début" />
              <Field.DatePicker name="endDate" label="Date de fin" />
              <Field.DatePicker name="endDateEssai" label="Date de fin de période d’essai" />
              <Field.DatePicker
                name="endDateSecondEssai"
                label="Date de fin de la 2ème période d’essai"
              />
              <Field.Select name="contractType" multiple label="Type de contrat">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: 'CDD', value: 'cdd' },
                  { label: "CDD d'usage", value: 'cddUsage' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="college" multiple label="Collége">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: 'Cadre', value: 'cadre' },
                  { label: 'Non cadre', value: 'nonCadre' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="salary" label="Salaire annuel brut" />
              <Field.Select name="period" label="Période de versement des salaires">
                <MenuItem value="">Aucun</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {[
                  { label: '12 Mois', value: '12m' },
                  { label: '13 Mois', value: '13m' },
                  { label: '14 Mois', value: '14m' },
                  { label: '15 Mois', value: '15m' },
                  { label: '16 Mois', value: '16m' },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="position" label="Position" />
              <Field.Text name="coefficient" label="Coefficient" />
              <Box>
                <InputLabel>Contract de travail</InputLabel>
                <Field.UploadBox sx={{ width: 1 }} name="contract" label="Contrat de travail" />
              </Box>
            </Box>
          </Card>
          <Card
            sx={{
              pt: 2,
              pb: 5,
              px: 3,
            }}
          >
            <CardHeader title="Temps de travail" sx={{ pb: 3 }}/>
            <ToggleButtonGroup sx={{ mb: 2 }} color='primary'   value={formats} onChange={handleFormat}>
              {formatContent}
            </ToggleButtonGroup>
            <Field.Text name="duree" label="Durée de travail hebdomadaire" />
          </Card>
        </Grid>
      </Grid>
  );
}
