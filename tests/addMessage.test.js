require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /addMessage", () => {

  describe("Pass a userId, messageName, text, and jwtToken", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/addMessage").send({ 
        userId: 1,
        messageName: "Test Message",
        text: "A test message",
        jwtToken: " "
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


