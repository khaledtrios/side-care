import React from 'react';

import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { SalariesContent } from 'src/layouts/salarie';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DocumentDialog from '../document-dialog';


// Sample document types for file viewer logic
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

export default function DocumentViewPage({ document }) {
  const editOpen = useBoolean();

  // Determine file viewer based on file extension
  const renderFileViewer = () => {
    if (!document?.file) return <Typography>Aucun fichier disponible</Typography>;

    const fileExtension = document.file.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      return (
        <iframe
          src={`/files/${document.file}`}
          title={document.name}
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={`/files/${document.file}`} alt={document.name} style={{ maxWidth: '100%' }} />;
    }

    return <Typography>Fichier non pris en charge pour la visualisation</Typography>;
  };

  return (
    <SalariesContent>
      <CustomBreadcrumbs
        heading={document?.name || 'Document'}
        links={[
          { name: 'Tableau de bord', href: paths.salaries.root },
          { name: 'Mes documents', href: paths.salaries.documents.root },
          { name: document?.name || 'Document' },
        ]}
        action={
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="eva:download-fill" />}
              href={`/files/${document?.file}`}
              download
              sx={{ mr: 1 }}
            >
              Télécharger
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Iconify icon="eva:edit-fill" />}
              onClick={editOpen.onTrue}
            >
              Modifier
            </Button>
          </>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CardHeader title="Détails du document" />
        <CardContent>
          <Typography variant="body1">
            <strong>Type:</strong>{' '}
            {documentTypes.find((t) => t.value === document?.type)?.label || document?.type}
          </Typography>
          <Typography variant="body1">
            <strong>Nom:</strong> {document?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Fichier:</strong> {document?.file}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {document?.date}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardHeader title="Aperçu du fichier" />
        <CardContent>{renderFileViewer()}</CardContent>
      </Card>

      <DocumentDialog
        open={editOpen.value}
        onClose={editOpen.onFalse}
        document={document}
        documentTypes={documentTypes}
        isEdit
      />

      
    </SalariesContent>
  );
}