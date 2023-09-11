export const recoverPasswordTemplate = (username: string, redirectURL: string) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperación de Contraseña</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:logoBlanco" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Recuperación de contraseña</h1>
                    <p>Hola <b>${username}</b>,</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Para continuar, por favor haz clic en el siguiente botón:</p>
                    <a href="${redirectURL}" class="button text-white">Restablecer Contraseña</a>
                    <p>Si no solicitaste restablecer la contraseña, por favor ignora este correo electrónico.</p>
                    <p>Gracias,</p>
                    <p>El equipo de PrintIT</p>
                </div>
            </div>
        </body>
    </html>
`;

export const createWorkTemplate = (username: string, redirectURL: string, workername: string) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Creación de trabajo</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:logoBlanco" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Creación de trabajo</h1>
                    <p>Hola <b>${workername}</b>,</p>
                    <p>Un usuario, ${username}, ha solicitado tus servicios de impresión. ¡Felicidades! Para continuar, por favor dirigite a la sección de</p>
                    <a href="${redirectURL}" class="button text-white">Mis Trabajos</a>
                    <p>para poder continuar con la negociación. Esperamos que todo siga de forma correcta.</p>
                    <p>Un abrazo,</p>
                    <p>El equipo de PrintIT</p>
                </div>
            </div>
        </body>
    </html>
`;

export const finishNegotiationTemplate = (username: string) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Finalización de Negociación</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:logoBlanco" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Creación de trabajo</h1>
                    <p>Hola <b>${username}</b>,</p>
                    <p>Nos alegra comunicar que la negociacion de tu trabajo a terminado. ¡Felicidades! Esperamos que todo siga de forma correcta.</p>
                    <p>Un abrazo,</p>
                    <p>El equipo de PrintIT</p>
                </div>
            </div>
        </body>
    </html>
`;

export const updateBidTemplate = (username: string, redirectURL: string, redirectSection: string) => `
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Se creó un contraoferta</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                padding: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-align: center;
                }

                .logo {
                max-width: 50px;
                margin: 0 auto;
                display: block;
                }

                .content {
                padding: 20px;
                text-align: center;
                }

                .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:logoBlanco" alt="App Logo" class="logo">
                </div>
                <div class="content">
                    <h1>Contraoferta</h1>
                    <p>Hola <b>${username}</b>,</p>
                    <p>Recientemente se ha presentado una contraoferta. Para poder continuar con la negociación, por favor dirigite a la sección de</p>
                    <a href="${redirectURL}" class="button text-white">${redirectSection}</a>
                    <p>para poder continuar con la negociación. Esperamos que todo siga de forma correcta.</p>
                    <p>Un abrazo,</p>
                    <p>El equipo de PrintIT</p>
                </div>
            </div>
        </body>
    </html>
`;