import dayjs from 'dayjs';
import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  List,
  Paper,
  Button,
  ListItem,
  useTheme,
  Accordion,
  CardHeader,
  Typography,
  ListItemText,
  useMediaQuery,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fakeConges } from 'src/_mock/_conges';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable, getComparator } from 'src/components/table';

import CongeList from 'src/sections/dashboard/conges/conge-list';
import CongeDetails from 'src/sections/dashboard/conges/conge-details';

import AddCongeDialog from '../../conges/add-conge-dialog';

// Sample document types for file viewer logic
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

export default function SalariesDashboardView() {
  const [demandeConge, setDemandeConge] = useState([]);
  const [selectedConge, setSelectedConge] = useState(null);

  

  const table = useTable({ defaultOrderBy: 'startDate' });
  const filters = useSetState({
    period: 'all',
    status: 'all',
  });

  const [showDetailsMobile, setShowDetailsMobile] = useState(false);
  const open = useBoolean();

  const router = useRouter();

  const theme = useTheme();

  // Group documents by type
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {});

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredData = applyFilter({
    inputData: fakeConges,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const handleSelectConge = (conge) => {
    setSelectedConge(conge);
    if (isMobile) setShowDetailsMobile(true);
  };

  const handleBackToList = () => {
    setShowDetailsMobile(false);
  };

  return (
    <>
      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Bonjour, Admin 
        </Typography>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title="Mes congés à venir"
            action={
              <Button variant="contained" color="primary" onClick={open.onTrue}>
                Nouvelle demande
              </Button>
            }
          />
          <Box sx={{ p: 3 }}>
            {isMobile ? (
              showDetailsMobile && selectedConge ? (
                <>
                  <Button onClick={handleBackToList} sx={{ mb: 2 }}>
                    ← Retour à la liste
                  </Button>
                  <CongeDetails conge={selectedConge} />
                </>
              ) : (
                <CongeList
                  list={filteredData}
                  onSelect={handleSelectConge}
                  selectedId={selectedConge?.id}
                />
              )
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Paper sx={{ p: 2 }}>
                    <Scrollbar
                      sx={{
                        height: 320,
                      }}
                    >
                      <CongeList
                        list={filteredData}
                        onSelect={handleSelectConge}
                        selectedId={selectedConge?.id}
                      />
                    </Scrollbar>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Paper sx={{ p: 2, minHeight: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Détails du Congé
                    </Typography>
                    {selectedConge ? (
                      <CongeDetails conge={selectedConge} />
                    ) : (
                      <Typography color="text.secondary">
                        Sélectionnez un congé à gauche pour afficher les détails.
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </Card>
        <Card>
          <CardHeader
            title="Mes congés à venir"
            action={
              <Button
                startIcon={<Iconify icon="mingcute:calendar-add-line" />}
                variant="contained"
                color="primary"
                onClick={() => router.push(paths.salaries.documents.root)}
              >
                Voir
              </Button>
            }
            sx={{ mb: 3 }}
          />
          <Box sx={{ p: 3, pt: 0 }}>
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
                        <ListItem
                          secondaryAction={
                            <Button
                              variant="outlined"
                              color="primary"
                              LinkComponent={RouterLink}
                              href={paths.salaries.documents.view(doc.id)}
                              startIcon={<Iconify icon="eva:eye-outline" />}
                              sx={{ mr: 1 }}
                            >
                              Voir
                            </Button>
                          }
                          key={index}
                        >
                          <ListItemText
                            primary={doc.name}
                            secondary={`File: ${doc.file} | Date: ${doc.date}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Card>
      </DashboardContent>
      <AddCongeDialog open={open.value} onClose={open.onFalse} />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, period } = filters;

  // Sorting
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by status
  if (status !== 'all') {
    inputData = inputData.filter((conge) => conge.status === status);
  }

  // Filter by period (startDate within selected month)
  if (period !== 'all') {
    const start = dayjs(period).startOf('month');
    const end = dayjs(period).endOf('month');

    inputData = inputData.filter((conge) => {
      const date = dayjs(conge.startDate);
      return date.isSame(start, 'month');
    });
  }

  return inputData;
}
