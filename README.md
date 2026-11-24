# MEDIASERVI

**[mediaservi.com](https://mediaservi.com)** — web de MEDIASERVI (Barcelona): proyectos audiovisuales, pantallas LED, gaming y experiencias.

Una web de una sola pantalla, en español e inglés, con portada, museo digital en 3D, parques temáticos y experiencias favoritas, redes de contacto y cómo llegar (solo con cita previa).

## Aviso legal

Web personal, gratuita y sin publicidad ni ingresos. Aviso legal en [`LEGAL.md`](LEGAL.md), garantías y responsabilidad en [`DISCLAIMER.md`](DISCLAIMER.md), privacidad en [`PRIVACY.md`](PRIVACY.md) y cookies en [`COOKIES.md`](COOKIES.md). Los tipos de letra y three.js se sirven desde este repositorio (`assets/fonts`, `assets/lib`). El enlace «Aviso legal» está en el pie de todas las páginas (portada y `klub/`) y abre un resumen en una ventana de la propia web (`assets/aviso.js`), con enlaces a los cuatro documentos.

## Icono

Icono de pestaña y de app en el estilo de placa de la familia AVHUB (`assets/logos/mediaservi-icono.svg`, `-icono-64.png`, `-icono-180.png`): placa con degradado negro a morado, filete negro y sombra morada, con la cara de Mevi en el aro verde. El logo de la cabecera no cambia.

## Mevi 3D

**Noviembre 2026 · Mevi nueva:** regenerada en alta calidad (Meshy 7.1 desde su imagen oficial, rig de Mixamo, pelo azul marino) con la cara lisa. Los ojos y la boca los pone la web desde una hoja de expresiones (`assets/3d/caras.png`, con `assets/mevicara.js`, el mismo sistema que MSGAME): parpadea cada pocos segundos y, cuando está contenta, pone ojos felices.

La mascota Mevi está en 3D y animada (`assets/mevi3d.js` y `assets/3d/mevi.glb`). Es un solo modelo de 600 KB con siete animaciones: reposo, andar, señalar, invitar, saludar, contenta («happy») y saltar. Antes de publicarla se pule:
- La textura queda en pocos colores lisos (traje, guantes, pelo y cinturón), sin manchitas sueltas, y la piel va suavizada.
- Las normales de la malla van suavizadas, para que la luz no marque los pliegues y bultos que deja la generación 3D. Sale en tres sitios:
- **INICIO, en ordenador y tablet**: camina sobre la línea que separa las pestañas, de punta a punta. A la ida (de izquierda a derecha) pasa por delante de la cuenta atrás y de la etiqueta de WhatsApp. A la vuelta salta por encima de la etiqueta de WhatsApp: se agacha para coger impulso, sale estirada y amortigua al caer. Después pasa por detrás de la cuenta atrás. En cada pasada se para dos veces a medio camino, y otra al final, a saludar, señalar, invitar o bailar contenta.
- **INICIO, en móvil**: en vertical pasea justo debajo de la cuenta atrás. En horizontal no hay hueco y no sale.
- **CONECTA**: ocupa el lugar de la imagen fija. Mira hacia las redes, las señala y saluda de vez en cuando.
- **MUSEO DIGITAL**: en la esquina inferior izquierda, baila contenta («happy») para llamar la atención y a veces saluda. Al tocarla se abre el terminal.

Cada escena solo se dibuja mientras su sección está en pantalla. Si el navegador no tiene WebGL, se queda la imagen fija (`assets/img/mevi.webp`). Las animaciones son de Mixamo (Adobe), sobre el modelo propio de Mevi. La textura se carga sin mipmaps para que no salgan rayitas entre los trozos.

## Museo digital

El tótem del museo abre un terminal con estas opciones, por este orden: HISTORIA DEL VIDEOJUEGO (LÍNEA DE TIEMPO) (lámina propia), MDV APP (en pantalla, «APP DEL MUSEO DEL VIDEOJUEGO»: la app MDV Hardware, se abre en Google Play), POSTERS CINE y POSTERS KLUB (cartelerías, solo para verlas dentro de la pantalla del museo, sin enlace de salida; se sirven desde Netlify, `msp-theater.netlify.app` y `msp-klub.netlify.app`; su copia privada está en GitHub), MSGAME, VJSHOW, SCREENS, SYSTEMS, ADPOSTER, AVHUB, GAME HISTORY (biblioteca digital externa; su botón lleva el logo de la Video Game History Foundation, que es suyo y aquí solo identifica el enlace) y WhatsApp. Cada botón lleva su miniatura (`assets/img/mini/`) o una pantalla dibujada.

## Lámina «Historia del videojuego»

La lámina del museo (`assets/img/historia-videojuego-es.webp` y `-en.webp`) y su paso por la pantalla central (`assets/video/museo.*`) son un dibujo propio: iconos originales, sin fotografías ni logotipos de terceros. Los nombres citados pertenecen a sus titulares y se mencionan solo como referencia histórica.

## Sin caché
Desde el 18-11-2026, las páginas llevan las etiquetas equivalentes a `Cache-Control: no-cache, no-store, must-revalidate`. La web no tiene service worker; GitHub Pages no admite cabeceras propias.

## Visibilidad (SEO) y contador anónimo

**24-11-2026 · rama `mk-web`:** descripción con llamada a la acción, `og:locale`, `og:image:alt`, `twitter:site` y `twitter:image:alt`; datos estructurados schema.org (JSON-LD: Organization, Person y WebSite, con las redes y las apps de la familia); `robots.txt` deja fuera `klub/` (privada) y `sitemap.xml` con fecha al día; retrato de la portada con texto alternativo y prioridad de carga. Sin cambios de diseño.

**Contador de visitas anónimo y sin cookies.** Al final de `index.html` hay un script mínimo que, al abrir la página, manda al panel AVHUB ADMIN (Google Apps Script) solo el sitio, la página, `utm_source`/`utm_campaign`/`utm_content` y el dominio de procedencia. Sin cookies (la petición sale con `credentials: 'omit'`), sin identificadores y sin guardar nada en el navegador; respeta «Do Not Track» y «Global Privacy Control». **Activo desde el 24-11-2026:** el panel solo guarda recuentos por día (24 meses) y los muestra en su pestaña ANALÍTICA. Detalle en [`PRIVACY.md`](PRIVACY.md).

Enlaces de campaña: las etiquetas UTM van solo en los enlaces publicados fuera (LinkedIn, correo, QR impresos), nunca en los enlaces entre mediaservi.com, AVHUB y las apps. Ejemplo: `https://avhub.mediaservi.com/?utm_source=linkedin&utm_campaign=lanzamiento&utm_content=post1`.
