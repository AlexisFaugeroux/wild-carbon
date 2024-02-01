import { Categories } from '../../enum/categoriesEnum';
import UnitEnum from '../../enum/unitEnum';

export const itemsFixture = [
  {
    category: Categories.ENERGY,
    label: 'Electricité',
    emissionFactor: 0.5,
    unit: UnitEnum.KW,
  },
  {
    category: Categories.ENERGY,
    label: 'Gaz',
    emissionFactor: 0.9,
    unit: UnitEnum.M3,
  },
  {
    category: Categories.ENERGY,
    label: 'Eau',
    emissionFactor: 0.2,
    unit: UnitEnum.L,
  },
  {
    category: Categories.FOOD,
    label: 'Boeuf',
    emissionFactor: 0.9,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.FOOD,
    label: 'Poisson',
    emissionFactor: 0.4,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.FOOD,
    label: 'Poulet',
    emissionFactor: 0.4,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.FOOD,
    label: 'Légumes',
    emissionFactor: 0.2,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.FOOD,
    label: 'Porc',
    emissionFactor: 0.5,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.HOUSING,
    label: 'Electroménager',
    emissionFactor: 0.3,
    unit: UnitEnum.KW,
  },
  {
    category: Categories.HOUSING,
    label: 'Vêtements',
    emissionFactor: 0.1,
    unit: UnitEnum.KG,
  },
  {
    category: Categories.HOUSING,
    label: 'Electronique',
    emissionFactor: 0.7,
    unit: UnitEnum.KW,
  },
  {
    category: Categories.TRANSPORT,
    label: 'Voiture',
    emissionFactor: 0.7,
    unit: UnitEnum.KM,
  },
  {
    category: Categories.TRANSPORT,
    label: 'Train',
    emissionFactor: 0.6,
    unit: UnitEnum.KM,
  },
  {
    category: Categories.TRANSPORT,
    label: 'Avion',
    emissionFactor: 0.9,
    unit: UnitEnum.KM,
  },
];
