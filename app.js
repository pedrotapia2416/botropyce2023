const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');

function openChat() {
    const chatContainer = document.getElementById('container-chat');
    const openChatButton = document.getElementById('open-chat-button');

    // Muestra el contenedor del chat
    chatContainer.style.display = 'block';
    
    // Oculta el botón de "Abrir Chat" después de abrir el chat
    openChatButton.style.display = 'none';

    // Inicializa el chat si aún no se ha hecho
    if (!currentInteraction) {
        initializeChat();
    }
}

function closeChat() {
    const chatContainer = document.getElementById('container-chat');
    const openChatButton = document.getElementById('open-chat-button');

    // Oculta el contenedor del chat
    chatContainer.style.display = 'none';

    // Muestra el botón de "Abrir Chat" después de cerrar el chat
    openChatButton.style.display = 'block';
}

const interactions = [
    { "id": "inicioBot", "content": "¿En qué te puedo ayudar?", "options": [
        { "text": "Quiero ser proveedor", "nextQuestion": "inicioQuieroSerProveedor" },
        { "text": "Ya soy proveedor", "nextQuestion": "inicioYaSoyProveedor" },
        { "text": "Consultar en qué estado estás", "nextQuestion": "inicioVerificar" },
        { "text": "Buscador de Habilitaciones Especiales", "nextQuestion": "inicioHabilitacionesEspeciales" },
        { "text": "Instructivos", "nextQuestion": "inicioInstructivo" },
        { "text": "Participar en contrataciones", "nextQuestion": "inicioParticipa" },
        { "text": "Modificación de datos", "nextQuestion": "inicioModificacionDeDatos" },
        { "text": "Registro de Antecedentes Técnicos", "nextQuestion": "inicioRAT" },
        { "text": "Mesa de entrada Digital", "nextQuestion": "inicioMesaDeEntrada" }

,

      ]
    },
    { "id": "otraConsulta", "content": "¿En qué otro asunto te puedo ayudar?", "options": [
      { "text": "Quiero ser proveedor", "nextQuestion": "inicioQuieroSerProveedor" },
        { "text": "Ya soy proveedor", "nextQuestion": "inicioYaSoyProveedor" },
        { "text": "Consultar en qué estado estás", "nextQuestion": "inicioVerificar" },
        { "text": "Buscador de Habilitaciones Especiales", "nextQuestion": "inicioHabilitacionesEspeciales" },
        { "text": "Instructivos", "nextQuestion": "inicioInstructivo" },
        { "text": "Participar en contrataciones", "nextQuestion": "inicioParticipa" },
        { "text": "Quiero contactar a un agente", "nextQuestion": "inicioContactarAgente" }
    ]
    },
    { "id": "inicioQuieroSerProveedor", "content": "Conoce cómo gestionar: \n\n <hr><b>Acceso a ComprasPúblicas:</b>\n Es el primer paso para ser parte del Registro Oficial de Proveedores y Contratistas del Estado (ROPyCE) y participar en procedimientos electrónicos.No tiene vencimiento.\n\n <b>Inscripción en ROPyCE:</b> \n Con la Inscripción en ROPyCE, podrás ser adjudicado en Licitaciones de bienes, servicios y obra pública y otros procedimientos. Tiene un plazo de vigencia que deberá ser renovado para tener validez.", "options": [
        { "text": "Acceso a ComprasPúblicas", "nextQuestion": "inicioAcceso" },
        { "text": "Inscripción en ROPyCE", "nextQuestion": "inicioInscripcion" },
        { "text": "Requisitos a verificar ante ROPyCE", "nextQuestion": "inicioRequisitos" },
        { "text": "Volver al inicio", "nextQuestion": "otraConsulta" }

      ] },
      { "id": "inicioAcceso", "content": " Aquí encontrarás toda la información para gestionar el Acceso a ComprasPúblicas.\n\n https://compraspublicas.cba.gov.ar/acceso-a-compras-publicas/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" },
        { "text": "Volver al inicio", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioInscripcion", "content": "  Aquí encontrarás toda la información para gestionar la Inscripción en ROPyCE.\n\n https://compraspublicas.cba.gov.ar/inscripcion-en-ropyce/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" },
        
    
      ] },
      { "id": "inicioRenovacion", "content": "  Aquí encontrarás toda la información para renovar la Inscripción ROPyCE.\n\n https://compraspublicas.cba.gov.ar/renovacion-en-ropyce/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
    
      ] },
      { "id": "inicioVerificar", "content": "  Desde el siguiente link podrás verificá tu estado:\n\n https://compraspublicas.cba.gov.ar/consulta-el-estado-de-tu-solicitud/ \n\n Si contás con Inscripción en ROPyCE, podrás imprimir tu constancia  siguiendo los siguientes pasos.\n\n   https://compraspublicas.cba.gov.ar/wp-content/uploads/2021/05/Descargar-constancia-de-Inscripcion.pdf", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioHabilitacionesEspeciales", "content": "  Desde el siguiente link podrás consultar las Habilitaciones Especiales:\n\n https://compraspublicas.cba.gov.ar/buscador-habilitaciones-especiales/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioModificacionDeDatos", "content": "  Aquí encontrarás información para: ", "options": [
        { "text": "Alta de Rubros", "nextQuestion": "inicioAltaRubro" },
        { "text": "Vinculación/desvinculación de representante legal", "nextQuestion": "inicioVinculacion" },
        { "text": "Modificación de otros datos", "nextQuestion": "inicioOtrosDatos" },
        { "text": "Volver al inicio", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioMesaDeEntrada", "content": "  Conocé como enviar la documentación haciendo clic en el siguiente enlace:\n\n https://compraspublicas.cba.gov.ar/compras_insttuto/enviar-documentacion-por-e-tramite/ ", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioContactarAgente", "content": "Ingresá a nuestra fanpage, serás atendido de manera personalizada por uno de nuestros agentes a la brevedad\n\n https://www.facebook.com/ropycecba/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioYaSoyProveedor", "content": "  Aquí encontrarás información para:", "options": [
        { "text": "Renovación de Inscripción en ROPyCE", "nextQuestion": "inicioRenovacion" },
        { "text": "Modificación de datos", "nextQuestion": "inicioModificacionDeDatos" },
        { "text": "Registro de Antecedentes Técnicos", "nextQuestion": "inicioRAT" },
        { "text": "Requisitos a verificar ante ROPyCE", "nextQuestion": "inicioRequisitos" },
        { "text": "Descargar Constancia de Inscripción", "nextQuestion": "inicioConstanciaInscripcion" },
        { "text": "Volver al inicio", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioParticipa", "content": "Si eres proveedor ingresá desde aquí: \n\n  https://cidi.cba.gov.ar/portal-publico/?app=25 \n\n Si aún no sos proveedor,solicitá tu Acceso en ComprasPúblicas y/o tu Inscripción en ROPyCE  \n\n https://compraspublicas.cba.gov.ar/quiero-ser-proveedor/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioRequisitos", "content": "Desde el siguiente link podrás consultar todos los Requisitos a verificar ante ROPyCE: \n\n  https://compraspublicas.cba.gov.ar/requisitos-a-verificar-ropyce/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioConstanciaInscripcion", "content": "Desde el siguiente link podrás conocer como descargar la constancia de Inscripción: \n\n  https://compraspublicas.cba.gov.ar/compras_insttuto/descargar-constancia-de-inscripcion-en-ropyce/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioInstructivo", "content": "Desde el siguiente link podrás consultar todos los Instructivos: \n\n  https://compraspublicas.cba.gov.ar/instructivos/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioAltaRubro", "content": "Aquí encontrarás toda la información sobre cómo dar de Alta un Rubro. \n\n  https://compraspublicas.cba.gov.ar/modificacion-de-datos/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioVinculacion", "content": "Aquí encontrarás toda la información sobre cómo Vincular/desvincular un  Representante Legal \n\n  https://compraspublicas.cba.gov.ar/modificacion-de-datos/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioOtrosDatos", "content": "Aquí encontrarás toda la información sobre cómo modificar otros datos. \n\n  https://compraspublicas.cba.gov.ar/modificacion-de-datos/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "inicioRAT", "content": "Aquí encontrarás toda la información sobre el Registro de Antecedentes Técnicos. \n\n  https://compraspublicas.cba.gov.ar/rat/", "options": [
        { "text": "Gracias, me quedó claro.", "nextQuestion": "finConsulta" },
        { "text": "Quiero hacer otra consulta.", "nextQuestion": "otraConsulta" }
      ] },
      { "id": "finConsulta", "content": "¿Como estuvo la ayuda? ¿Te sirvió?.\n\n Completá la siguiente encuesta para que sigamos mejorando nuestra atención.\n\n https://encuestas.experienciaciudadanacba.gob.ar/limesurvey/index.php/168273?lang=es", "options": [
        { "text": "Volver al inicio", "nextQuestion": "otraConsulta" }
      ] }
  ];
