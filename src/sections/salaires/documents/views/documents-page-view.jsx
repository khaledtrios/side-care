import React, { useState } from 'react';

import {
  Box,
  List,
  Card,
  Button,
  ListItem,
  Accordion,
  Typography,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { SalariesContent } from 'src/layouts/salarie';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DocumentDialog from '../document-dialog';

// Sample document data
const documents = [
  {
    id: 1,
    type: 'doc_pay_slip',
    name: 'Pay Slip January 2025',
    file: 'pay_slip_jan2025.pdf',
    date: '2025-01-15',
  },
  {
    id: 2,
    type: 'doc_pay_slip',
    name: 'Pay Slip February 2025',
    file: 'pay_slip_feb2025.pdf',
    date: '2025-02-15',
  },
  {
    id: 3,
    type: 'doc_employee_identity_card',
    name: 'National ID',
    file: 'national_id.pdf',
    date: '2024-12-10',
  },
  {
    id: 4,
    type: 'doc_not_defined',
    name: 'Miscellaneous Doc',
    file: 'misc_doc.pdf',
    date: '2025-03-01',
  },
];

// Document type mapping from select options
const documentTypes = [
  { value: 'doc_employee_sick_leave_proof', label: 'Arrêt Maladie' },
  { value: 'third_part_sick_leave', label: 'Arrêt de travail (volet 3) et prolongations' },
  {
    value: 'doc_insurance_organism_proof',
    label: 'Attestation de couverture d’entreprise obligatoire ou de couverture individuelle',
  },
  { value: 'doc_social_security_certificate', label: 'Attestation de sécurité sociale' },
  { value: 'doc_not_defined', label: 'Autre' },
  { value: 'addendum_to_contract', label: 'Avenant au contrat' },
  { value: 'doc_affiliation', label: "Bulletin d'affiliation" },
  { value: 'doc_carte_tp', label: 'Carte Tiers Payant' },
  { value: 'doc_certificate_membership', label: "Certificat d'adhésion" },
  { value: 'doc_contract_signed', label: 'Contrat signé' },
  {
    value: 'doc_work_interruption_declaration',
    label: "Déclaration d'arrêt de travail prévoyance",
  },
  { value: 'doc_portability_declaration', label: 'Déclaration de portabilité' },
  { value: 'doc_invoice', label: 'Facture' },
  { value: 'doc_pay_slip', label: 'Fiche de paie' },
  { value: 'doc_employee_transport_receipt', label: 'Justificatif de transport' },
  {
    value: 'doc_benefit_solidarity_supplementary_health',
    label: 'Justificatif du bénéfice de la complémentaire santé solidaire',
  },
  { value: 'doc_employee_expense_report', label: 'Note de frais' },
  { value: 'driving_licence', label: 'Permis de conduire' },
  { value: 'doc_employee_identity_card', label: "Pièce d'identité" },
  { value: 'doc_insuree_rib', label: "RIB (Relevé d'identité bancaire)" },
];

export default function DocumentsPageView() {
  const addOpen = useBoolean();
  const editOpen = useBoolean();
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Group documents by type
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {});

  // Handle edit button click
  const handleEditClick = (doc) => {
    setSelectedDocument(doc);
    editOpen.onTrue();
  };

  return (
    <SalariesContent>
      <CustomBreadcrumbs
        heading="Espace documents"
        description="Retrouvez sur cette page l'ensemble des documents vous concernant que vous avez déposés"
        links={[{ name: 'Tableau de bord', href: paths.salaries.root }, { name: 'Mes documents' }]}
        action={
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              onClick={addOpen.onTrue}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Ajouter un document
            </Button>
          </Box>
        }
        sx={{ mb: { xs: 0, md: 5 } }}
      />

      {/* Mobile-only add button under breadcrumbs */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mt: 2, mb: { xs: 3, md: 0 } }}>
        <Button
          onClick={addOpen.onTrue}
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ width: '100%' }}
        >
          Ajouter un document
        </Button>
      </Box>
      <Card>
        {Object.keys(groupedDocuments).map((type) => {
          const typeLabel = documentTypes.find((t) => t.value === type)?.label || type;
          return (
            <Accordion key={type}>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography>{typeLabel}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {groupedDocuments[type].map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={doc.name}
                        secondary={`File: ${doc.file} | Date: ${doc.date}`}
                      />

                      {/* Desktop actions (inline) */}
                      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          component={RouterLink}
                          href={paths.salaries.documents.view(doc.id)}
                          startIcon={<Iconify icon="eva:eye-outline" />}
                          sx={{ mr: 1 }}
                        >
                          Voir
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<Iconify icon="eva:edit-fill" />}
                          onClick={() => handleEditClick(doc)}
                        >
                          Modifier
                        </Button>
                      </Box>

                      {/* Mobile actions (stacked under text) */}
                      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, mt: 1 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          component={RouterLink}
                          href={paths.salaries.documents.view(doc.id)}
                          startIcon={<Iconify icon="eva:eye-outline" />}
                          sx={{ width: '100%' }}
                        >
                          Voir
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<Iconify icon="eva:edit-fill" />}
                          sx={{ width: '100%' }}
                          onClick={() => handleEditClick(doc)}
                        >
                          Modifier
                        </Button>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>

     {/* Dialog for adding new document */}
      <DocumentDialog
        open={addOpen.value}
        onClose={addOpen.onFalse}
        documentTypes={documentTypes}
        isEdit={false}
      />

      {/* Dialog for editing document */}
      <DocumentDialog
        open={editOpen.value}
        onClose={editOpen.onFalse}
        document={selectedDocument}
        documentTypes={documentTypes}
        isEdit
      />
    </SalariesContent>
  );
}
