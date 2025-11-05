import { Avatar, Box, Button, Card, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { INTEGRATIONS } from 'src/_mock/_admins';

export default function IntegrationsTableView() {
  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Les intégrations
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {INTEGRATIONS.map((row,index) => (
            <Card sx={{ display: 'flex', alignItems: 'center', p: (theme) => theme.spacing(3, 2, 3, 3) }}>
            <Avatar alt={row.name} src={row.logo} sx={{ width: 48, height: 48, mr: 2 }} />
      
            <ListItemText
              primary={row.name}
              secondary={row.desc}
              primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
              secondaryTypographyProps={{
                mt: 0.5,
                noWrap: true,
                display: 'flex',
                component: 'span',
                alignItems: 'center',
                typography: 'caption',
                color: 'text.disabled',
              }}
            />
      
            <Button
              size="small"
              variant='outlined'
              color='success' 
              sx={{ flexShrink: 0, ml: 1.5 }}
            >
              Activer
            </Button>
          </Card>
        ))}
      </Box>
    </>
  );
}
