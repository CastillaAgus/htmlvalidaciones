export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];





const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacío",
        patternMismatch: "La contraseña debe contener más de 6 caracteres, al menos una letra y un número."
    },
    nacimiento: {
        valueMissing: "Este campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    telefono: {
        valueMissing: "Este campo teléfono no puede estar vacío",
        patternMismatch: "El formato requerido es xxx-xxxxxxx",
    },
    direccion: {
        valueMissing: "Este campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 5 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo ciudad no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 4 a 40 caracteres",
    },
    provincia: {
        valueMissing: "Este campo provincia no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 4 a 40 caracteres",
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}


//validar si el usuario es mayor de edad. 


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años para registrarte";
    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;

};