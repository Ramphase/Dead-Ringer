require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /executeTrigger", () => {

  describe("Pass a userId, triggerName, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/executeTrigger").send({ 
        userId: 1,
        triggerName: "TestTrigger",
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


