import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// =========================
// LOGIN
// =========================

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

            // REDIRECCION A PRIM.HTML
            window.location.href = "prim.html";

        } catch (error) {

            console.error("Error Login:", error);

            alert("Correo o contraseña incorrectos");

        }

    });

}

// =========================
// PROTEGER PAGINAS
// =========================

window.protegerPagina = function () {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.href = "login.html";

        } else {

            const nombreUsuario =
                document.getElementById("nombreUsuario");

            if (nombreUsuario) {

                nombreUsuario.textContent =
                    user.email;

            }

        }

    });

};

// =========================
// SI YA INICIO SESION,
// NO VOLVER A LOGIN
// =========================

onAuthStateChanged(auth, (user) => {

    if (
        user &&
        window.location.pathname.includes("login.html")
    ) {

        window.location.href = "prim.html";

    }

});

// =========================
// CERRAR SESION
// =========================

window.cerrarSesion = async function () {

    try {

        await signOut(auth);

        localStorage.removeItem("sesionActiva");

        window.location.href = "login.html";

    } catch (error) {

        console.error("Error al cerrar sesión:", error);

    }

};
