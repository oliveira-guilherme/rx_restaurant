import { Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { MenuController } from '../controllers/MenuController'
import menuValidator from '../validators/menuValidator'

const router = Router()

const menuCtlr = new MenuController()

router.get('/', (req: Request, res: Response) => {
  return menuCtlr.list(req, res)
})

router.get('/:id', menuValidator.menuFindValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return menuCtlr.find(id, res)
})

router.post('/', menuValidator.menuCreateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return menuCtlr.create(req, res)
})

router.put('/:id', menuValidator.menuUpdateValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return menuCtlr.update(req, res)
})

router.delete('/:id', menuValidator.menuDestroyValidator, (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { id } = req.params
  return menuCtlr.destroyById(id, res)
})

export default router