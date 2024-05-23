const SERVER = 'http://localhost:3000/'

export default class ItemsRepository {
    constructor() {
    }

    async getAllItems() {
        const response = await fetch(SERVER + 'courses')
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const items = await response.json()
        return items
    }

    async getItemsById(id) {
        const response = await fetch(SERVER + 'courses/' + id)
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const item = await response.json()
        return item
    }

    async addItem(item) {
        const response = await fetch(SERVER + 'courses', {
            method: 'POST',
            body: JSON.stringify({
                id: item.id,
                course: item.course,
                cliteral: item.cliteral,
                vliteral: item.vliteral,
                grade: item.grade,
                idFamily: item.idFamily,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (!response.ok) {
            throw `Error ${response.status} en la API: ${response.statusText}`
        }
        const myData = await response.json()
        return myData
    }

    async changeItem(item) {
        const response = await fetch(SERVER + 'courses/' + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
          })
        
          if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
          }
          const datos = await response.json()
          return datos
    }
}