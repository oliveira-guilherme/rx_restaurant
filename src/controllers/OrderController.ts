import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { Container } from 'typedi'
import sequelize from '../db/sequelize'
import { BaseController } from './BaseController'
import OrderRepository from '../repositories/OrderRepository'
import OrderDishRepository from '../repositories/OrderDishRepository'
import models from '../db/models'

export class OrderController extends BaseController {

    private orderDishRepository: OrderDishRepository

    constructor() {
        super(Container.get(OrderRepository))
        this.orderDishRepository = Container.get(OrderDishRepository)
    }

    async create(req: Request, res: Response) {
        try {
            return sequelize.transaction(async (transaction: any) => {
                const order = await this.repository.create({ ...req.body, id: req?.body?.id ?? uuid() }, { transaction })

                for(let item of req?.body?.items) {
                    await this.orderDishRepository.create({
                        orderId: order.id,
                        dishId: item.menu_item_id,
                        quantity: parseInt(item?.quantity),
                    }, { transaction })
                }
                
                return res.status(201).send({
                    message: 'Created successfully',
                    data: order
                })
            })
        } catch (error) {
            console.error('Error creating:', error)
            return res.status(500).send({
                message: 'Sorry we have a problem. Please try again later.',
            })
        }
    }

    async modify(req: Request, res: Response) {
        try {
            await sequelize.transaction(async (transaction: any) => {
                await this.orderDishRepository.destroy({ where: { orderId: req.params.id }}, { transaction })

                for(let item of req?.body?.items) {
                    await this.orderDishRepository.create({
                        orderId: req.params.id,
                        dishId: item.menu_item_id,
                        quantity: parseInt(item?.quantity),
                    }, { transaction })
                }
            })

            const order = await this.repository.findById(req.params.id, { include: [{ model: models.Menu, as: 'dishes', through: { attributes: ['quantity']} }] })
            
            return res.status(201).send({
                message: 'Order modified successfully',
                data: order
            })
        } catch (error) {
            console.error('Error creating:', error)
            return res.status(500).send({
                message: 'Sorry we have a problem. Please try again later.',
            })
        }
    }
}