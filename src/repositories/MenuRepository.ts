import { Service } from 'typedi'
import BaseRepository from './BaseRepository'
import models from '../db/models'

@Service()
export default class MenuRepository extends BaseRepository {  
    constructor() {
        super(models.Menu)
    }

    async list(query: any) {
        if (query?.category) {
            query.where = {
                category: query.category
            }
        }
        return await super.list(query)
    }
}