import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useFormContext } from 'react-hook-form';

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
  const { watch } = useFormContext();
  const [formats, setFormats] = useState(() => watch('formats', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']));
  const Location = useLocation();
  const isReadOnly = Location.pathname.includes('espace-salaries')
  console.log(isReadOnly);

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
            <Field.Select name="company" multiple label="Entreprise" disabled={isReadOnly}>
              <MenuItem value="">Aucun</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {ENTREPRISE_LIST.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name="matricule" label="Matricule de l'employé" disabled={isReadOnly}/>
            <Field.Text name="poste" label="Poste" disabled={isReadOnly}/>
            <Field.Select name="team" multiple label="Equipe" disabled={isReadOnly}>
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
            <Field.Select name="manager" label="Manager" disabled={isReadOnly}>
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
            <Field.Select name="empManager" multiple label="Employés managés" disabled={isReadOnly}>
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
            <Field.Text name="emailPro" label="E-mail professionnel" disabled={isReadOnly}/>
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
            mb: 2,
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
            <Field.DatePicker name="startDate" label="Date de début" disabled={isReadOnly}/>
            <Field.DatePicker name="endDate" label="Date de fin" disabled={isReadOnly}/>
            <Field.DatePicker name="endDateEssai" label="Date de fin de période d’essai" disabled={isReadOnly}/>
            <Field.DatePicker
              name="endDateSecondEssai"
              label="Date de fin de la 2ème période d’essai"
              disabled={isReadOnly}
            />
            <Field.Select name="contractType" multiple label="Type de contrat" disabled={isReadOnly}>
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
            <Field.Select name="college" multiple label="Collége" disabled={isReadOnly}>
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
            <Field.Text name="salary" label="Salaire annuel brut" disabled={isReadOnly}/>
            <Field.Select name="period" label="Période de versement des salaires" disabled={isReadOnly}>
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
            <Field.Text name="position" label="Position" disabled={isReadOnly}/>
            <Field.Text name="coefficient" label="Coefficient" disabled={isReadOnly}/>
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
          <CardHeader title="Temps de travail" sx={{ pb: 3 }} />
          <ToggleButtonGroup sx={{ mb: 2 }} color="primary" value={formats} onChange={handleFormat} disabled={isReadOnly} >
            {formatContent}
          </ToggleButtonGroup>
          <Field.Text name="duree" label="Durée de travail hebdomadaire" />
        </Card>
      </Grid>
    </Grid>
  );
}