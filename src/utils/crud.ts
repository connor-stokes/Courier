import { Request, Response } from 'express'
import uniqid from 'uniqid'
import { toNumber, isEmpty } from 'lodash'

import { JsonDB } from 'node-json-db'

export const findOne = (db: JsonDB) => async (req: Request, res: Response) => {
  try {
    const { body: { courier } } = req
    const data = await db.getData(`/available/${courier}`)

    res.status(200).json({ data })
  } catch (e) {
    res.status(400)
  }
}

export const createOne = (db: JsonDB) => async (req: Request, res: Response) => {
  try {

    const { body: { courier, max_capacity } } = req
    await db.push(`/available/${courier}`, {
      id: uniqid(),
      max_capacity,
    }, true)

    res.status(200).json({ data: 'Courier created :)' })
  } catch (e) {
    res.status(400)
  }
}

export const updateOne = (db: JsonDB) => async (req: Request, res: Response) => {
  try {

    const { body: { courier, max_capacity } } = req
    const { id } = await db.getData(`/available/${courier}`)
    await db.push(`/available/${courier}`, {
      id,
      max_capacity,
    }, true)

    res.status(200).json({ data: 'Courier capacity updated :)' })
  } catch (e) {
    res.status(400)
  }
}

export const findMany = (db: JsonDB) => async (req: Request, res: Response) => {
  try {
    const { query } = req
    const capacity_required: any = query.capacity_required
    const amount: string = <string>capacity_required

    if (isEmpty(capacity_required))
      res.status(400).json({ data: 'Missing parameters :(' })

    // lookup data
    const data = await db.getData(`/available/`)

    const result = Object
      .keys(data)
      .filter(o => toNumber(data[o].max_capacity) >= toNumber(amount))
      .map(i => ({
        [i]: data[i],
      }))

    res.status(200).json({ data: result })
  } catch (e) {
    res.status(400)
  }
}

export const crudControllers = (db: JsonDB) => ({
  findOne: findOne(db),
  createOne: createOne(db),
  updateOne: updateOne(db),
  findMany: findMany(db),
})