const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    it('should throw an error if name is null', (done) => {
        Videogame.create({description: 'a nice description', platforms: ['Wii']})
          .then(() => done(new Error('name is required')))
          .catch(() => done());
    });

    it('should throw an error if description is null', (done) => {
        Videogame.create({ name: 'Super Mario Bros', platforms: ['Wii']})
          .then(() => done(new Error('description is required')))
          .catch(() => done());
    });

    it('should throw an error if platforms is an empty array', (done) => {
      Videogame.create({ name: 'Super Mario Bros', description: 'a nice description'})
        .then(() => done(new Error('platforms is required')))
        .catch(() => done());
    });

    it('should throw an error if platforms contains an invalid platform', (done) => {
      Videogame.create({ name: 'Super Mario Bros', description: 'a nice description', platforms: ['Error']})
        .then(() => done(new Error('It requires valid platforms')))
        .catch(() => done());
    });


  });
  describe('Success', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    it('should work when its a valid game just with required fields', () => {
      Videogame.create({ name: 'Super Mario Bros', description: 'a nice description', platforms: ['Wii']})
      .then(videogame => {
        expect(videogame.name).to.equal('Super Mario Bros'); 
        expect(videogame.description).to.equal('a nice description');
        expect(videogame.platforms).to.equal(['Wii']);  
        done();
      })
    });

    it('should work when its a valid game with all fields', () => {
      Videogame.create({ name: 'Prince of Percia', description: 'wow', platforms: ["Game Boy", "SNES", "NES", "Apple", "Commodore"], released: "2018-01-12T00:00:00.000Z", rating: 3})
      .then(videogame => {
        expect(videogame.name).to.equal('Prince of Percia'); 
        expect(videogame.description).to.equal('wow');
        expect(videogame.platforms).to.equal(["Game Boy", "SNES", "NES", "Apple", "Commodore"]);  
        expect(videogame.released).to.equal('2018-01-12T00:00:00.000Z');
        expect(videogame.rating).to.equal(3);   
        done();
      })
    });
  })
});
