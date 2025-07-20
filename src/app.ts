import express from 'express'
import dotenv from 'dotenv'
import 'reflect-metadata'
import routes from './routes'

dotenv.config()
const app = express()

app.use(express.json())

app.use(routes)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})