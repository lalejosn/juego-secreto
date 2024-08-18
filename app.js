//Declaracion de variables
let numeroSecreto = 0;
//Variable de conteo de iteraciones
let intentos = 0;
//Declaracion para registro de numero usados
let listaNumerosSorteados = [];
//Limite para evitar errores por recursividad
let numeroMaximo = 20;

// Las funciones se definen pero solo se activan cuando sean llamadas a través de una
// acción en la interfaz de usuario o dentro del propio código


// Esta funcion reduce a una linea codigo necesario para determinar el texto en un elemento de HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Realiza una comparación de datos
function verificarIntento() {
    //parseInt transrorma en un numero al elemento en la entrada
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    console.log(intentos);

    console.log(`${numeroDeUsuario} is a ${typeof(numeroDeUsuario)}`);

    //typeof determina que tipo de dato se esta obteniendo
    console.log(`${numeroSecreto} is a ${typeof(numeroSecreto)}`);
    //El triple igual compara los datos y si son del mismo tipo
    //El valor que retorna es un elemento boleano false, true
    console.log(numeroDeUsuario === numeroSecreto);
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' :'intentos'}`);
        document.querySelector('#valorUsuario').value = '';

        //Cambia un atributo de un elemento, en este caso para "activar" un boton
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo + 1);
    
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Todos los numeros han sido sorteados al menos una vez');
        listaNumerosSorteados = [];
        return generarNumeroSecreto();
    } else{
    //Si el numero generado esta incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto!');
    //Indicar mensaje de intervalo de número
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    //Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    //inicializar el número de intentos
    intentos = 1;

}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //Reestablecer las condiciones iniciales
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true')
}


condicionesIniciales();
