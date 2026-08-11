// 1. Referencias al DOM
const contenedorMenu = document.getElementById('menu-aleatorio-contenedor');
const btnRegenerar = document.getElementById('btn-re-generar');
const contenedorFuertes = document.getElementById('lista-fuertes');
const contenedorEnsaladas = document.getElementById('lista-ensaladas');
const contenedorAguas = document.getElementById('lista-aguas');
const modalReceta = document.getElementById('modal-receta');
const modalTitulo = document.getElementById('modal-titulo');
const modalIngredientes = document.getElementById('modal-ingredientes');
const modalPasos = document.getElementById('modal-pasos');
const modalBienvenida = document.getElementById('modal-bienvenida');

let datosComidas = [];
let datosEnsaladas = [];
let datosAguas = [];

// 2. Funciones Lógicas
function obtenerRecetaAleatoria(lista) {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}

// Función Actualizada: Portadas Generales por Categoría
function crearTarjetaHTML(receta, categoria) {
    
    let imagenAutomatica = "";

    // Asignamos UNA imagen general, representativa y con un toque muy casero y tradicional.
    if (categoria === "Plato Fuerte") {
        // Foto de pollo rústico con jitomates y especias en una sartén
        imagenAutomatica = "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80"; 
    } else if (categoria === "Ensalada") {
        // Foto del tazón de ensalada súper fresco (este lo mantenemos porque te gustó)
        imagenAutomatica = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80";
    } else if (categoria === "Bebida") {
        // Foto de tres vasos con aguas frescas frutales de distintos colores
        imagenAutomatica = "https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&q=80";
    }
    
    // El sistema decide: Si pusiste una ruta manual en el JSON la usa, si no, usa la portada de categoría.
    const imagenFinal = receta.imagen ? receta.imagen : imagenAutomatica;
    
    return `
        <div class="bg-white rounded-xl shadow-sm border border-tita-amarillo overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
            
            <div class="relative">
                <!-- Imagen de la tarjeta -->
                <img src="${imagenFinal}" alt="${receta.nombre}" class="w-full h-48 object-cover">
                
                <!-- Pequeño filtro oscuro para que la tarjeta se vea más elegante -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            <div class="p-5 flex flex-col flex-grow relative z-10">
                <span class="text-xs font-bold uppercase tracking-wider text-tita-naranja mb-2 block">${categoria}</span>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${receta.nombre}</h3>
                <p class="text-gray-500 text-sm mb-4">⏱ ${receta.tiempo}</p>
                
                <div class="mt-auto">
                    <button onclick="abrirModal('${receta.id}')" class="w-full bg-tita-verde hover:bg-opacity-90 text-white font-medium py-2 rounded-lg transition shadow-sm">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 3. Funciones del Modal
function abrirModal(idSolicitado) {
    const recetaEncontrada = 
        datosComidas.find(receta => receta.id === idSolicitado) || 
        datosEnsaladas.find(receta => receta.id === idSolicitado) || 
        datosAguas.find(receta => receta.id === idSolicitado);

    if (!recetaEncontrada) return;

    modalTitulo.innerText = recetaEncontrada.nombre;
    modalIngredientes.innerHTML = recetaEncontrada.ingredientes.map(ing => `<li>${ing}</li>`).join('');
    modalPasos.innerHTML = recetaEncontrada.pasos.map(paso => `<li>${paso}</li>`).join('');
    modalReceta.classList.remove('hidden');
}

function cerrarModal() {
    modalReceta.classList.add('hidden');
}
// Oculta la ventana de bienvenida con un efecto suave
function cerrarBienvenida() {
    // Primero la hacemos transparente
    modalBienvenida.style.opacity = '0';
    
    // Esperamos medio segundo (500ms) a que termine la animación y luego la quitamos del camino
    setTimeout(() => {
        modalBienvenida.classList.add('hidden');
    }, 500);
}

// 4. Funciones de Inyección y Animación
function pintarMenuAleatorio() {
    if (!datosComidas.length || !datosEnsaladas.length || !datosAguas.length) return;

    contenedorMenu.style.opacity = '0';
    btnRegenerar.innerHTML = '<span>⏳</span> Sorteando el menú...';
    btnRegenerar.classList.add('animate-pulse', 'opacity-75');
    btnRegenerar.disabled = true;

    setTimeout(() => {
        const fuerte = obtenerRecetaAleatoria(datosComidas);
        const ensalada = obtenerRecetaAleatoria(datosEnsaladas);
        const agua = obtenerRecetaAleatoria(datosAguas);

        contenedorMenu.innerHTML = 
            crearTarjetaHTML(fuerte, "Plato Fuerte") +
            crearTarjetaHTML(ensalada, "Ensalada") +
            crearTarjetaHTML(agua, "Bebida");
        
        contenedorMenu.style.opacity = '1';
        btnRegenerar.innerHTML = '<span>🎲</span> Descubrir otra combinación';
        btnRegenerar.classList.remove('animate-pulse', 'opacity-75');
        btnRegenerar.disabled = false;
    }, 600);
}

function pintarListasCompletas() {
    contenedorFuertes.innerHTML = datosComidas.map(r => crearTarjetaHTML(r, "Plato Fuerte")).join('');
    contenedorEnsaladas.innerHTML = datosEnsaladas.map(r => crearTarjetaHTML(r, "Ensalada")).join('');
    contenedorAguas.innerHTML = datosAguas.map(r => crearTarjetaHTML(r, "Bebida")).join('');
}

// 5. Inicialización
function iniciarApp() {
    Promise.all([
        fetch('./data/comidas.json').then(res => res.json()),
        fetch('./data/ensaladas.json').then(res => res.json()),
        fetch('./data/aguas.json').then(res => res.json())
    ])
    .then(([comidas, ensaladas, aguas]) => {
        datosComidas = comidas;
        datosEnsaladas = ensaladas;
        datosAguas = aguas;

        pintarMenuAleatorio();
        pintarListasCompletas();
    })
    .catch(error => console.error("Error al cargar los JSON:", error));
}

btnRegenerar.addEventListener('click', pintarMenuAleatorio);
iniciarApp();