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
    children,
    employeeCount,
  };
}

// Generate a single enterprise with teams and optional nested subteams
function generateEnterprise() {
  const team1 = createTeam('Équipe A', 1, 2);
  const subTeam = createTeam('Sous-équipe B', 3, 1);
  const team2 = createTeam('Équipe C', 4, 3, [subTeam]);

  const teams = [team1, team2];

  const employeeCount = teams.reduce((sum, c) => sum + (c.employeeCount || 0), 0);

  return {
    name: 'Entreprise XYZ',
    role: 'Entreprise',
    avatarUrl: _mock.image.avatar(100),
    children: teams,
    employeeCount,
  };
}

const enterpriseNode = generateEnterprise();

export const SIMPLE_DATA = {
  name: 'Entreprise XYZ',
  role: 'Entreprise',
  avatarUrl: _mock.image.avatar(999),
  children: [enterpriseNode],
  employeeCount: enterpriseNode.employeeCount,
};