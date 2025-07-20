import { body, param } from 'express-validator'
import { Op } from 'sequelize'
import MenuRepository from '../repositories/MenuRepository'

const menuRepository = new MenuRepository()

const validators = {
  menuCreateValidator: [
    body('name')
      .notEmpty().withMessage('Name is required')
      .custom(async (value) => {
        const existingDish = await menuRepository.findOne({ where: { name: value } })
        if (existingDish) {
          throw new Error('Name must be unique')
        }
        return true
      }),
    body('category')
      .notEmpty().withMessage('Category is required')
      .isIn(['starter', 'main_course', 'dessert', 'drink']).withMessage('Invalid category'),

    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ gt: -1 }).withMessage('Price must be a positive number'),

    body('description')
      .notEmpty().withMessage('Description is required')
      .isString().withMessage('Description must be a string'),
  ],

  menuUpdateValidator: [
    body('name')
      .optional()
      .custom(async (value, { req }) => {
        const id = req?.params?.id
        const existingDish = await menuRepository.findOne({
          where: { name: value, id: { [Op.ne]: id } } 
        })
        if (existingDish) {
          throw new Error('Name must be unique')
        }
        return true
      }),
    body('category')
      .optional()
      .isIn(['starter', 'main_course', 'dessert', 'drink']).withMessage('Invalid category'),

    body('price')
      .optional()
      .isFloat({ gt: -1 }).withMessage('Price must be a positive number'),

    body('description')
      .optional()
      .isString().withMessage('Description must be a string'),
  ],
  menuFindValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID'),
  ],
  menuDestroyValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID'),
  ]
}

export default validators