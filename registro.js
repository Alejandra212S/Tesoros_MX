import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

console.log("REGISTRO.JS CARGADO");

const formRegistro = document.getElementById("formRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

console.log("Formulario encontrado:", formRegistro);

if (formRegistro) {

    formRegistro.addEventListener("submit", async (e) => {

        console.log("CLICK EN REGISTRAR");

        e.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const correoValido =
            /^[A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        mensajeRegistro.className = "";
        mensajeRegistro.style.display = "block";

        if (nombre === "" || correo === "" || password === "") {

            mensajeRegistro.textContent =
                "Por favor completa todos los campos.";

            mensajeRegistro.classList.add("error");
            return;
        }

        if (!correoValido.test(correo)) {

            mensajeRegistro.textContent =
                "Correo inválido.";

            mensajeRegistro.classList.add("error");
            return;
        }

        if (password.length < 8) {

            mensajeRegistro.textContent =
                "La contraseña debe tener al menos 8 caracteres.";

            mensajeRegistro.classList.add("error");
            return;
        }

        try {

            console.log("Creando usuario...");

            const credencial =
                await createUserWithEmailAndPassword(
                    auth,
                    correo,
                    password
                );

            console.log(
                "Usuario creado:",
                credencial.user.uid
            );

            await setDoc(
                doc(
                    db,
                    "usuarios",
                    credencial.user.uid
                ),
                {
                    nombre: nombre,
                    correo: correo,
                    fechaRegistro: new Date()
                }
            );

            console.log(
                "Datos guardados en Firestore"
            );

            mensajeRegistro.textContent =
                "Registro exitoso. Redirigiendo al login...";

            mensajeRegistro.classList.add("exito");

            formRegistro.reset();

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 2000);

        } catch (error) {

            console.error(
                "ERROR FIREBASE:",
                error
            );

            alert(
                "Código: " +
                error.code +
                "\n\nMensaje: " +
                error.message
            );

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                mensajeRegistro.textContent =
                    "Este correo ya está registrado.";

            } else {

                mensajeRegistro.textContent =
                    "Error al registrar usuario.";

            }

            mensajeRegistro.classList.add("error");
        }

    });

} else {

    console.error(
        "No se encontró el formulario formRegistro"
    );

}