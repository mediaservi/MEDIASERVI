# MEDIASERVI

**[mediaservi.com](https://mediaservi.com)** — web de MEDIASERVI (Barcelona): proyectos audiovisuales, pantallas LED, gaming y experiencias.

Una web de una sola pantalla, en español e inglés, con portada, museo digital en 3D, parques temáticos y experiencias favoritas, redes de contacto y cómo llegar (solo con cita previa).

## Aviso legal

Web personal, gratuita y sin publicidad ni ingresos. Aviso legal en [`LEGAL.md`](LEGAL.md), garantías y responsabilidad en [`DISCLAIMER.md`](DISCLAIMER.md), privacidad en [`PRIVACY.md`](PRIVACY.md) y cookies en [`COOKIES.md`](COOKIES.md). Los tipos de letra y three.js se sirven desde este repositorio (`assets/fonts`, `assets/lib`). El enlace «Aviso legal» está en el pie de todas las páginas (portada y `klub/`) y abre un resumen en una ventana de la propia web (`assets/aviso.js`), con enlaces a los cuatro documentos.

## Mevi 3D

La mascota Mevi está en 3D y animada (`assets/mevi3d.js` y `assets/3d/mevi.glb`, un solo modelo de 550 KB con cinco animaciones: reposo, andar, señalar, invitar y saludar). Sale en tres sitios:
- **INICIO**: pequeña, pasea por la franja de la cuenta atrás de AVHUB. Va a un lado de los números, sin taparlos. En móvil vertical pasea justo debajo, y en móvil horizontal, donde no cabe, no sale.
- **CONECTA**: ocupa el lugar de la imagen fija. Mira hacia las redes, las señala y saluda de vez en cuando.
- **MUSEO DIGITAL**: en la esquina inferior izquierda, invita a pulsar. Al tocarla se abre el terminal.

Cada escena solo se dibuja mientras su sección está en pantalla. Si el navegador no tiene WebGL, se queda la imagen fija (`assets/img/mevi.webp`). Las animaciones son de Mixamo (Adobe), sobre el modelo propio de Mevi. La textura se ha limpiado y se carga sin mipmaps para que no salgan rayitas entre los trozos.

## Museo digital

El tótem del museo abre un terminal con estas opciones, por este orden: HISTORIA DEL VIDEOJUEGO (LÍNEA DE TIEMPO) (lámina propia), MDV APP (en pantalla, «APP DEL MUSEO DEL VIDEOJUEGO»: la app MDV Hardware, se abre en Google Play), POSTERS CINE y POSTERS KLUB (cartelerías, solo para verlas dentro de la pantalla del museo, sin enlace de salida; se sirven desde ADPOSTER en GitHub, `adposter.mediaservi.com/cine/` y `/klub/`, y Netlify queda como copia de respaldo), MSGAME, VJSHOW, SCREENS, SYSTEMS, ADPOSTER, AVHUB, GAME HISTORY (biblioteca digital externa; su botón lleva el logo de la Video Game History Foundation, que es suyo y aquí solo identifica el enlace) y WhatsApp. Cada botón lleva su miniatura (`assets/img/mini/`) o una pantalla dibujada.

## Lámina «Historia del videojuego»

La lámina del museo (`assets/img/historia-videojuego-es.webp` y `-en.webp`) y su paso por la pantalla central (`assets/video/museo.*`) son un dibujo propio: iconos originales, sin fotografías ni logotipos de terceros. Los nombres citados pertenecen a sus titulares y se mencionan solo como referencia histórica.
