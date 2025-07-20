import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { Service } from 'typedi'

@Service()
export class BaseController {
    protected repository: any

    constructor(repository: any) {
      this.repository = repository
    }

    async find(id: string, res: Response) {
      try {
        const object = await this.repository.findById(id)
        return res.status(200).send(object)
      } catch (error) {
        console.error('Error finding:', error)
        return res.status(500).send({
          message: 'Sorry we have a problem. Please try again later.',
        })
      }
    }

    async list(req: Request, res: Response) {
      try {
        const list = await this.repository.list(req.query)
        return res.status(200).send(list)
      } catch (error) {
        console.error('Error listing:', error)
        return res.status(500).send({
          message: 'Sorry we have a problem. Please try again later.',
        })
      }
    }

    async create(req: Request, res: Response) {
        try {
          const object = await this.repository.create({ ...req.body, id: req?.body?.id ?? uuid() })
          return res.status(201).send({
            message: 'Created successfully',
            data: object
          })
        } catch (error) {
          console.error('Error creating:', error)
          return res.status(500).send({
            message: 'Sorry we have a problem. Please try again later.',
          })
        }
    }

    async update(req: Request, res: Response) {
      try {
        const { id } = req.params
        await this.repository.update(id, req.body)
        return res.status(200).send({
          message: 'Updated successfully',
          data: req.body
        })
      } catch (error) {
        console.error('Error updating:', error)
        return res.status(500).send({
          message: 'Sorry we have a problem. Please try again later.',
        })
      }
    }

    async destroyById(id: string, res: Response) {
      try {
        const object = await this.repository.findById(id)
        if (!object) {
          return res.status(200).send({
            message: 'Object not found',
            id
          })
        }
        await this.repository.destroyById(id)
        return res.status(200).send({
          message: 'Deleted successfully',
          id
        })
      } catch (error) {
        console.error('Error deleting:', error)
        return res.status(500).send({
          message: 'Sorry we have a problem. Please try again later.',
        })
      }
    }
}