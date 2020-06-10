import express, { Application } from 'express'

class API {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
    this.app = express()
    this.port = appInit.port

    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
  }

  private middlewares(middleWares: { map: (arg0: (middleWare: any) => void) => void; }) {
    this.app.disable('x-powered-by')

    middleWares.map(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: { map: (arg0: (controller: any) => void) => void; }) {
    controllers.map(controller => {
      this.app.use('/couriers', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`API listening on the http://localhost:${this.port}`)
    })
  }
}

export default API