export default class View {
    constructor() {
    }

    renderJuego(juego, plataforma) {
        let tbody = document.querySelector('#juegos tbody')
        let tr = document.createElement('tr')
        tr.id = 'juego-' + juego.id
        tr.innerHTML = `
            <td><img src="./src/img/${juego.img}"></td>
            <td>${juego.id}</td>
            <td>${juego.nombre}</td>
            <td>${plataforma.nombre}</td>
            <td>${juego.fecprest}</td>
            <td>
                <button>
                    <i class="bi bi-trash" title="Borrar"></i>
                </button>
                <button>
                    <i class="bi bi-box-arrow-right" title="Prestar"></i>
                </button>
                <button>
                    <i class="bi bi-box-arrow-in-left" title="Devolver"></i>
                </button>
            </td>
        `
        tbody.appendChild(tr)
    }

    renderTotal(total) {
        document.getElementById('total').innerHTML = total
    }

    renderSelect(plataforma) {
        let select = document.querySelector('#plataforma')
        let option = document.createElement('option')
        option.value = plataforma.id
        option.innerHTML = `
            ${plataforma.nombre}
        `
        select.appendChild(option)
    }
}