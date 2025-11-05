import React, { useState } from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  Typography,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import DemarcheFormModal from './demarche-form-modal';

export default function DemarcheTaskList({
  tasks = [],
  onTaskComplete,
  employeId
}) {
    const showModal = useBoolean();
    const [taskSelected, setTaskSelected] = useState({})

    const onTaskSelect = (x) => {
        setTaskSelected(x)
        showModal.onTrue()
    }

    const onAddTask = () => {
        setTaskSelected({});
        showModal.onTrue()
        console.log(showModal.value)
    }

  const grouped = tasks.reduce((acc, task) => {
    const date = new Date(task.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  const groupedEntries = Object.entries(grouped).sort(
    ([a], [b]) => new Date(a) - new Date(b)
  );

  return (
    <>
    <Box sx={{ p: 2 }}>
      {/* Header with "Ajouter une tâche" button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Liste des tâches</Typography>
        <Button variant="contained" size="small" onClick={()=>onAddTask()}>
          Ajouter une tâche
        </Button>
      </Box>

      {groupedEntries.map(([date, dateTasks], idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            {date}
          </Typography>

          <Stack spacing={2}>
            {dateTasks.map((task, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 'sm',
                  backgroundColor: task.completed ? '#f0fdf4' : 'background.paper',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: 'primary.main',
                      }}
                      onClick={() => onTaskSelect(task)}
                    >
                      {task.title}
                    </Typography>
                  </Box>

                  {task.completed ? (
                    <Typography variant="body2" color="success.main">
                      ✔ Fait
                    </Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onTaskComplete(index)}
                    >
                      Marquer comme fait
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>

          {idx < groupedEntries.length - 1 && <Divider sx={{ mt: 3 }} />}
        </Box>
      ))}
    </Box>
    <DemarcheFormModal open={showModal.value} onClose={showModal.onFalse} employeeId={employeId} currentTask={taskSelected}/>
    </>
  );
}
