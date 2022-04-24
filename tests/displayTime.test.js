require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /displayTime", () => {

  describe("Pass userId, triggerName, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/displayTime").send({ 
        userId: 1,
        triggerName: "Test Trigger",
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


