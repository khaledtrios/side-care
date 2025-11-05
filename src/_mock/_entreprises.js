import { today } from "src/utils/format-time";
import { ENTREPRISE } from "./_employes";
import { _mock } from "./_mock";

export const ENTREPRISE_LIST = [...Array(ENTREPRISE.length)].map((_,index) => ({
    id: _mock.id(index),
    name: ENTREPRISE[index],
    employes: 2,
    admin: 'Wissem Chihaoui',
    siret: '012345',
    cabinet: '',
    logo: 'https://www.sidecare.com/assets/sidecare/logo_mascotte/mascotte_camel-0585321ab976044e65eed7e42cc370e32de2486f63c333660c10512338a2f824.svg',
    createdAt: today(),
}))