# 🍽️ Recetas de la Tita

Un recetario web interactivo creado con mucho cariño para preservar y compartir 74 años de tradición y sabor familiar. Este proyecto no solo es una herramienta para organizar recetas, sino un homenaje al legado de nuestra Tita y a los momentos compartidos en la mesa.

## ✨ Características Principales

*   **Homenaje de Bienvenida:** Un modal emotivo al iniciar la página que muestra la fotografía de la familia y da la bienvenida a la cocina.
*   **Elección de la Tita (Menú Aleatorio):** Un generador dinámico que selecciona al azar un menú completo (plato fuerte, ensalada y agua fresca) para resolver el clásico problema de "¿qué cocinamos hoy?".
*   **Categorías Estructuradas:** Lectura de datos dividida en tres secciones principales: Platos Fuertes, Ensaladas y Aguas Frescas.
*   **Modales de Detalle:** Visualización de ingredientes y pasos de preparación en ventanas flotantes (modales) rápidas y limpias, sin necesidad de recargar la página.
*   **Identidad Visual Propia:** Paleta de colores cálida y familiar, utilizando direcciones de arte que evocan la comida casera tradicional.

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Para la estructura semántica de la página.
*   **Tailwind CSS (vía CDN):** Para un diseño moderno y totalmente responsivo (adaptable a celulares y computadoras). Se configuró una paleta de colores personalizada (`tita-verde`, `tita-amarillo`, `tita-naranja`, `tita-crema`).
*   **JavaScript (Vanilla):** Para manejar la lógica del menú aleatorio, las interacciones de los modales y el consumo asíncrono de los datos mediante promesas (`Promise.all` y `fetch`).
*   **JSON:** Archivos locales que actúan como una base de conocimiento, manteniendo los datos organizados y separados del código fuente.

## 📁 Estructura del Proyecto

```text
mi-app-recetas/
│
├── index.html              # Archivo principal con la maquetación y diseño base
├── data/                   # Carpeta que funciona como nuestra base de datos local
│   ├── comidas.json        # Archivo con los datos de platos fuertes
│   ├── ensaladas.json      # Archivo con los datos de ensaladas
│   └── aguas.json          # Archivo con los datos de aguas frescas
│
├── src/                    
│   └── js/
│       └── app.js          # Archivo central con toda la lógica de JavaScript
│
└── public/                 
    └── img/
        └── fotoTita.jpg    # Fotografía principal utilizada en el modal de bienvenida