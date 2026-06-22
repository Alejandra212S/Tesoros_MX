import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", async (e) => {

        e.preventDefault();

        const correo =
            document.getElementById("loginCorreo").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();

        try {

            const credencial =
                await signInWithEmailAndPassword(
                    auth,
                    correo,
                    password
                );

            localStorage.setItem(
                "sesionActiva",
                JSON.stringify({
                    uid: credencial.user.uid,
                    correo: credencial.user.email
                })
            );

            alert("Inicio de sesión exitoso");

            window.location.href = "index.html";

        } catch (error) {

            console.error(error);

            alert(
                "Correo o contraseña incorrectos"
            );

        }

    });

}

window.cerrarSesion = async function () {

    await signOut(auth);

    localStorage.removeItem("sesionActiva");

    window.location.href = "login.html";

};