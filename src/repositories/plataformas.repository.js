const SERVER = 'http://localhost:3000/'

export default class PlataformasRepository {
    constructor() {
    }

    async getAllPlataformas() {
        const response = await fetch(SERVER + 'plataformas')
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const plataformas = await response.json()
        return plataformas
    }

    async getPlataformasById(id) {
        const response = await fetch(SERVER + 'plataformas/' + id)
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const plataforma = await response.json()
        return plataforma
    }

    async addPlataforma(plataforma) {
        const response = await fetch(SERVER + 'plataformas', {
            method: 'POST',
            body: JSON.stringify({
                id: plataforma.id,
                nombre: plataforma.nombre,
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

    async changePlataforma(plataforma) {
        const response = await fetch(SERVER + 'plataformas/' + plataforma.id, {
            method: 'PUT',
            body: JSON.stringify(plataforma),
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