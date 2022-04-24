require('dotenv').config();
const request = require('supertest');
const app = require('../server');


describe("POST /register", () => {

  describe("Pass a login, password, firstName, lastName, and email", () => {
    
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/register").send({ 
        firstName: "demo",
        lastName: "account",
        email: "test@gmail.com",
        login: "demoacc", 
        password: "123"
      })

      expect(response.statusCode).toBe(200)
    })
  })  

})


