// import { Request, Response } from 'express'
import CourierController from '../../src/controllers/couriers.controller'

describe('The CourierController;', () => {
  const result = new CourierController()
  it('It can be called;', () => {
    expect(result).toBeTruthy()
  })
})