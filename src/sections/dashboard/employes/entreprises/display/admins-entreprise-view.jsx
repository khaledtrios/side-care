import { Stack } from '@mui/material'
import React from 'react'
import AdminsEntrepriseTable from './admins-entreprise-table'
import ExpertComptableTable from './expert-comptable-table'

export default function AdminsEntrepriseView() {
  return (
    <Stack spacing={2}>
        <AdminsEntrepriseTable />
        <ExpertComptableTable />
    </Stack>
  )
}
