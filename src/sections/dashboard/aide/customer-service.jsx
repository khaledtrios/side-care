import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';

import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function CustomerService({ price, title, imgUrl, description, sx, ...other }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark}`,
        }),
        p: 5,
        borderRadius: 2,
        position: 'relative',
        color: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="invite"
        src={imgUrl}
        sx={{
          top: 16,
          right: 16,
          zIndex: 9,
          width: 100,
          height: 100,
          position: 'absolute',
          ...sx,
        }}
      />

      <Box sx={{ whiteSpace: 'pre-line', typography: 'h3' }}>{title}</Box>

      <Box sx={{ mt: 8, mb: 3, typography: 'body2' }}>{description}</Box>

      <Button variant='contained'>Contact un expert</Button>
    </Box>
  );
}
