import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const db = new JsonDB(new Config("CouriersTest", true, false, '/'))
import { findOne, createOne, updateOne, findMany } from '../../src/utils/crud'

describe('The crud utils are loaded;', () => {
  it('finds by courier and id', async () => {
    const courier: string = 'test'

    // create a record
    await db.push(`/available/${courier}`, {
      id: 123,
      max_capacity: 45,
    }, true)

    const req: any = {
      body: {
        courier,
      },
    }

    const res: any = {
      status(status: any): any {
        // expect(status).toBe(200)
        return this
      },
      json(result: any): any {
        expect(result).toBe({ id: 123, max_capacity: 45 })
      },
    }

    await findOne(db)(req, res)
  })
  it('creates a courier', async () => {
    const courier: string = 'test'

    const req: any = {
      body: {
        courier,
        max_capacity: 87
      },
    }

    const res: any = {
      status(status: any) {
        // expect(status).toBe(200)
        return this
      },
      json(result: any): any {
        expect(result).toBe({ data: 'Courier created :)' })
        return this
      },
    }

    await createOne(db)(req, res)
  })
  it('updates a couriers capacity', async () => {
    const courier: string = 'test'

    const req: any = {
      body: {
        courier,
        max_capacity: 44
      },
    }

    const res: any = {
      status(status: any) {
        // expect(status).toBe(200)
        return this
      },
      json(result: any): any {
        expect(result).toBe({ data: 'Courier capacity updated :)' })
        return this
      },
    }

    await updateOne(db)(req, res)
  })
  it('finds multiple a couriers by required capacity', async () => {
    const req: any = {
      query: {
        capacity_required: 22,
      },
    }

    const res: any = {
      status(status: any) {
        // expect(status).toBe(200)
        return this
      },
      json(result: any): any {
        expect(result).toBe({ data: { London: { id: 123, max_capacity: 45 }, test: { id: "13r1bym9tkb9ktmem", max_capacity: 44 } } })
        return this
      },
    }

    await findMany(db)(req, res)
  })
})