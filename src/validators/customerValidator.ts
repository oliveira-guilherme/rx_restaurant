import { body, param } from 'express-validator';
import { Op } from 'sequelize';
import CustomerRepository from '../repositories/CustomerRepository';

const customerRepository = new CustomerRepository()

const validators = {
  customerCreateValidator: [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 255 }).withMessage('Name must be at least 3 characters long'),
    
    body('phone')
      .notEmpty().withMessage('Phone is required')
      .isMobilePhone('any').withMessage('Phone must be a valid mobile number')
      .custom(async (value) => {
        const existingCustomer = await customerRepository.findOne({ where: { phone: value } });
        if (existingCustomer) {
          throw new Error('Phone number must be unique');
        }
        return true;
      }),
    
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email must be a valid email address')
      .custom(async (value) => {
        const existingCustomer = await customerRepository.findOne({ where: { email: value } });
        if (existingCustomer) {
          throw new Error('Email must be unique');
        }
        return true;
      }),
  ],
  customerUpdateValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID'),

    body('name')
      .optional()
      .isLength({ max: 255 }).withMessage('Name must be at least 3 characters long'),
    
    body('phone')
      .optional()
      .isMobilePhone('any').withMessage('Phone must be a valid mobile number')
      .custom(async (value, { req }) => {
        const id = req?.params?.id
        const existingCustomer = await customerRepository.findOne({ where: {
          phone: value,
          id: { [Op.ne]: id },
        } })
        if (existingCustomer) {
          throw new Error('Phone number must be unique');
        }
        return true;
      }),
    
    body('email')
      .optional()
      .isEmail().withMessage('Email must be a valid email address')
      .custom(async (value, { req }) => {
        if (value === undefined) return true
        const id = req?.params?.id
        const existingCustomer = await customerRepository.findOne({ where: {
          email: value,
          id: { [Op.ne]: id },
        } });
        if (existingCustomer) {
          throw new Error('Email must be unique');
        }
        return true;
      }),
  ],
  customerFindValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID'),
  ],
  customerDestroyValidator: [
    param('id')
      .notEmpty().withMessage('ID is required')
      .isUUID().withMessage('ID must be a valid UUID'),
  ]
}

export default validators;