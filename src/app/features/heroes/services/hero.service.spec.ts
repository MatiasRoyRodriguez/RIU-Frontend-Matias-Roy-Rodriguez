import { firstValueFrom } from "rxjs";
import { HeroService } from "./hero.service";
import { MOCK_HEROES } from "../../../mocks/mock-heroes";
import { Hero } from "../models/hero.model";

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    service = new HeroService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return all heroes', async () => {
      const result = await firstValueFrom(service.getHeroes());
      expect(result).toEqual(MOCK_HEROES);
      expect(result).not.toBe(service['heroes']);
    });
  });

  describe('getHeroById', () => {
    it('should return the correct hero by ID', async () => {
      const hero = await firstValueFrom(service.getHeroById(1));
      expect(hero).toEqual(MOCK_HEROES[0]);
    });

    it('should return undefined for a non-existent hero ID', async () => {
      const hero = await firstValueFrom(service.getHeroById(777));
      expect(hero).toBeUndefined();
    });
  });


  describe('updateHero', () => {
    it('should update an existing hero', async () => {
      const newName = 'Superman Updated';
      const updatedData = { ...MOCK_HEROES[0], name: newName };

      const updatedHero = await firstValueFrom(service.updateHero(updatedData));
      expect(updatedHero.name).toBe(newName);
    });


    it('should throw an error when trying to update a non-existent hero', async () => {
      const nonExistentHero: Hero = {
        id: 999,
        name: 'NonExistent',
        description: 'This hero does not exist.',
        image: 'https://placehold.co/300x400?text=NonExistent',
        power: 'Unknown power',
      };
      await expect(firstValueFrom(service.updateHero(nonExistentHero)))
        .rejects
        .toThrow('Hero with ID 999 not found');
    });
  });


  describe('deleteHero', () => {

    it('should delete an existing hero', async () => {
      const heroIdToDelete = MOCK_HEROES[0].id;

      const deletedHero = await firstValueFrom(service.deleteHero(heroIdToDelete));
      expect(deletedHero.id).toBe(heroIdToDelete);


      const heroes = await firstValueFrom(service.getHeroes());
      expect(heroes.find(hero => hero.id === heroIdToDelete)).toBeUndefined();
    });

    it('should throw an error when trying to delete a non-existent hero', async () => {
      const nonExistentHeroId = 999;
      await expect(firstValueFrom(service.deleteHero(nonExistentHeroId)))
        .rejects
        .toThrow(`Hero with ID ${nonExistentHeroId} not found`);
    });

  });


  describe('addHero', () => {

    it('should add a new hero', async () => {
      const newHero: Hero = {
        id: 4,
        name: 'Flash',
        description: 'A superhero with super speed and reflexes.',
        image: 'https://placehold.co/300x400?text=Flash',
        power: 'Super speed',
      };

      const addedHero = await firstValueFrom(service.addHero(newHero));
      expect(addedHero).toEqual(newHero);

      const allHeroes = await firstValueFrom(service.getHeroes());
      expect(allHeroes).toContain(newHero);
    });

  });

  describe('searchHero', () => {

    it('should return heroes that match the query (case-insensitive)', async () => {
      const query = 'man';
      const result = await firstValueFrom(service.searchHero(query));
      const expected = MOCK_HEROES.filter(
        hero => hero.name.toLocaleLowerCase().includes(query)
      );
      expect(result).toEqual(expected);
    });

    it('should return an empty array if no hero matches the query', async () => {
      const result = await firstValueFrom(service.searchHero('nothingmatches'));
      expect(result).toEqual([]);
    });

    it('should not mutate the original heroes array', async () => {
      const original = await firstValueFrom(service.getHeroes());
      await firstValueFrom(service.searchHero('man'));
      const afterSearch = await firstValueFrom(service.getHeroes());

      expect(afterSearch).toEqual(original);
      expect(afterSearch).not.toBe(original);
    });

  });

});
