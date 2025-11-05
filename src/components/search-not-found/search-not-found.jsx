import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function SearchNotFound({ query, sx, ...other }) {
  if (!query) {
    return (
      <Typography variant="body2" sx={sx}>
        Veuillez saisir des mots-clés
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
      <Box sx={{ mb: 1, typography: 'h6' }}>Non trouvé</Box>

      <Typography variant="body2">
      Aucun résultat trouvé pour &nbsp;
        <strong>{`"${query}"`}</strong>
        .
        <br /> Essayez de vérifier les fautes de frappe ou d&apos;utiliser des mots complets.
      </Typography>
    </Box>
  );
}
