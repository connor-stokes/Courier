import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import API from './server'
import loggerMiddleware from './middleware/logger'

import CourierController from './controllers/couriers.controller'

const app = new API({
  port: 3000,
  controllers: [
    new CourierController(),
  ],
  middleWares: [
    morgan('dev'),
    cors(),
    json(),
    urlencoded({ extended: true }),
    helmet(),
    loggerMiddleware
  ]
})

app.listen()