/**
 * Con los valores ingresados (peso, altura) los verifica, calcula IMC y por ultima muestra recomendacion
 * @method calcularIMC
 */
const calcularIMC = () => {
    const peso = parseFloat(document.getElementById('Peso').value);
    const altura = parseFloat(document.getElementById('Altura').value) / 100;

    let pesoValido =true;
    let alturaValida = true;

    // errores a datos invalidos
    if (isNaN(peso) || peso <= 0 || peso > 500) {
        document.getElementById('Peso').value = '';
        pesoValido = false;
    }
    if (isNaN(altura) || altura <= 1 || altura > 2.2) {
        document.getElementById('Altura').value = '';
        alturaValida = false;
    }
    if (!pesoValido && !alturaValida){
        alert('Por favor, ingrese un peso y una altura válidos.');
        return;
    }else if (!pesoValido){
        alert('Por favor, ingrese un peso válido.');
        return;
    }else if (!alturaValida){
        alert('Por favor, ingrese una altura válida.');
        return;
    }

    // Determinar la situación del IMC
    const imc = peso / (altura * altura);
    let situacion;
    let recomendaciones;
    if (imc < 18.5) {
        situacion = 'Bajo peso';
        recomendaciones = [
            'Es importante que consultes a un nutricionista para diseñar un plan alimenticio adecuado para ti.',
            'Considera aumentar la ingesta calórica con alimentos nutritivos y equilibrados.',
            'Realiza ejercicios de resistencia para ganar masa muscular.'
        ];
    } else if (imc < 25) {
        situacion = 'Peso saludable';
        recomendaciones = [
            '¡Mantén tu buen trabajo!',
            'Sigue una dieta balanceada y continúa haciendo ejercicio regularmente.',
            'Consulta a un profesional de la salud para chequeos periódicos.',
        ];

    } else if (imc < 30) {
        situacion = 'Sobrepeso';
        recomendaciones = [
            'Considera adoptar una dieta más equilibrada y aumentar tu actividad física.',
            'Consulta a un profesional de la salud para un plan personalizado que te ayude a perder peso de manera segura y efectiva.'
        ];

    } else if (imc < 35){
        situacion = 'Obesidad';
        recomendaciones = [
            'Es importante que consultes a un profesional de la salud para un plan integral que incluya dieta, ejercicio y posiblemente otros tratamientos.',
            'Reducir tu peso puede mejorar significativamente tu salud.'
        ];

    } else{
        situacion = 'Obesidad Mordida';
        recomendaciones = [
            'Es importante que consultes a un profesional de la salud para un plan integral que incluya dieta, ejercicio y posiblemente otros tratamientos.',
            'Reducir tu peso puede mejorar significativamente tu salud.'
        ];
    }
    document.getElementById('resultadoIMC').innerText = imc.toFixed(2);
    document.getElementById('situacion').innerText = situacion;
    const listaRecomendaciones = document.getElementById('recomendacion-lista');

    // Limpiar lista existente
    listaRecomendaciones.innerHTML = '';
    // Añadir nuevas recomendaciones
    recomendaciones.forEach(recomendacion => {
        const li = document.createElement('li');
        li.innerText = recomendacion;
        listaRecomendaciones.appendChild(li);//Agrega la recomendación dentro del elemento de lista HTML
    });
};

/**
 * Asegura que todos los datos del formularios sean ingresados y validos
 * @method validarFormulario
 */
const validarFormulario  = () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const edad = document.getElementById('edad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const tipoPlan = document.getElementById('tipoPlan').value;
    const otro = document.getElementById('otro').value;

    if (nombre.trim() === '') {
        alert('Por favor, ingrese su nombre.');
        return;
    }
    for (let i = 0; i < nombre.length; i++) {
        let char = nombre[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
            alert('El nombre no debe contener números ni caracteres especiales.');
            return;
        }
    }
    if (apellido.trim() === '') {
        alert('Por favor, ingrese su apellido.');
        return;
    }
    for (let i = 0; i < apellido.length; i++) {
        let char = apellido[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
            alert('El apellido no debe contener números ni caracteres especiales.');
            return;
        }
    }
    if (!genero) {
        alert('Por favor, seleccione su género.');
        return;
    }
    if (edad.trim() === '' || isNaN(edad) || edad<=0 || edad>100) {
        alert('Por favor, ingrese una edad válida.');
        return;
    }
    if (telefono.trim() === '' || isNaN(telefono) || telefono.length <9 || telefono.length > 11) {
        alert('Por favor, ingrese un número de teléfono válido.');
        return;
    }
    if (email.trim() === '' || !validateEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }
    if (tipoPlan === 'otros' && otro.trim() === '') {
        alert('Por favor, complete con su objetivo.');
        return;
    }
    alert('Formulario enviado con éxito.');
}

