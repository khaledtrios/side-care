import React, { useCallback } from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, Button, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ComptableContent } from 'src/layouts/comptable';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { toast } from 'sonner';

const dsnFileSchema = zod.object({
  files: zod
    .array(zod.instanceof(File))
    .min(1)
    .refine(
      (files) =>
        files.every((file) => {
          const ext = file.name.split('.').pop();
          return ['txt', 'edi', 'dsn'].includes(ext);
        }),
      {
        message: 'Seules les extensions .txt, .edi et .dsn sont autorisées',
      }
    ),
});

export default function EntreprisesAddDsn() {
  const defaultValues = { files: [] };
  const methods = useForm({ resolver: zodResolver(dsnFileSchema), defaultValues });

  const router = useRouter();

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
      toast.success('Fichiers DSN importés avec succès !');
      router.push(paths.comptable.entreprise.root);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.files && values.files?.filter((file) => file !== inputFile);
      setValue('files', filtered);
    },
    [setValue, values.files]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('files', [], { shouldValidate: true });
  }, [setValue]);

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Importer des DSN"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Les entreprises', href: paths.comptable.entreprise.root },
          { name: 'Importer des DSN' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ p: 3 }}>
        <CardHeader
          title="Importer des DSN"
          subheader="Sélectionnez les fichiers DSN à ajouter au format .txt, .edi ou .dsn"
          sx={{ mb: 3 }}
        />
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ border: '1px dashed grey', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <Field.Upload
              multiple
              name="files"
              title="Glissez-déposez vos fichiers ici ou cliquez pour parcourir"
              accept=".txt, .edi, .dsn"
              maxSize={10485760}
              helperText="Taille maximale du fichier : 10 Mo. Formats acceptés : .txt, .edi, .dsn"
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Importer les fichiers DSN
            </Button>
          </Box>
        </Form>
      </Card>
    </ComptableContent>
  );
}
