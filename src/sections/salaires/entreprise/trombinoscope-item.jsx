import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';

import { Image } from 'src/components/image';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function TrombinoscopeItem({ employe }) {
  const popover = usePopover();

  console.log(employe)

  const theme = useTheme()

  const renderImages = (
    <Box gap={0.5} display="flex" sx={{ p: 1 }}>
      <Box flexGrow={1} sx={{ position: 'relative' }}>
        <Image
          alt={employe.name}
          src={employe.picture}
          sx={{ width: 1, height: 164, borderRadius: 1 }}
        />
      </Box>
    </Box>
  );

  const renderTexts = (
    <ListItemText
      sx={{ p: theme.spacing(2.5, 2.5, 2, 2.5) }}
      secondary={employe.name}
      primaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}
      </Card>

      {/* <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              onView();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              onEdit();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover> */}
    </>
  );
}
