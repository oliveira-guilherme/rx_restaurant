import { Service } from 'typedi'

@Service()
export default class BaseRepository {

  protected model: any

  constructor(model: any) {
    this.model = model
  }

  async findById(id: string, query?: any) {
    return await this.model.findOne({ where: { id }, ...query })
  }

  async findOne(query?: any) {
    return await this.model.findOne(query)
  }

  async list(query?: any) {
    const page = query?.page ? query?.page - 1 : 0
    const limit = query?.limit ?? 10
    return {
      data: await this.model.findAll({ ...query, offset: page * limit, limit }),
      page: page + 1,
      limit,
    }
  }

  async create(data: any, options?: any) {
    return await this.model.create(data, options)
  }

  async update(id: string, data: any, options?: any) {
    return await this.model.update(data, { where: { id } }, options)
  }

  async destroyById(id: string, options?: any) {
    return await this.model.destroy({ where: { id } }, options)
  }

  async destroy(query: any, options?: any) {
    return await this.model.destroy(query, options)
  }
}

