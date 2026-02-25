import React, { useMemo } from 'react';

import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Tooltip,
  TableRow,
  useTheme,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  useMediaQuery,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

const DAY_NAMES_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const ROW_HEIGHT = 40;
const CELL_MIN_WIDTH = 60;
const NAME_COLUMN_WIDTH = 250;
const FIRST_STICKY_LEFT = 160;
const SECOND_STICKY_LEFT = FIRST_STICKY_LEFT + NAME_COLUMN_WIDTH;

// ─── Mobile card ─────────────────────────────────────────────────────────────

const EmployeeMobileCard = ({ employee, daysArray }) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: employee.avatarColor }}>
          {employee.name[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {employee.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {employee.workedDays} jour(s) travaillé(s)
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ overflowX: 'auto', pb: 0.5 }}>
        <Stack direction="row" spacing={0.5} sx={{ minWidth: 'max-content' }}>
          {daysArray.map((day) => {
            const isHighlighted =
              employee.startDateObj <= day.fullDate && day.fullDate <= employee.endDateObj;

            return (
              <Tooltip key={`${employee.id}-${day.dayNumber}`} title={day.formattedDate}>
                <Box
                  sx={{
                    width: 34,
                    height: 48,
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: isHighlighted
                      ? 'primary.main'
                      : day.isWeekend
                        ? theme.palette.grey[100]
                        : theme.palette.background.default,
                    opacity: isHighlighted ? 0.85 : 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      color: isHighlighted ? 'primary.contrastText' : 'text.secondary',
                      lineHeight: 1,
                      fontSize: 9,
                    }}
                  >
                    {day.dayLabel}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isHighlighted ? 'primary.contrastText' : 'text.primary',
                      lineHeight: 1.4,
                      fontSize: 10,
                    }}
                  >
                    {day.dayNumber}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
    </Card>
  );
};

// ─── Desktop table row ────────────────────────────────────────────────────────

const EmployeeRow = React.memo(({ employee, daysArray, theme }) => (
  <TableRow>
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function PlanMonth({ employees, month, year }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const { groupedByCompany } = useMemo(() => {
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

    return { groupedByCompany: grouped };
  }, [employees]);

  const stickyCellStyles = (left, zIndex, bgcolor) => ({
    position: 'sticky',
    left,
    zIndex,
    bgcolor,
    borderBottom: `1px solid ${theme.palette.divider}`,
  });

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <Stack spacing={3}>
        {Object.entries(groupedByCompany).map(([company, companyEmployees]) => (
          <Box key={company}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              sx={{
                px: 1,
                py: 0.75,
                mb: 1.5,
                bgcolor: theme.palette.grey[100],
                borderRadius: 1,
                borderLeft: `3px solid ${theme.palette.primary.main}`,
              }}
            >
              {company}
            </Typography>

            <Stack spacing={1.5}>
              {companyEmployees.map((employee) => (
                <EmployeeMobileCard key={employee.id} employee={employee} daysArray={daysArray} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  }

  // ── Desktop layout ────────────────────────────────────────────────────────
  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ ...stickyCellStyles(0, 3, theme.palette.background.paper), minWidth: FIRST_STICKY_LEFT }}
            >
              <Typography fontWeight={600}>Société</Typography>
            </TableCell>

            <TableCell
              sx={{ ...stickyCellStyles(FIRST_STICKY_LEFT, 2, theme.palette.background.paper), minWidth: NAME_COLUMN_WIDTH }}
            >
              <Typography fontWeight={600}>Employé</Typography>
            </TableCell>

            <TableCell sx={{ ...stickyCellStyles(SECOND_STICKY_LEFT, 2, theme.palette.background.paper) }}>
              Jour travaillé
            </TableCell>

            {daysArray.map((day) => (
              <TableCell
                key={`header-${day.dayNumber}`}
                align="center"
                sx={{
                  minWidth: CELL_MIN_WIDTH,
                  bgcolor: day.isWeekend ? theme.palette.grey[200] : theme.palette.background.default,
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  py: 0.5,
                }}
              >
                <Typography variant="caption" fontWeight="bold">{day.dayLabel}</Typography>
                <br />
                <Typography variant="caption">{day.dayNumber}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(groupedByCompany).map(([company, companyEmployees]) => (
            <React.Fragment key={company}>
              <TableRow>
                <TableCell
                  sx={{
                    ...stickyCellStyles(0, 3, theme.palette.grey[100]),
                    minWidth: FIRST_STICKY_LEFT,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">{company}</Typography>
                </TableCell>

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

              {companyEmployees.map((employee) => (
                <EmployeeRow key={employee.id} employee={employee} daysArray={daysArray} theme={theme} />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}