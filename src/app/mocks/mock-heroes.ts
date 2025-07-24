import { Hero } from "../features/heroes/models/hero.model";

export const MOCK_HEROES: Hero[] = [
  {
    id: 1,
    name: 'Superman',
    description: 'An alien from Krypton with super strength, flight, and x-ray vision.',
    image: 'https://placehold.co/300x400?text=Superman',
    power: 'Super strength',
  },
  {
    id: 2,
    name: 'Batman',
    description: 'A wealthy detective and martial artist who uses technology to fight crime in Gotham.',
    image: 'https://placehold.co/300x400?text=Batman',
    power: 'Strategic intellect',
  },
  {
    id: 3,
    name: 'Hulk',
    description: 'A scientist transformed into a giant green rage monster with immense strength.',
    image: 'https://placehold.co/300x400?text=Hulk',
    power: 'Unlimited strength (when angry)',
  }
];
