import { Box, Button, MenuList, MenuItem } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const SORT_OPTIONS = [
  { value: 'nameAsc', label: 'Nom A-Z' },
  { value: 'nameDesc', label: 'Nom Z-A' },
  { value: 'dateAsc', label: 'Date croissante' },
  { value: 'dateDesc', label: 'Date décroissante' },
];

export default function TrombinoscopeSort({ sort, onSort }) {
  const popover = usePopover();

  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold' }}
      >
        Trier :
        <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
          {sortLabel}
        </Box>
      </Button>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === sort}
              onClick={() => {
                popover.onClose();
                onSort(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
