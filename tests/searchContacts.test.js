require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /searchContacts", () => {

  describe("Pass a userId, search, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/searchContacts").send({ 
        userId: 1,
        search: "test",
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


