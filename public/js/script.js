// -----------------------------------------------------------------
// CONFIGURACIÓN OBLIGATORIA
// -----------------------------------------------------------------
// ¡¡ACTUALIZA ESTA URL con tu endpoint de API Gateway!!
const API_GATEWAY_URL = "https://rrncmlzvi2.execute-api.us-east-2.amazonaws.com/dev";
// -----------------------------------------------------------------


// Se ejecuta cuando la página se carga por completo
window.onload = () => {
    setupEventListeners();
    getPosts(); // Cargar los posts al iniciar
};

/**
 * Configura los 'event listeners' para los formularios.
 */
function setupEventListeners() {
    const createForm = document.getElementById('createPostForm');
    createForm.addEventListener('submit', handleCreatePost);

    const deleteForm = document.getElementById('deletePostForm');
    deleteForm.addEventListener('submit', handleDeletePost);
}

/**
 * Maneja el envío del formulario 'Crear nuevo post'.
 */
async function handleCreatePost(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const caption = document.getElementById('caption').value;
    const author = document.getElementById('author').value;
    const imageFile = document.getElementById('imageFile').files[0];

    if (!imageFile) {
        alert('Por favor, selecciona una imagen.');
        return;
    }

    // AVISO: La carga de archivos a API Gateway + Lambda puede ser compleja.
    // Esta es una implementación ASUMIENDO que tu API acepta 'FormData'.
    // Si tu API espera un JSON con una URL de S3 pre-firmada, este flujo cambiará.
    
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('author', author);
    formData.append('image', imageFile); // El nombre 'image' debe coincidir con el esperado por tu backend

    console.log('Creando post...');

    try {
        const response = await fetch(`${API_GATEWAY_URL}/post`, {
            method: 'POST',
            body: formData,
            // Nota: 'fetch' establece automáticamente el 'Content-Type' a 'multipart/form-data'
            // cuando el 'body' es un objeto FormData.
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const result = await response.json();
        console.log('Post creado:', result);
        
        // Limpiar formulario y recargar posts
        document.getElementById('createPostForm').reset();
        getPosts(); // Recargar la lista de posts

    } catch (error) {
        console.error('Error al crear el post:', error);
        alert('Error al crear el post. Revisa la consola para más detalles.');
    }
}

/**
 * Maneja el envío del formulario 'Eliminar post'.
 */
async function handleDeletePost(event) {
    event.preventDefault();

    const postId = document.getElementById('postIdToDelete').value;

    if (!postId) {
        alert('Por favor, ingresa el ID del post a eliminar.');
        return;
    }

    console.log(`Eliminando post con ID: ${postId}`);

    try {
        // ASUMO que tu API espera el ID en la URL (ej. /post/123)
        // Si espera un JSON, deberás cambiar esto.
        const response = await fetch(`${API_GATEWAY_URL}/post/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        console.log('Post eliminado');
        
        // Limpiar formulario y recargar posts
        document.getElementById('deletePostForm').reset();
        getPosts(); // Recargar la lista de posts

    } catch (error) {
        console.error('Error al eliminar el post:', error);
        alert('Error al eliminar el post. Revisa la consola.');
    }
}

/**
 * Obtiene todos los posts desde la API y los muestra.
 */
async function getPosts() {
    const postsContainer = document.getElementById('posts-container');
    // Mostrar mensaje de carga
    postsContainer.innerHTML = '<p class="empty-message">Cargando publicaciones...</p>';

    try {
        const response = await fetch(`${API_GATEWAY_URL}/posts`); // ASUMO que este es tu endpoint GET
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const posts = await response.json();

        // Llamar a la función para mostrar los posts
        displayPosts(posts);

    } catch (error) {
        console.error('Error al obtener los posts:', error);
        postsContainer.innerHTML = '<p class="empty-message">No se pudieron cargar las publicaciones.</p>';
    }
}

/**
 * NUEVA FUNCIÓN: Renderiza los posts en el DOM.
 * @param {Array} posts - Un array de objetos de post.
 */
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    
    // Limpiar el contenedor (quitando el mensaje de 'Cargando...')
    // Mantenemos el título H2 que ya está en el HTML
    const postList = document.createElement('div');
    postList.className = 'post-list';

    // Limpiamos solo los posts anteriores, no el título H2
    const oldList = postsContainer.querySelector('.post-list');
    if (oldList) {
        oldList.remove();
    }
    const oldEmptyMessage = postsContainer.querySelector('.empty-message');
    if (oldEmptyMessage) {
        oldEmptyMessage.remove();
    }

    if (!posts || posts.length === 0) {
        postsContainer.innerHTML += '<p class="empty-message">Aún no hay publicaciones. ¡Crea la primera!</p>';
        return;
    }

    // Iterar sobre cada post y crear su tarjeta HTML
    posts.forEach(post => {
        // ASUNCIONES: Asumo que el objeto 'post' tiene 'id', 'caption', 'author', y 'imageUrl'
        // ¡DEBES AJUSTAR ESTOS NOMBRES DE PROPIEDAD a los que tu API devuelve!
        // Por ejemplo, si tu API devuelve 'post_id', usa 'post.post_id'
        
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        postCard.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.caption}" class="post-image">
            <div class="post-content">
                <p class="caption">"${post.caption}"</p>
                <p class="author-info">Publicado por: ${post.author}</p>
                <small class="post-id">ID: ${post.id}</small>
            </div>
        `;
        postList.appendChild(postCard);
    });

    postsContainer.appendChild(postList);
}