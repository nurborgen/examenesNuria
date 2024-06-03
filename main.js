'use strict'
import Controller from "./src/controller/controller.class"

document.querySelector('#app').innerHTML = `
<div class="container">
<header>
    <h1>Gestión de la tienda</h1>
</header>

<!-- Zona para mostrar mensajes al usuario -->
<div class="row" id="messages"></div>

<div class="row">
    <!-- Tabla de juegos -->
    <div class="col-sm-8">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12" id="juegos">
                <h2>Juegos</h2>
                <table class="table table-striped table-hover">
                    <thead class="thead-dark bg-primary">
                        <tr>
                            <th>Portada</th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Plataforma</th>
                            <th>Fecha préstamo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Aquí insertaremos los juegos-->
                    </tbody>
                </table>
                <p>Total de juegos: <strong id="total">0</strong></p>
            </div>
        </div>
    </div>

    <!-- Formulario -->
    <div class="col-sm-4">
        <form novalidate>
            <fieldset>
                <legend>Añadir juego</legend>
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" id="nombre" required minlength="8" maxlength="30">
                    <span class="errmsg"></span>
                </div>
                <div class="form-group">
                    <label for="descrip">Descripción:</label>
                    <textarea type="text" class="form-control" id="descrip" required></textarea>
                    <span class="errmsg"></span>
                </div>
                <div class="form-group">
                    <label for="plataforma">Plataforma</label>
                    <select id="plataforma" class="form-control" required>
                        <option value="">- Selecciona un plataforma -</option>
                    </select>
                    <span class="errmsg"></span>
                </div>
                <div class="form-group">
                    <label for="fecprest">Fecha préstamo:</label>
                    <input type="date" class="form-control" id="fecprest">
                    <span class="errmsg"></span>
                </div>
                <div class="form-group">
                    <label for="img">Imagen:</label>
                    <input type="text" class="form-control" id="img">
                    <span class="errmsg"></span>
                </div>
                <br>
                <button type="submit" class="btn btn-default btn-primary">Añadir</button>
                <button type="reset" class="btn btn-danger">Reset</button>
            </fieldset>
        </form>
    </div>
</div>
<script src="scripts/main.js"></script>
`

const controller = new Controller
controller.init()