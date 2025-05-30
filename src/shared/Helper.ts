import * as supertest from 'supertest'
import * as dotenv from 'dotenv';
dotenv.config();
const request = supertest(`${process.env.apiBaseURL}`);


class Helper{
  constructor(){};

  async postRequest<T>(baseURL: string, body: Object):Promise<T> {
    const response = await request
      .post(baseURL)
      .set('Authorization', `Basic ${process.env.API_AUTH_KEY}`)
      .send(body)
      .expect(200)
      return response.body as T
  };

  async patchRequest<T>(baseURL:string, body:Object):Promise<T>{
    const response = await request
    .patch(baseURL)
    .set('Authorization', `Basic ${process.env.API_AUTH_KEY}`)
    .set('Content-Type', 'application/json')
    .send(body)
    .expect(202)
    return response.body as T
  }

  async getRequest<T>(baseURL: string):Promise<T>{
    const response = await request
      .get(baseURL)
      .set('Authorization', `Basic ${process.env.API_AUTH_KEY}`)
      .expect(200);
    return response.body as T
  }

}

export default Helper;