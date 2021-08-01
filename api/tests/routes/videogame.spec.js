/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = { name: 'Super Mario Bros 2', description: 'a nice description', platforms: ['Wii'], released: "2018-01-12T00:00:00.000Z", rating: 3.5};
let dbId;
const apiId = '4200'

describe('Videogames routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(async() => {
      const created = await Videogame.create(videogame);
      dbId = created.dataValues.id;
    }));
  describe('GET /videogames', () => {
    it('should get statusCode = 200 and 101 videogames (100 from api + 1 from db)', async() =>{
     const response = await agent.get('/videogames').expect(200);
     expect(response.body).to.have.lengthOf(101);
    }
    ).timeout(47000);
    it('success from api by id',  async() =>{
      const response =  await agent.get('/videogame/api|'+apiId).expect(200);
      const game = response.body;
      expect(game.id).to.be.equals('api|'+apiId);
      expect(game.name).to.be.equals('Portal 2');
      expect(game.released).to.be.equals('2011-04-18');
      expect(game.rating).to.be.equals(4.62);

     }
     ).timeout(47000);
     it('success from db by id', async() =>{
       const response2 = await agent.get(`/videogame/db|${dbId}`).expect(200);
       const gameDb = response2.body;
       expect(gameDb.id).to.be.equals(`db|${dbId}`);
       expect(gameDb.name).to.be.equals('Super Mario Bros 2');
       expect(gameDb.description).to.be.equals('a nice description');
       expect(gameDb.released).to.be.equals('2018-01-11');
       expect(gameDb.rating).to.be.equals(3.5);
      }
      ).timeout(47000);

    it('should return statusCode = 404 if can\'t find game api by id', async() =>{
      const response = await agent.get('/videogame/api|notfound').expect(404);
      expect(response.body.message).equals('game not found');
     }
     ).timeout(47000);

     it('should return statusCode = 400 an invalid uuid is passed in db id', async() =>{
      const response = await agent.get('/videogame/db|noexists').expect(400);
      expect(response.body.message).equals('id must be an uuid');
     }
     ).timeout(47000);
  });

});
