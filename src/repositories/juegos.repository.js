const SERVER = 'http://localhost:3000/'

export default class JuegosRepository {
    constructor() {
    }

    async getAllJuegos() {
        const response = await fetch(SERVER + 'juegos')
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const juegos = await response.json()
        return juegos
    }

    async getJuegosById(id) {
        const response = await fetch(SERVER + 'juegos/' + id)
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
        const juego = await response.json()
        return juego
    }

    async addJuego(juego) {
        const response = await fetch(SERVER + 'juegos', {
            method: 'POST',
            body: JSON.stringify({
                id: juego.id,
                nombre: juego.nombre,
                plataforma: juego.plataforma,
                descrip: juego.descrip,
                fecprest: juego.fecprest,
                img: juego.img,
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

    async changeJuego(juego) {
        const response = await fetch(SERVER + 'juegos/' + juego.id, {
            method: 'PUT',
            body: JSON.stringify(juego),
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

    async delJuego(id) {
        const response = await fetch(SERVER + 'juegos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if(!response.ok) {
            throw 'Error ' + response.status + ' de la BBDD: ' + response.statusText
        }
    }
}