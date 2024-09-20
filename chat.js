document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const questionSuggestions = document.getElementById('questionSuggestions');
    const clearChatButton = document.getElementById('clearChatButton');

    const suggestedQuestions = [
        "¿Como declaro una variable en javascript?",
        "¿Que es pip en python?",
        "¿Que es HTML?",
        "¿Que es inteligencia artificial?",
        "¿Que es un ataque ddos?"
    ];

    function addSuggestions() {
        suggestedQuestions.forEach(question => {
            const button = document.createElement('button');
            button.textContent = question;
            button.classList.add('suggestion-button');
            button.addEventListener('click', () => {
                userInput.value = question;
                sendMessage();
            });
            questionSuggestions.appendChild(button);
        });
    }

    addSuggestions();

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            userInput.value = '';
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                respondToUser(message);
            }, 1500);
        }
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function clearChat() {
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        addMessage('¡Hola! Soy TechBot, tu asistente virtual especializado en tecnología y programación. ¿En qué puedo ayudarte hoy?', 'bot-message');
    }

    clearChatButton.addEventListener('click', clearChat);

    function respondToUser(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = '';

        const qa = {
            // JavaScript
            'que es javascript': 'JavaScript es un lenguaje de programación interpretado, orientado a objetos, débilmente tipado y dinámico. Es ampliamente utilizado en el desarrollo web del lado del cliente.',
            'para que se usa javascript': 'JavaScript se usa principalmente para crear páginas web interactivas, desarrollar aplicaciones web y móviles, servidores web, y hasta aplicaciones de escritorio.',
            'como declaro una variable en javascript': 'En JavaScript moderno, puedes declarar variables usando "let" para variables que pueden cambiar, "const" para constantes, y "var" (aunque es menos recomendado). Ejemplo: let x = 5; const PI = 3.14159;',
            'que son las funciones flecha en javascript': 'Las funciones flecha son una forma más concisa de escribir funciones en JavaScript. Ejemplo: const suma = (a, b) => a + b;',
            'que es el dom en javascript': 'El DOM (Document Object Model) es una interfaz de programación para documentos HTML y XML. Representa la estructura de un documento como un árbol de objetos, permitiendo a JavaScript modificar el contenido y la estructura de una página web.',

            // Python
            'que es python': 'Python es un lenguaje de programación interpretado, de alto nivel y de propósito general. Es conocido por su sintaxis clara y legible.',
            'para que se usa python': 'Python se usa en desarrollo web, ciencia de datos, inteligencia artificial, aprendizaje automático, automatización, scripting, desarrollo de software y más.',
            'como declaro una variable en python': 'En Python, simplemente asignas un valor a un nombre. Por ejemplo: x = 5',
            'que son las listas en python': 'Las listas en Python son estructuras de datos que pueden contener múltiples elementos de diferentes tipos. Se definen con corchetes, por ejemplo: mi_lista = [1, "dos", 3.0]',
            'que es pip en python': 'PIP es el sistema de gestión de paquetes de Python. Se usa para instalar y administrar paquetes de software escritos en Python.',

            // HTML y CSS
            'que es html': 'HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web. Define la estructura y el contenido de una página web.',
            'que es css': 'CSS (Cascading Style Sheets) es un lenguaje usado para describir la presentación de un documento escrito en HTML o XML. Controla el diseño y la apariencia de las páginas web.',
            'como vinculo css a html': 'Puedes vincular CSS a HTML usando la etiqueta <link> en el <head> del documento HTML. Por ejemplo: <link rel="stylesheet" href="estilos.css">',
            'que es responsive design': 'El diseño responsivo es una técnica de diseño web que hace que las páginas web se vean bien en todos los dispositivos (desktops, tablets, y teléfonos).',
            'que es flexbox': 'Flexbox es un método de diseño en CSS que permite crear layouts flexibles y eficientes. Es especialmente útil para alinear y distribuir espacio entre elementos en un contenedor.',

            // Bases de datos
            'que es sql': 'SQL (Structured Query Language) es un lenguaje estándar para administrar y manipular bases de datos relacionales.',
            'que es una base de datos relacional': 'Una base de datos relacional es un tipo de base de datos que almacena y proporciona acceso a puntos de datos relacionados entre sí. Se basa en el modelo relacional.',
            'que es nosql': 'NoSQL se refiere a bases de datos no relacionales. Son bases de datos que almacenan datos en un formato diferente a las tablas relacionales.',
            'que es mongodb': 'MongoDB es una base de datos NoSQL orientada a documentos. Almacena datos en documentos flexibles similares a JSON.',
            'que es un join en sql': 'Un JOIN en SQL es una cláusula para combinar filas de dos o más tablas, basándose en una columna relacionada entre ellas.',

            // Inteligencia Artificial y Machine Learning
            'que es inteligencia artificial': 'La Inteligencia Artificial (IA) es la simulación de procesos de inteligencia humana por parte de máquinas, especialmente sistemas informáticos.',
            'que es machine learning': 'Machine Learning es una rama de la IA que se centra en el uso de datos y algoritmos para imitar la forma en que aprenden los humanos, mejorando gradualmente su precisión.',
            'que es deep learning': 'Deep Learning es un subconjunto del Machine Learning basado en redes neuronales artificiales con múltiples capas. Es especialmente efectivo en tareas como reconocimiento de imágenes y procesamiento del lenguaje natural.',
            'que es una red neuronal': 'Una red neuronal es un modelo computacional inspirado en el cerebro humano. Consiste en capas de nodos interconectados que procesan información.',
            'que es nlp': 'NLP (Natural Language Processing) es una rama de la IA que se ocupa de la interacción entre las computadoras y el lenguaje humano. Se usa en traducción automática, análisis de sentimientos, etc.',

            // Desarrollo web
            'que es frontend': 'Frontend se refiere a la parte de una aplicación web con la que interactúan directamente los usuarios. Incluye todo lo que los usuarios ven y con lo que interactúan en su navegador.',
            'que es backend': 'Backend se refiere a la parte del servidor de una aplicación web. Maneja la lógica, las bases de datos, y el procesamiento detrás de escena de una aplicación.',
            'que es api': 'API (Application Programming Interface) es un conjunto de definiciones y protocolos para construir e integrar software de aplicaciones. Permite que diferentes aplicaciones se comuniquen entre sí.',
            'que es rest': 'REST (Representational State Transfer) es un estilo arquitectónico para diseñar sistemas de red. Se usa comúnmente en el desarrollo de servicios web.',
            'que es mvc': 'MVC (Model-View-Controller) es un patrón de diseño de software que separa la lógica de la aplicación en tres componentes interconectados: el Modelo (datos), la Vista (interfaz de usuario) y el Controlador (lógica de control).',

            // Seguridad informática
            'que es ciberseguridad': 'La ciberseguridad es la práctica de proteger sistemas, redes y programas de ataques digitales. Incluye tecnologías, procesos y prácticas diseñadas para proteger redes, dispositivos, programas y datos de ataques, daños o accesos no autorizados.',
            'que es un firewall': 'Un firewall es un sistema de seguridad de red que monitorea y controla el tráfico de red entrante y saliente basándose en reglas de seguridad predeterminadas.',
            'que es encriptacion': 'La encriptación es el proceso de codificar información de manera que solo las partes autorizadas puedan acceder a ella. Convierte los datos en un formato que parece aleatorio para cualquiera que no tenga la clave de desencriptación.',
            'que es un ataque ddos': 'Un ataque DDoS (Distributed Denial of Service) es un intento malicioso de interrumpir el tráfico normal de un servidor, servicio o red objetivo sobrecargándolo con una avalancha de tráfico de Internet desde múltiples fuentes.',
            'que es la autenticacion de dos factores': 'La autenticación de dos factores (2FA) es un método de seguridad que requiere dos formas diferentes de identificación antes de conceder acceso a algo. Típicamente combina algo que el usuario sabe (como una contraseña) con algo que el usuario tiene (como un código enviado a un teléfono).',

            // Cloud Computing
            'que es cloud computing': 'Cloud computing, o computación en la nube, es la entrega de servicios informáticos (incluyendo servidores, almacenamiento, bases de datos, redes, software) a través de Internet ("la nube").',
            'que es aws': 'AWS (Amazon Web Services) es una plataforma de servicios de nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otras funcionalidades para ayudar a las empresas a escalar y crecer.',
            'que es azure': 'Microsoft Azure es un servicio de computación en la nube creado por Microsoft para construir, probar, desplegar y administrar aplicaciones y servicios a través de centros de datos administrados por Microsoft.',
            'que es saas': 'SaaS (Software as a Service) es un modelo de distribución de software donde el proveedor de software aloja la aplicación y la pone a disposición de los clientes a través de Internet.',
            'que es serverless computing': 'La computación serverless es un modelo de ejecución en el que el proveedor de la nube gestiona dinámicamente la asignación de recursos de máquina. El nombre es engañoso, ya que aún se utilizan servidores, pero el desarrollador no tiene que preocuparse por ellos.'
        };

        
        if (qa.hasOwnProperty(lowerCaseMessage)) {
            response = qa[lowerCaseMessage];
        } else {
         
            for (let key in qa) {
                if (lowerCaseMessage.includes(key)) {
                    response = qa[key];
                    break;
                }
            }
        }

        
        if (!response) {
            response = "Lo siento, no tengo información específica sobre esa pregunta. ¿Puedes reformularla o preguntar sobre otro tema de tecnología?";
        }

        addMessage(response, 'bot-message');
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});