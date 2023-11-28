// app.js

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');

let interactions;

fetch('preguntas.json')
    .then(response => response.json())
    .then(data => {
        interactions = data;
        initializeChat();
    })
    .catch(error => console.error('Error cargando preguntas:', error));

let currentInteraction;

// Modifica la función initializeChat en app.js
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
        return `<a href="${match}" target="_blank">${match}</a>`;
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