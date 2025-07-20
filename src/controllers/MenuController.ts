import { BaseController } from './BaseController'
import MenuRepository from '../repositories/MenuRepository'
import { Container } from 'typedi'

export class MenuController extends BaseController {

    constructor() {
        super(Container.get(MenuRepository))
    }
}