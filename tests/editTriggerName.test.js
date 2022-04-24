require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /editTriggerName", () => {

  describe("Pass a userId, triggerName, newTriggerName, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/editTriggerName").send({ 
        userId: 1,
        triggerName: "TestTrigger",
        newTriggerName: "New Test Trigger",
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


