// utils/generate-calendar-events.js

import dayjs from 'dayjs';

// Color definitions
const EVENT_COLORS = {
  startDate: '#00A76F',
  startDate_birthday: '#FF5630',
  endDate: '#FFAB00',
  birthDate: '#22C55E',
  trialPeriodEndDate: '#7A0916',
  trialPeriodRenewalEndDate: '#003768',
  employeeInterview: '#8E33FF',
};

export function generateEmployeeEvents(employees = []) {
  const events = [];
  const currentYear = dayjs().year();

  employees.forEach((employee) => {
    const {
      id,
      name,
      startDate,
      endDate,
      birthDate,
      trialPeriodEndDate,
      trialPeriodRenewalEndDate,
      interviews = [],
    } = employee;

    // 👉 Arrival event
    if (startDate) {
      events.push({
        id: `${id}-start`,
        title: `Arrivée de ${name}`,
        start: startDate,
        color: EVENT_COLORS.startDate,
        textColor: EVENT_COLORS.startDate,
        type: 'startDate',
        allDay: true,
        entreprise: employee.entreprise,
      });

      // 👉 Work anniversaries (every year)
      const startYear = dayjs(startDate).year();
      for (let year = startYear + 1; year <= currentYear; year+=1) {
        const anniversary = dayjs(startDate).year(year);
        if (anniversary.isAfter(dayjs())) break;

        events.push({
          id: `${id}-work-anniv-${year}`,
          title: `Anniversaire professionnel de ${name}`,
          start: anniversary.format('YYYY-MM-DD'),
          color: EVENT_COLORS.startDate_birthday,
          textColor: EVENT_COLORS.startDate_birthday,
          type: 'startDate_birthday',
          allDay: true,
          entreprise: employee.entreprise,
        });
      }
    }

    // 👉 Departure
    if (endDate) {
      events.push({
        id: `${id}-end`,
        title: `Départ de ${name}`,
        start: endDate,
        color: EVENT_COLORS.endDate,
        textColor: EVENT_COLORS.endDate,
        type: 'endDate',
        allDay: true,
        entreprise: employee.entreprise,
      });
    }

    // 👉 Birthday
    if (birthDate) {
      const birthday = dayjs(birthDate).year(currentYear);
      events.push({
        id: `${id}-birthday`,
        title: `Anniversaire de ${name}`,
        start: birthday.format('YYYY-MM-DD'),
        color: EVENT_COLORS.birthDate,
        textColor: EVENT_COLORS.birthDate,
        type: 'birthDate',
        allDay: true,
        entreprise: employee.entreprise,
      });
    }

    // 👉 Trial period end
    if (trialPeriodEndDate) {
      events.push({
        id: `${id}-trial-end`,
        title: `Fin de période d'essai de ${name}`,
        start: trialPeriodEndDate,
        color: EVENT_COLORS.trialPeriodEndDate,
        textColor: EVENT_COLORS.trialPeriodEndDate,
        type: 'trialPeriodEndDate',
        allDay: true,
        entreprise: employee.entreprise,
      });
    }

    // 👉 Second trial period end
    if (trialPeriodRenewalEndDate) {
      events.push({
        id: `${id}-trial-renewal`,
        title: `Fin 2ème période d'essai de ${name}`,
        start: trialPeriodRenewalEndDate,
        color: EVENT_COLORS.trialPeriodRenewalEndDate,
        textColor: EVENT_COLORS.trialPeriodRenewalEndDate,
        type: 'trialPeriodRenewalEndDate',
        allDay: true,
        entreprise: employee.entreprise,
      });
    }

    // 👉 Interviews
    interviews.forEach((interview, idx) => {
      events.push({
        id: `${id}-interview-${idx}`,
        title: `Entretien avec ${name}`,
        start: interview,
        color: EVENT_COLORS.employeeInterview,
        textColor: EVENT_COLORS.employeeInterview,
        type: 'employeeInterview',
        allDay: true,
        entreprise: employee.entreprise,
      });
    });
  });

  return events;
}
