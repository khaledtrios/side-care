// Simple mock store for bank accounts with localStorage persistence
// Structure: { id, libelle, rib, iban, bic, document, isPersisted }

const STORAGE_KEY = 'sc_salaries_bank_accounts';

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToStorage(accounts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function listBankAccounts() {
  return readFromStorage();
}

export function getBankAccountById(id) {
  const accounts = readFromStorage();
  return accounts.find((a) => String(a.id) === String(id)) || null;
}

export function createBankAccount(account) {
  const accounts = readFromStorage();
  accounts.push(account);
  writeToStorage(accounts);
  return account;
}

export function updateBankAccount(id, updates) {
  const accounts = readFromStorage();
  const index = accounts.findIndex((a) => String(a.id) === String(id));
  if (index === -1) return null;
  const updated = { ...accounts[index], ...updates };
  accounts[index] = updated;
  writeToStorage(accounts);
  return updated;
}

export function deleteBankAccount(id) {
  const accounts = readFromStorage();
  const index = accounts.findIndex((a) => String(a.id) === String(id));
  if (index === -1) return false;
  const target = accounts[index];
  if (target.isPersisted) {
    return false;
  }
  accounts.splice(index, 1);
  writeToStorage(accounts);
  return true;
}

// Seed with a couple of items if empty, purely for demo
export function seedBankAccounts() {
  const accounts = readFromStorage();
  if (accounts.length > 0) return;
  const seeded = [
    {
      id: '1',
      libelle: 'Compte Société Générale',
      rib: 'FR76 3000 4000 5000 6000 7000 123',
      iban: 'FR76 3000 4000 5000 6000 7000 123',
      bic: 'SOGEFRPP',
      document: null,
      isPersisted: true,
    },
    {
      id: '2',
      libelle: 'Compte BNP Paribas',
      rib: 'FR14 2004 1010 0505 0001 3M02',
      iban: 'FR14 2004 1010 0505 0001 3M02',
      bic: 'BNPAFRPP',
      document: null,
      isPersisted: true,
    },
  ];
  writeToStorage(seeded);
}


