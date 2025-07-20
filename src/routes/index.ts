import { Router } from 'express'
import sequelize from '../db/sequelize'
import customerRoutes from './customer'
import orderRoutes from './order'
import menuRoutes from './menu'

const router = Router()

const welcome = () => {
    return 'Welcome to the RX Restaurant API!'
}

const testConnection = async () => {
    await sequelize.authenticate()
    return 'Data base is connected!'
}

router.get('', (req, res) => res.send(welcome()))
router.get('/test-db-connection', async (req, res) => res.send(await testConnection()))
router.use('/customers', customerRoutes)
router.use('/orders', orderRoutes)
router.use('/menu', menuRoutes)

export default router