import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { varAlpha, stylesMode } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function SimpleNode({ name, employeeCount = 0, role, sx, onClick }) {
  return (
    <Box
      gap={0.5}
      display="inline-flex"
      flexDirection="column"
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 1.5,
        cursor: 'pointer',
        color: 'primary.darker',
        bgcolor: (theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        border: (theme) => `1px solid ${varAlpha(theme.vars.palette.primary.mainChannel, 0.24)}`,
        [stylesMode.dark]: { color: 'primary.lighter' },
        ...sx,
      }}
    >
      <Typography variant="subtitle2">{name}</Typography>
      {role !== 'Employé' && (
        <Typography variant="caption" sx={{ opacity: 0.48 }}>
          {employeeCount} employés
        </Typography>
      )}
    </Box>
  );
}

