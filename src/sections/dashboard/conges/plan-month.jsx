import React, { useMemo } from 'react';
import { useTheme } from '@emotion/react';

import {
  Table,
  Stack,
  Avatar,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

const DAY_NAMES_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const ROW_HEIGHT = 40;
const CELL_MIN_WIDTH = 60;
const NAME_COLUMN_WIDTH = 250;
const FIRST_STICKY_LEFT = 160;
const SECOND_STICKY_LEFT = FIRST_STICKY_LEFT + NAME_COLUMN_WIDTH;

const EmployeeRow = React.memo(({ employee, daysArray, theme }) => (
  <TableRow>
    {/* Empty company cell (alignment) */}
    <TableCell
      sx={{
        position: 'sticky',
        left: 0,
        zIndex: 1,
        bgcolor: theme.palette.background.default,
        minWidth: FIRST_STICKY_LEFT,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    />

    {/* Employee name */}
    <TableCell
      sx={{
        position: 'sticky',
        left: FIRST_STICKY_LEFT,
        zIndex: 2,
        bgcolor: theme.palette.background.default,
        minWidth: NAME_COLUMN_WIDTH,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ width: 28, height: 28, bgcolor: employee.avatarColor }}>
          {employee.name[0]}
        </Avatar>
        <Typography variant="body2">{employee.name}</Typography>
      </Stack>
    </TableCell>

    {/* Worked days */}
    <TableCell
      sx={{
        position: 'sticky',
        left: SECOND_STICKY_LEFT,
        zIndex: 1,
        bgcolor: theme.palette.background.default,
        minWidth: 120,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2">{employee.workedDays}</Typography>
    </TableCell>

    {/* Day cells */}
    {daysArray.map((day) => {
      const isHighlighted =
        employee.startDateObj <= day.fullDate && day.fullDate <= employee.endDateObj;

      return (
        <Tooltip key={`${employee.id}-${day.dayNumber}`} title={day.formattedDate}>
          <TableCell
            align="center"
            sx={{
              minWidth: CELL_MIN_WIDTH,
              height: ROW_HEIGHT,
              bgcolor: isHighlighted
                ? 'primary.main'
                : day.isWeekend
                  ? theme.palette.grey[100]
                  : 'transparent',
              opacity: isHighlighted ? 0.8 : 1,
              borderLeft: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          />
        </Tooltip>
      );
    })}
  </TableRow>
));

export default function PlanMonth({ employees, month, year  }) {
  const theme = useTheme();
  // const month = 5; // June (0-based)
  // const year = 2025;

  // Precompute days data
  const daysArray = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const dayOfWeek = date.getDay();
      return {
        dayNumber: i + 1,
        dayLabel: DAY_NAMES_SHORT[dayOfWeek],
        fullDate: date,
        formattedDate: fDate(date),
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      };
    });
  }, [month, year]);

  // Preprocess employees data
  const { groupedByCompany, processedEmployees } = useMemo(() => {
    const processed = employees.map((emp) => ({
      ...emp,
      startDateObj: new Date(emp.startDate),
      endDateObj: new Date(emp.endDate),
    }));

    const grouped = processed.reduce((acc, emp) => {
      acc[emp.societe] = acc[emp.societe] || [];
      acc[emp.societe].push(emp);
      return acc;
    }, {});

    return { groupedByCompany: grouped, processedEmployees: processed };
  }, [employees]);

  // Shared sticky cell styles
  const stickyCellStyles = (left, zIndex, bgcolor) => ({
    position: 'sticky',
    left,
    zIndex,
    bgcolor,
    borderBottom: `1px solid ${theme.palette.divider}`,
  });

  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Company */}
            <TableCell
              sx={{
                ...stickyCellStyles(0, 3, theme.palette.background.paper),
                minWidth: FIRST_STICKY_LEFT,
              }}
            >
              <Typography fontWeight={600}>Société</Typography>
            </TableCell>

            {/* Employee */}
            <TableCell
              sx={{
                ...stickyCellStyles(FIRST_STICKY_LEFT, 2, theme.palette.background.paper),
                minWidth: NAME_COLUMN_WIDTH,
              }}
            >
              <Typography fontWeight={600}>Employé</Typography>
            </TableCell>

            {/* Worked Days */}
            <TableCell
              sx={{
                ...stickyCellStyles(SECOND_STICKY_LEFT, 2, theme.palette.background.paper),
              }}
            >
              Jour travaillé
            </TableCell>

            {/* Day headers */}
            {daysArray.map((day) => (
              <TableCell
                key={`header-${day.dayNumber}`}
                align="center"
                sx={{
                  minWidth: CELL_MIN_WIDTH,
                  bgcolor: day.isWeekend
                    ? theme.palette.grey[200]
                    : theme.palette.background.default,
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  py: 0.5,
                }}
              >
                <Typography variant="caption" fontWeight="bold">
                  {day.dayLabel}
                </Typography>
                <br />
                <Typography variant="caption">{day.dayNumber}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(groupedByCompany).map(([company, companyEmployees]) => (
            <React.Fragment key={company}>
              {/* Company Header Row */}
              <TableRow>
                <TableCell
                  sx={{
                    ...stickyCellStyles(0, 3, theme.palette.grey[100]),
                    minWidth: FIRST_STICKY_LEFT,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {company}
                  </Typography>
                </TableCell>

                {/* Empty cells for alignment */}
                <TableCell
                  sx={{
                    ...stickyCellStyles(FIRST_STICKY_LEFT, 2, theme.palette.grey[100]),
                    minWidth: NAME_COLUMN_WIDTH,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                />
                <TableCell
                  sx={{
                    ...stickyCellStyles(SECOND_STICKY_LEFT, 1, theme.palette.grey[100]),
                    minWidth: 120,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                />

                {/* Blank day cells */}
                {daysArray.map((_, idx) => (
                  <TableCell
                    key={`empty-${company}-${idx}`}
                    sx={{
                      minWidth: CELL_MIN_WIDTH,
                      bgcolor: theme.palette.grey[100],
                      borderBottom: `2px solid ${theme.palette.divider}`,
                    }}
                  />
                ))}
              </TableRow>

              {/* Employee rows */}
              {companyEmployees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  daysArray={daysArray}
                  theme={theme}
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
