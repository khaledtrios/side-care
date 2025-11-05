import React from 'react';

import { EmptyContent } from 'src/components/empty-content';

export function WorkOffTab() {
  return (
    <EmptyContent
      title="Aucun résultat pour le moment..."
      description="Aucun arrêt de travail déclaré"
    />
  );
}