/**
 * Verifica que el mail ingresado cumpla correctamente
 * @method validateEmail
 * @param {boolean} email
 */
const validateEmail = email => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

/**
 * Al elegir una actvidad se muestra su descripcion y horarios disponibles
 * @method mostrarInformacion
 */
const mostrarInformacion = () => {
    const actividadSeleccionada = document.getElementById('tipoActividad').value;
    let titulo = '';
    let descripcion = '';
    let horario = '';
    let rutaIm = '';

    switch (actividadSeleccionada) {
        case 'Funcional':
            titulo = 'Funcional';
            descripcion = 'El entrenamiento funcional se basa en realizar ejercicios que se adaptan a los movimientos naturales del cuerpo humano para trabajar de forma global músculos y articulaciones.';
            horario = 'Horario: MARTES Y JUEVES 19:00-20:00';
            rutaIm = 'Imagenes/func.jpg';
            break;
        case 'Crossfit':
            titulo = 'Crossfit';
            descripcion = 'El CrossFit es un sistema de entrenamiento de fuerza y acondicionamiento basado en ejercicios funcionales constantemente variados realizados a una alta intensidad.';
            horario = 'Horario: MIERCOLES Y VIERNES 19:30-20:30';
            rutaIm = 'Imagenes/cross.jpg';
            break;
        case 'GAP':
            titulo = 'GAP';
            descripcion = 'El GAP es un conjunto de ejercicios orientados al trabajo de dichas zonas. Lo que se busca es poder tonificar y favorecer la quema de grasa gracias al gasto calórico realizado.';
            horario = 'Horario: MIERCOLES Y VIERNES 17:00-18:30HS';
            rutaIm = 'Imagenes/gap.jpg';
            break;
        case 'Kickboxing':
            titulo = 'Kickboxing';
            descripcion = 'Se trata de un deporte de contacto que alterna golpes propios del boxeo y patadas de artes marciales.';
            horario = 'Horario: MIERCOLES Y VIERNES 19:30-20:30';
            rutaIm = 'Imagenes/kick.jpg';
            break;
        case 'Zumba':
            titulo = 'Zumba';
            descripcion = 'Zumba es una disciplina deportiva en la que se realizan ejercicios aeróbicos al ritmo de música (merengue, samba, reggaeton, cumbia y salsa).';
            horario = 'Horario: MARTES Y JUEVES 19:00-20:00';
            rutaIm = 'Imagenes/zum.jpg';
            break;
        case 'Yoga':
            titulo = 'Yoga';
            descripcion = 'El yoga es una práctica física, mental y espiritual diseñada para tener una buena vida y cuyo fin último es alcanzar el samadhi (liberación, paz, felicidad).';
            horario = 'Horario: LUNES Y MIERCOLES 17:00-18:30HS';
            rutaIm = 'Imagenes/yoga.jpg';
            break;
        default:
            document.getElementById('infoActividad').style.display = 'none';
            limpiarCanvas('canvasact'); // Limpiar el canvas cuando no se selecciona ninguna actividad
            return;
    }

    document.getElementById('tituloActividad').innerText = titulo;
    document.getElementById('descripcionActividad').innerText = descripcion;
    document.getElementById('horarioActividad').innerText = horario;
    document.getElementById('infoActividad').style.display = 'block';
    cargarIm(rutaIm,'canvasact');
}

/**
 * Carga una imagen en un canvas
 * @method cargarIm
 * @param {string} src - La ruta de la imagen
 * @param {string} canvasId - El ID del canvas donde se cargará la imagen
 */
const cargarIm = (src, canvasId) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = src;

    let opacity = 0; // Opacidad inicial

    img.onload = () => {
        const animacion = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalAlpha = opacity; // Establece la opacidad
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (opacity < 1) {
                opacity += 0.01; // Incrementa la opacidad gradualmente
                animationId = requestAnimationFrame(animacion);
            } else {
                cancelAnimationFrame(animationId); // Detiene la animación cuando la opacidad es 1
            }
        }
        animacion();
    };
}

/**
 * Limpia el contenido del canvas
 * @method limpiarCanvas
 * @param {string} canvasId - El ID del canvas que se limpiará
 */
const limpiarCanvas = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Limpiar el canvas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    limpiarCanvas('canvasact');
});