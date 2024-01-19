import express from 'express'
import { UserController } from '../controllers/users.js'

const router = express.Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
router.post('/create', UserController.createOne)

export default router