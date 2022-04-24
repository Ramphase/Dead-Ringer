require('dotenv').config();
const request = require('supertest');
const app = require('../server');

describe("POST /login", () => {

  describe("pass a login and password", () => {
    
    test("respond with a 200 status code", async () => {
      const response = await request(app).post("/login").send({ 
        login: "gavbarb", 
        password: "pass" 
      })
      expect(response.statusCode).toBe(200)
    })
  })  
  
})


