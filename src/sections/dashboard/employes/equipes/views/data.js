import { _mock } from 'src/_mock';

function createEmployee(id) {
  return {
    id: _mock.id(id),
    name: `Employé ${id}`,
    avatarUrl: _mock.image.avatar(id),
    role: 'Employé',
    employeeCount: 1,
  };
}

function createTeam(name, idStart, numEmployees = 2, subTeams = []) {
  const employees = Array.from({ length: numEmployees }, (_, i) =>
    createEmployee(idStart + i)
  );

  const children = [...employees, ...subTeams];

  const employeeCount = children.reduce((sum, c) => sum + (c.employeeCount || 0), 0);

  return {
    name,
    role: 'Équipe',
    avatarUrl: _mock.image.avatar(idStart),
    children, // now always has at least employees
    employeeCount,
  };
}

// Generate N entreprises with some teams and optional nested subteams
function generateEntreprises(count = 10) {
  const entreprises = [];

  for (let i = 0; i < count; i += 1) {
    const team1 = createTeam(`Équipe A${i + 1}`, 10 * i + 1, 2);
    const subTeam = createTeam(`Sous-équipe B${i + 1}`, 10 * i + 2, 1);
    const team2 = createTeam(`Équipe C${i + 1}`, 10 * i + 3, 3, [subTeam]);

    const teams = [team1, team2];

    const employeeCount = teams.reduce((sum, c) => sum + (c.employeeCount || 0), 0);

    entreprises.push({
      name: `Entreprise ${String.fromCharCode(65 + i)}`, // Entreprise A, B, C...
      role: 'Entreprise',
      avatarUrl: _mock.image.avatar(100 + i),
      ...(teams.length > 0 && { children: teams }),
      employeeCount,
    });
  }

  return entreprises;
}

const entrepriseNodes = generateEntreprises(10);

const totalEmployees = entrepriseNodes.reduce((sum, e) => sum + e.employeeCount, 0);

export const SIMPLE_DATA = {
  name: 'Toutes les entreprises',
  role: 'Vue globale',
  avatarUrl: _mock.image.avatar(999),
  ...(entrepriseNodes.length > 0 && { children: entrepriseNodes }),
  employeeCount: totalEmployees,
};
