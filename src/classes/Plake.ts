import express, { Application, Request, Response } from 'express'
import { Server } from 'http'
import ApiFunction from '../interfaces/ApiFunction'
import ApiGroup from '../interfaces/ApiGroup'

class Plake {
  context?: (req: Request, res: Response) => object
  server: Application

  constructor (context?: (req: Request, res: Response) => object) {
    this.context = context
    this.server = express()
  }

  addGroup (group: ApiGroup, groupName: string) {
    for (const name in group) {
      const fn = group[name]

      this.server.all(`/${groupName}/${name}`, (req, res) =>
        res.send(fn(this.context ? this.context(req, res) : {}))
      )
    }
  }

  addGlobalFunction (fn: ApiFunction, name?: string) {
    const decidedName = name ? name : fn.name

    this.server.all(`/${decidedName}`, (req, res) =>
      res.send(fn(this.context ? this.context(req, res) : {}))
    )
  }

  listen (port: number): Server {
    return this.server.listen(port)
  }
}

export default Plake
