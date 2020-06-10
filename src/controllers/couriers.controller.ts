import express from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'

import { db } from '../utils/db'
import { crudControllers } from '../utils/crud'

class CourierController implements IControllerBase {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/find', crudControllers(db).findOne)
    this.router.post('/create', crudControllers(db).createOne)
    this.router.post('/update', crudControllers(db).updateOne)
    this.router.get('/lookup', crudControllers(db).findMany)
  }
}

export default CourierController