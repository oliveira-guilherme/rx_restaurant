import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { OrderController } from '../controllers/OrderController'
import orderValidator from '../validators/orderValidator'

const router = Router()

const orderCtlr = new OrderController()

router.get('/', (req: Request, res: Response) => {
  return orderCtlr.list(req, res)
})

router.get('/:id', (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return orderCtlr.find(id, res)
})

router.post('/', orderValidator.orderCreateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return orderCtlr.create(req, res)
})

router.patch('/:id', orderValidator.orderUpdateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return orderCtlr.update(req, res)
})


router.patch('/modify/:id', orderValidator.orderModifyValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return orderCtlr.modify(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return orderCtlr.destroyById(id, res)
})

export default router