import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  Select,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function EffectifsLinkView() {
  const [linkGenerated, setLinkGenerated] = useState(false);

  const {copy} = useCopyToClipboard();

  // Prototype link
  const invitationLink = 'https://example.com/invitation-link';

  const handleGenerateLink = () => {
    setLinkGenerated(true);
  };

  const onCopy = useCallback(
    (text) => {
      if (text) {
        toast.success('Copié!');
        copy(text);
      }
    },
    [copy]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Génération d'un lien d'invitation"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Invitation par lien' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CardHeader
          title="Génération d'un lien d'invitation unique pour l'affiliation de vos salariés"
          subheader="Vous pouvez ajouter tous les employés de votre société grâce à un lien d'invitation unique. Vous pouvez l'envoyer ensuite par email ou par chat à vos collaborateurs."
        />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack>
            <ol>
              <li>Générez un lien unique pour chacune de vos entreprises</li>
              <li>Envoyez le lien généré aux salariés concernés par mail</li>
              <li>
                Les salariés pourront compléter leurs informations, s&apos;affilier ou se dispenser
                aux différents contrats d&apos;assurance
              </li>
            </ol>
          </Stack>

          <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 280 } }}>
            <InputLabel htmlFor="product-filter-stock-select-label">
              Sélectionnez l&apos;entreprise
            </InputLabel>

            <Select
              input={<OutlinedInput label="Sélectionnez l'entreprise" />}
              label="Sélectionnez l'entreprise"
            >
              {['Jane Doe'].map((emp) => (
                <MenuItem key={emp} value={emp}>
                  {emp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
            <LoadingButton onClick={handleGenerateLink} variant="contained" size="large">
              Générer le lien
            </LoadingButton>
          </Stack>

          {linkGenerated && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Lien généré :{' '}
              <TextField
                fullWidth
                value={invitationLink}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy">
                        <IconButton onClick={() => onCopy(invitationLink)}>
                          <Iconify icon="eva:copy-fill" width={24} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Typography>
          )}
        </Stack>
      </Card>
    </DashboardContent>
  );
}
