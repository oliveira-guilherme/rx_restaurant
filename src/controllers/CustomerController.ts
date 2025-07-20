import { Request, Response } from 'express'
import { BaseController } from './BaseController'
import CustomerRepository from '../repositories/CustomerRepository'
import OrderRepository from '../repositories/OrderRepository'
import { Container } from 'typedi'

export class CustomerController extends BaseController {

    protected orderRepository: OrderRepository
    
    constructor() {
        super(Container.get(CustomerRepository))
        this.orderRepository = Container.get(OrderRepository)
    }

    getTotalFromOrder(dishes: any) {
        const total = dishes.reduce((sum: number, dish: any) => {
            const price = parseFloat(dish.price)
            const quantity = dish?.dataValues?.orders_dishes?.dataValues?.quantity

            return sum + (price * quantity)
        }, 0)
        return total.toFixed(2)
    }

    async getOrders(req: Request, res: Response) {
        try {
            const customer = await this.repository.findById(req?.params?.customerId) 
            const orders = await this.orderRepository.listWithDishes({...req?.query, where: { customerId: req?.params?.customerId } })
            const response = orders?.data?.map((order: any) => ({
                ...order?.dataValues,
                total: this.getTotalFromOrder(order?.dishes)
            }))
            return res.status(200).send({
                data: {
                    customer: customer?.dataValues,
                    orders: {...response, page: orders?.page, limit: orders?.limit}
                }
            })
        } catch (error) {
            console.error('Error listing:', error)
            return res.status(500).send({
                message: 'Sorry we have a problem. Please try again later.',
            })
        }
    }
}