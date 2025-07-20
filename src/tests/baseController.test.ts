import { Request, Response } from 'express'
import { BaseController } from '../controllers/BaseController'

const mockRepository = {
  findById: jest.fn(),
  list: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroyById: jest.fn(),
}

const mockRequest = (params: any = {}, body: any = {}) => {
  const req: Partial<Request> = {};
  req.params = params;
  req.body = body;
  return req as Request;
}

const mockResponse = (send?: any, status?: any) => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(status ?? res)
  res.send = jest.fn().mockReturnValue(send ?? res)
  return res as Response
}

describe('BaseController', () => {
  let controller: BaseController

  beforeEach(() => {
    controller = new BaseController(mockRepository)
    jest.clearAllMocks()
  })

  it('should find an object by ID', async () => {
    const req = { params: { id: '123' } }
    const res = mockResponse()
    mockRepository.findById.mockResolvedValue({ id: '123', name: 'Test Object' })

    await controller.find(req.params.id, res)

    expect(mockRepository.findById).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({ id: '123', name: 'Test Object' })
  })

  it('should return 500 if find fails', async () => {
    const req = { params: { id: '123' } }
    const res = mockResponse()
    mockRepository.findById.mockRejectedValue(new Error('Database error'))

    await controller.find(req.params.id, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Sorry we have a problem. Please try again later.',
    })
  })

  it('should list objects', async () => {
    const req = mockRequest({}, {})
    const res = mockResponse()
    mockRepository.list.mockResolvedValue([{ id: '123', name: 'Test Object' }])

    await controller.list(req, res)

    expect(mockRepository.list).toHaveBeenCalledWith({})
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith([{ id: '123', name: 'Test Object' }])
  })

  it('should create an object', async () => {
    const object = { id: '123', name: 'New Object' }
    const req = mockRequest({ body: { name: 'New Object' } })
    const res = mockResponse()
    mockRepository.create.mockResolvedValue(object)

    await controller.create(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Created successfully',
      data: object
    })
  })

  it('should update an object', async () => {
    const object = { id: '123', name: 'Updated Object' }
    const req = mockRequest({ params: { id: '123' }, body: { name: 'Updated Object' } })
    const res = mockResponse()
    mockRepository.update.mockResolvedValue(object)

    await controller.update(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Updated successfully',
      data: object,
    })
  })

  it('should delete an object by id', async () => {
    const id = '123'
    const res = mockResponse()
    mockRepository.findById.mockResolvedValue({ id, name: 'Test Object' })
    mockRepository.destroyById.mockResolvedValue(1)

    await controller.destroyById(id, res)

    expect(mockRepository.findById).toHaveBeenCalledWith(id)
    expect(mockRepository.destroyById).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Deleted successfully',
      id,
    })
  })

  it('should return 200 if object to delete is not found', async () => {
    const id = '123'
    const res = mockResponse()
    mockRepository.findById.mockResolvedValue(null)

    await controller.destroyById(id, res)

    expect(mockRepository.findById).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Object not found',
      id,
    })
  })
})