import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Box,  
  Stack,
  Button,
  Accordion,
  Typography,
  IconButton,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import DocumentDialog from '../document-dialog';

const documentTypes = [
  { value: 'doc_employee_sick_leave_proof', label: 'Arrêt Maladie' },
  { value: 'third_part_sick_leave', label: 'Arrêt de travail (volet 3) et prolongations' },
  { value: 'doc_insurance_organism_proof', label: 'Attestation de couverture d’entreprise obligatoire ou de couverture individuelle' },
  { value: 'doc_social_security_certificate', label: 'Attestation de sécurité sociale' },
  { value: 'doc_not_defined', label: 'Autre' },
  { value: 'addendum_to_contract', label: 'Avenant au contrat' },
  { value: 'doc_affiliation', label: "Bulletin d'affiliation" },
  { value: 'doc_carte_tp', label: 'Carte Tiers Payant' },
  { value: 'doc_certificate_membership', label: "Certificat d'adhésion" },
  { value: 'doc_contract_signed', label: 'Contrat signé' },
  { value: 'doc_work_interruption_declaration', label: "Déclaration d'arrêt de travail prévoyance" },
  { value: 'doc_portability_declaration', label: 'Déclaration de portabilité' },
  { value: 'doc_invoice', label: 'Facture' },
  { value: 'doc_pay_slip', label: 'Fiche de paie' },
  { value: 'doc_employee_transport_receipt', label: 'Justificatif de transport' },
  { value: 'doc_benefit_solidarity_supplementary_health', label: 'Justificatif du bénéfice de la complémentaire santé solidaire' },
  { value: 'doc_employee_expense_report', label: 'Note de frais' },
  { value: 'driving_licence', label: 'Permis de conduire' },
  { value: 'doc_employee_identity_card', label: "Pièce d'identité" },
  { value: 'doc_insuree_rib', label: "RIB (Relevé d'identité bancaire)" },
];

function DocumentsTab() {
  const { watch } = useFormContext();
  const values = watch();
  const documents = values?.documents || [];

  const open = useBoolean()

  if (!documents.length) {
    return (
      <EmptyContent
        title="Aucun document trouvé"
        description="Ajoutez un document pour le voir apparaître ici."
      />
    );
  }

  return (
    <>
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={()=>open.onTrue()}>Ajouter un document</Button>
      </Stack>

      {documents.map((doc, index) => (
        <Accordion key={index} sx={{ borderRadius: 2, mb: 1, overflow: 'hidden' }}>
          <AccordionSummary expandIcon={<Iconify icon="ep:arrow-up-bold" />}>
            <Typography variant="subtitle1" fontWeight="bold">
              {doc.category}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {doc.childrens && doc.childrens.length > 0 ? (
              <Stack spacing={2}>
                {doc.childrens.map((child) => (
                  <Box
                    key={child.id}
                    p={2}
                    borderRadius={2}
                    flexDirection="row"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    sx={{ bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText primary={child.name} secondary={child.type} />
                    <IconButton
                      LinkComponent={RouterLink}
                      href={child.link}
                      sx={{ mt: 1, display: 'inline-block', h: 1 }}
                    >
                      <Iconify icon="uil:arrow-right" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun document dans cette catégorie.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
    <DocumentDialog open={open.value} onClose={open.onFalse} documentTypes={documentTypes}/>
    </>
  );
}

export default DocumentsTab;
