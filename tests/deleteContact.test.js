require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /deleteContact", () => {

  describe("Pass a userId, contactId, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/executeTrigger").send({ 
        userId: 1,
        contactId: 5,
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


