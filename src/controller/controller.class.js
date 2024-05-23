import ItemsRepository from '../repositories/items.repository'
import View from '../view/view.class'

export default class Controller {
    constructor() {
        this.itemsRepository = new ItemsRepository()
        this.view = new View()
        this.item = []
    }

    async init() {

    }
}