import React from 'react';

import {
  Box,
  List,
  Chip,
  Stack,
  Divider,
  Typography,
  ListItemButton,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

export default function CongeList({ list, onSelect, selectedId }) {
  return (
    <List disablePadding>
      {list.map((item, index) => {
        const isSelected = selectedId === item.id;
        const statusColor = item.status === 'justified' ? 'success' : 'error';

        return (
          <React.Fragment key={item.id}>
            <ListItemButton
              onClick={() => onSelect(item)}
              sx={{
                alignItems: 'flex-start',
                backgroundColor: isSelected ? 'action.selected' : 'inherit',
                borderRadius: 1,
                my: 0.5,
                px: 2,
                py: 1.5,
                boxShadow: isSelected ? 2 : 0,
              }}
            >
              <Box flexGrow={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.employe.name}
                  </Typography>
                  <Chip
                    label={item.status === 'justified' ? 'Validée' : 'Refusée'}
                    color={statusColor}
                    size="small"
                    icon={
                      item.status === 'justified' ? (
                        <Iconify icon="material-symbols:check-rounded" />
                      ) : (
                        <Iconify icon="material-symbols:cancel-outline" />
                      )
                    }
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  Du {fDate(item.startDate)} au {   (item.endDate)}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {item.type}
                </Typography>
              </Box>
            </ListItemButton>

            {index < list.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </List>
  );
}
