import { body, param } from 'express-validator'
import CustomerRepository from '../repositories/CustomerRepository'
import MenuRepository from '../repositories/MenuRepository'
import OrderRepository from '../repositories/OrderRepository'

const customerRepository = new CustomerRepository()
const menuRepository = new MenuRepository()
const orderRepository = new OrderRepository()

const validators = {
  orderCreateValidator: [
    body('customerId')
      .notEmpty().withMessage('Id of customer is required')
      .isUUID().withMessage('Id must be a valid UUID')
      .custom(async (value) => {
        if (!value) return false
        const existingCustomer = await customerRepository.findOne({
          where: { id: value } 
        })
        if (!existingCustomer) {
          throw new Error('Customer could not be found')
        }
        return true
      }),
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'preparing', 'ready', 'delivered', 'canceled']).withMessage('Invalid status'),
    body('items')
      .notEmpty().withMessage('Items is required')
      .isArray().withMessage('Items needs to be a list of menu id items')
      .custom(async (value) => {
        if (!value || value?.length === 0) throw new Error(`Items cannot be an empty array`)
        for (const item of value) {
          if (!item?.menu_item_id) {
            throw new Error(`Menu item id is required`)
          }
          if (!item?.menu_item_id) {
            throw new Error(`Menu item id is required`)
          }
          const existingDish = await menuRepository.findOne({
            where: { id: item?.menu_item_id } 
          })
          if (!existingDish) {
            throw new Error(`There is not a dish with id ${item?.menu_item_id} in menu`)
          }
          if (!item?.quantity || isNaN(item?.quantity) || parseInt(item?.quantity) <= 0) {
            throw new Error(`The dish id ${item?.menu_item_id} needs to have a valid quantity`)
          }
        }
        return true
      }),
  ],

  orderUpdateValidator: [
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['pending', 'preparing', 'ready', 'delivered', 'canceled']).withMessage('Invalid status'),
  ],

  orderModifyValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID')
      .custom(async (value) => {
        const order = await orderRepository.findById(value)
        if (['pending', 'preparing'].includes(order?.status)) {
          return true
        }
        throw new Error(`Order could not be modify because the status is ${order?.status}`)
      }),
    body('items')
      .notEmpty().withMessage('Items is required')
      .isArray().withMessage('Items needs to be a list of menu id')
      .custom(async (value) => {
          if (!value || value?.length === 0) throw new Error(`Items cannot be an empty array`)
          for (const item of value) {
            if (!item?.menu_item_id) {
              throw new Error(`Menu item id is required`)
            }
            const existingDish = await menuRepository.findOne({
              where: { id: item?.menu_item_id } 
            })
            if (!existingDish) {
              throw new Error(`There is not a dish with id ${item?.menu_item_id} in menu`)
            }
            if (!item?.quantity || isNaN(item?.quantity) || parseInt(item?.quantity) <= 0) {
              throw new Error(`The dish id ${item?.menu_item_id} needs to have a valid quantity`)
            }
          }
          return true
        }),
  ],
}

export default validators