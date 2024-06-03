import JuegosRepository from '../repositories/juegos.repository'
import PlataformasRepository from '../repositories/plataformas.repository'
import View from '../view/view.class'

export default class Controller {
    constructor() {
        this.juegosRepository = new JuegosRepository
        this.plataformasRepository = new PlataformasRepository
        this.view = new View()
    }

    async init() {
        let juegos
        let plataformas
        try {
            juegos = await this.juegosRepository.getAllJuegos()
            plataformas = await this.plataformasRepository.getAllPlataformas()
        } catch (error) {
            alert(error)
        }


        juegos.forEach(async juego => {
            try {
                var plat = await this.plataformasRepository.getPlataformasById(juego.plataforma)
                this.view.renderJuego(juego, plat)
            } catch (error) {
                alert(error)
            }

            if (juego.fecprest) {
                let prest = document.querySelector('#juego-' + juego.id + ' .bi-box-arrow-right').parentElement
                prest.setAttribute('hidden', 'hidden')
            } else {
                let prest = document.querySelector('#juego-' + juego.id + ' .bi-box-arrow-in-left').parentElement
                prest.setAttribute('hidden', 'hidden')
            }

            this.addListeners(juego)
        })

        this.view.renderTotal(juegos.length)

        plataformas.forEach(plataforma => {
            this.view.renderSelect(plataforma)
        })

        document.querySelector('form').addEventListener('submit', async event => {
            event.preventDefault()

            let nombre = document.getElementById('nombre').value
            if(!nombre) {
                document.querySelector('#nombre .errmsg')
            }
            let descrip = document.getElementById('descrip').value
            let plataforma = document.getElementById('plataforma').value
            let fecprest = document.getElementById('fecprest').value
            var fecha = Date.parse(fecprest)
            var today = new Date()
            if(fecha < today) {
                document.querySelector('#fecprest').setCustomValidity('No se puede poner una fecha anterior a hoy.')
            } else {
                document.querySelector('#fecprest').setCustomValidity('')
            }
            let img = document.getElementById('img').value
            let juego = { nombre, descrip, plataforma, fecprest, img }
            if(!document.querySelector('form').checkValidity()) {
                const nombreError = document.querySelector('#nombre + span.errmsg')
                const descripError = document.querySelector('#descrip + span.errmsg')
                const dateError = document.querySelector('#fecprest + span.errmsg')
                const plataformaError = document.querySelector('#plataforma + span.errmsg')
                nombreError.textContent = document.getElementById('nombre').validationMessage
                descripError.textContent = document.getElementById('descrip').validationMessage
                dateError.textContent =  document.getElementById('fecprest').validationMessage
                plataformaError.textContent = document.getElementById('plataforma').validationMessage
            } else {
                try {
                    let nuevoJuego = await this.juegosRepository.addJuego(juego)
                    var plat = await this.plataformasRepository.getPlataformasById(nuevoJuego.plataforma)
                    this.view.renderJuego(nuevoJuego, plat)
                } catch (error) {
                    alert(error)
                }
            }
        })
    }

    addListeners(juego) {
        let botonDel = document.querySelector('#juego-' + juego.id + ' .bi-trash')
        botonDel = botonDel.parentElement
        botonDel.addEventListener('click', async event => {
            event.preventDefault()
            if (confirm('Desea borrar el juego: ' + juego.nombre)) {
                try {
                    await this.juegosRepository.delJuego(juego.id)
                } catch (error) {
                    alert(error)
                }
                let tr = botonDel.parentElement.parentElement
                tr.innerHTML = ''
                this.view.renderTotal(juegos.length - 1)
            }
        })

        let botonRight = document.querySelector('#juego-' + juego.id + ' .bi-box-arrow-right')
        botonRight = botonRight.parentElement
        botonRight.addEventListener('click', async event => {
            event.preventDefault()
            if (confirm('Desea prestar el juego: ' + juego.nombre)) {
                var id = juego.id
                var nombre = juego.nombre
                var descrip = juego.descrip
                var plataforma = juego.plataforma
                let date = new Date()
                let day = date.getDate()
                let month = date.getMonth() +1
                if(month < 10) {
                    month = '0' + month
                }
                if(day < 10) {
                    day = '0' + day
                }
                let year = date.getFullYear()
                var fecprest = year + '-' + month + '-' + day
                var img = juego.img
                let nuevoJuego = {id, nombre, descrip, plataforma, fecprest, img }
                try {
                    let juegoBBDD = await this.juegosRepository.changeJuego(nuevoJuego)
                    var plat = await this.plataformasRepository.getPlataformasById(juegoBBDD.plataforma)
                    let tr = botonDel.parentElement.parentElement
                    tr.innerHTML = ''
                    this.view.renderJuego(juegoBBDD, plat)
                } catch (error) {
                    alert(error)
                }
            }
        })

        let botonLeft = document.querySelector('#juego-' + juego.id + ' .bi-box-arrow-in-left')
        botonLeft = botonLeft.parentElement
        botonLeft.addEventListener('click', async event => {
            event.preventDefault()
            if (confirm('Desea devolver el juego: ' + juego.nombre)) {
                var id = juego.id
                var nombre = juego.nombre
                var descrip = juego.descrip
                var plataforma = juego.plataforma
                var fecprest = ''
                var img = juego.img
                let nuevoJuego = {id, nombre, descrip, plataforma, fecprest, img }
                try {
                    let juegoBBDD = await this.juegosRepository.changeJuego(nuevoJuego)
                    var plat = await this.plataformasRepository.getPlataformasById(juegoBBDD.plataforma)
                    let tr = botonDel.parentElement.parentElement
                    tr.innerHTML = ''
                    this.view.renderJuego(juegoBBDD, plat)
                } catch (error) {
                    alert(error)
                }
            }
        })
    }
}