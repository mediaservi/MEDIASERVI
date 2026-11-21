# MEDIASERVI

**[mediaservi.com](https://mediaservi.com)** — web de MEDIASERVI (Barcelona): proyectos audiovisuales, pantallas LED, gaming y experiencias.

Una web de una sola pantalla, en español e inglés, con portada, museo digital en 3D, parques temáticos y experiencias favoritas, redes de contacto y cómo llegar (solo con cita previa).

## Aviso legal

Web personal, gratuita y sin publicidad ni ingresos. Aviso legal en [`LEGAL.md`](LEGAL.md), garantías y responsabilidad en [`DISCLAIMER.md`](DISCLAIMER.md), privacidad en [`PRIVACY.md`](PRIVACY.md) y cookies en [`COOKIES.md`](COOKIES.md). Los tipos de letra y three.js se sirven desde este repositorio (`assets/fonts`, `assets/lib`). El enlace «Aviso legal» está en el pie de todas las páginas (portada y `klub/`) y abre un resumen en una ventana de la propia web (`assets/aviso.js`), con enlaces a los cuatro documentos.

## Mevi 3D

La mascota Mevi está en 3D y animada (`assets/mevi3d.js` y `assets/3d/mevi.glb`). Es un solo modelo de 600 KB con siete animaciones: reposo, andar, señalar, invitar, saludar, contenta («happy») y saltar. Antes de publicarla se pule:
- La textura queda en pocos colores lisos (traje, guantes, pelo y cinturón), sin manchitas sueltas, y la piel va suavizada.
- Las normales de la malla van suavizadas, para que la luz no marque los pliegues y bultos que deja la generación 3D. Sale en tres sitios:
- **INICIO, en ordenador y tablet**: camina sobre la línea que separa las pestañas, de punta a punta. A la ida (de izquierda a derecha) pasa por delante de la cuenta atrás y de la etiqueta de WhatsApp. A la vuelta salta por encima de la etiqueta de WhatsApp: se agacha para coger impulso, sale estirada y amortigua al caer. Después pasa por detrás de la cuenta atrás. En cada pasada se para dos veces a medio camino, y otra al final, a saludar, señalar, invitar o bailar contenta.
- **INICIO, en móvil**: en vertical pasea justo debajo de la cuenta atrás. En horizontal no hay hueco y no sale.
- **CONECTA**: ocupa el lugar de la imagen fija. Mira hacia las redes, las señala y saluda de vez en cuando.
- **MUSEO DIGITAL**: en la esquina inferior izquierda, baila contenta («happy») para llamar la atención y a veces saluda. Al tocarla se abre el terminal.

Cada escena solo se dibuja mientras su sección está en pantalla. Si el navegador no tiene WebGL, se queda la imagen fija (`assets/img/mevi.webp`). Las animaciones son de Mixamo (Adobe), sobre el modelo propio de Mevi. La textura se carga sin mipmaps para que no salgan rayitas entre los trozos.

## Museo digital

El tótem del museo abre un terminal con estas opciones, por este orden: HISTORIA DEL VIDEOJUEGO (LÍNEA DE TIEMPO) (lámina propia), MDV APP (en pantalla, «APP DEL MUSEO DEL VIDEOJUEGO»: la app MDV Hardware, se abre en Google Play), POSTERS CINE y POSTERS KLUB (cartelerías, solo para verlas dentro de la pantalla del museo, sin enlace de salida; se sirven desde ADPOSTER en GitHub, `adposter.mediaservi.com/cine/` y `/klub/`, y Netlify queda como copia de respaldo), MSGAME, VJSHOW, SCREENS, SYSTEMS, ADPOSTER, AVHUB, GAME HISTORY (biblioteca digital externa; su botón lleva el logo de la Video Game History Foundation, que es suyo y aquí solo identifica el enlace) y WhatsApp. Cada botón lleva su miniatura (`assets/img/mini/`) o una pantalla dibujada.

## Lámina «Historia del videojuego»

La lámina del museo (`assets/img/historia-videojuego-es.webp` y `-en.webp`) y su paso por la pantalla central (`assets/video/museo.*`) son un dibujo propio: iconos originales, sin fotografías ni logotipos de terceros. Los nombres citados pertenecen a sus titulares y se mencionan solo como referencia histórica.

## Sin caché
Desde el 18-11-2026, las páginas llevan las etiquetas equivalentes a `Cache-Control: no-cache, no-store, must-revalidate`. La web no tiene service worker; GitHub Pages no admite cabeceras propias.
