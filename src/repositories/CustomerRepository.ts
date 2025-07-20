import { Service } from 'typedi'
import BaseRepository from './BaseRepository'
import models from '../db/models'

@Service()
export default class CustomerRepository extends BaseRepository {  
    constructor() {
        super(models.Customer)
    }
}