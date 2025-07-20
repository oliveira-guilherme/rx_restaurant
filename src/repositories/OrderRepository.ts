import { Service } from 'typedi'
import BaseRepository from './BaseRepository'
import models from '../db/models'

@Service()
export default class OrderRepository extends BaseRepository {  
    constructor() {
        super(models.Order)
    }

    async listWithDishes(query: any) {
        return await super.list({ ...query, include: [{ model: models.Menu, as: 'dishes', through: { attributes: ['orderId', 'dishId', 'quantity']} }] })
    }
}