let currentInteraction;

// Luego de definir las interacciones, llama a initializeChat directamente
initializeChat();

function initializeChat() {
  displayMessage(`<b>Bot:</b>\n ${interactions[0].content}`, getOptionTexts(interactions[0].options), false);
  currentInteraction = interactions[0];
}

function displayMessage(message, options, isUserMessage) {
    const messageContainer = document.createElement('div');

    // Agregar clase y contenedor según el tipo de mensaje
    if (isUserMessage) {
        messageContainer.classList.add('respuesta-usuario-container');
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('respuesta-usuario');
        userMessageElement.innerHTML = message.replace(/\n/g, '<br>'); // Reemplaza saltos de línea con <br>
        messageContainer.appendChild(userMessageElement);
    } else {
        messageContainer.classList.add('respuesta-bot-container');
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('respuesta-bot');

        // Agrega un salto de línea después de "Bot:"
        botMessageElement.innerHTML = `<div>${formatBotMessage(message)}</div>`;
        
        messageContainer.appendChild(botMessageElement);
    }

    chatContainer.appendChild(messageContainer);

    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });

    if (options) {
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleOptionClick(index));
            optionsContainer.appendChild(button);
        });
    }
}

// Nueva función para convertir URLs en enlaces
function formatBotMessage(message) {
    // Primero, reemplaza los saltos de línea con elementos <br>
    const messageWithLineBreaks = message.replace(/\n/g, '<br>');

    // Luego, convierte las URLs en enlaces
    return messageWithLineBreaks.replace(/\bhttps?:\/\/\S+/gi, match => {
        return `<a href="${match}" target="_blank" rel="noopener">${match}</a>`;
    });
}

function getOptionTexts(options) {
    return options.map(option => option.text);
}


// Modifica la función handleOptionClick en app.js
function handleOptionClick(index) {
    const selectedOption = currentInteraction.options[index];
    displayMessage(`<b>Usuario:</b>\n ${selectedOption.text}`, undefined, true);

    const nextQuestionId = selectedOption.nextQuestion;
    const nextInteraction = interactions.find(interaction => interaction.id === nextQuestionId);

    if (nextInteraction) {
        const nextOptions = nextInteraction.options || [];

        // Agrega un retraso de 1 segundo antes de mostrar la respuesta del bot
        setTimeout(() => {
            currentInteraction = nextInteraction;
            displayMessage(`<b>Bot:</b>\n ${nextInteraction.content}`, getOptionTexts(nextOptions), false);
        }, 500);
    } else {
        console.error('Bot:\n  Pregunta no encontrada. Por favor, revisa tus datos.', selectedOption);
    }
}
