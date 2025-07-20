import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { CustomerController } from '../controllers/CustomerController'
import { OrderController } from '../controllers/OrderController'
import customerValidator from '../validators/customerValidator'

const router = Router()

const customerCtlr = new CustomerController()

router.get('/', (req: Request, res: Response) => {
  return customerCtlr.list(req, res)
})

router.get('/:id', customerValidator.customerFindValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return customerCtlr.find(id, res)
})

router.get('/orders/:customerId', (req: Request, res: Response) => {
  return customerCtlr.getOrders(req, res)
})

router.post('/', customerValidator.customerCreateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return customerCtlr.create(req, res)
})

router.put('/:id', customerValidator.customerUpdateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return customerCtlr.update(req, res)
})

router.delete('/:id', customerValidator.customerDestroyValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return customerCtlr.destroyById(id, res)
})

export default router