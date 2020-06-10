import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {

  // send some logs somewhere
  console.log('Request logged:', req.method, req.path)
  next()
}

export default loggerMiddleware