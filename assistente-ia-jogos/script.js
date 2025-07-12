const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

const markdownToHTML = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHTML(text)
}

const perguntarAI = async (question, game, apikey) => {
    const model = "gemini-2.0-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apikey}`;
    const pergunta = `
        ## Especialidade
        Você é um especialista assistente de meta para o jogo ${game}
        
        ## Tarefa
        Você deve responder as perguntaas do usuário com base no seu conhecimento do jogo,
        estratégias, build e dicas
        
        ## Regras
        - Se você não sabe a resposta, responda com 'Não Sei' e não tente inventar uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com
        'Essa pergunta não está relacionada ao jogo'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual,
        para dar uma resposta coerente
        - Nunca responda intens que você não tenha certeza de que existe no patch atual

        ## Respostas
        - Economize na resposta, seja direto e responda no máximo 500 caracteres
        - Responda em markdown
        - Não precisa fazer nenhuma saudação ou despedida,
        apenas responda o que o susuário está querendo

        ## Exemplo de resposta
        pergunta do usuário: Melhor build rengar jungle
        resposta: A build mais atual é: \n\n **Itens:**\n\n
        coloque os itens aqui. 

        ---
        Aqui está a pergunta do usuário: ${question}

    `;
    const contents = [{
        role: "user",
        parts: [{
            text: pergunta
        }]
    }];

    const tools = [{
        google_search: {}
    }]

    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json();
    return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async (event) => {

    event.preventDefault();

    const apikey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    if (apikey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    try {
        const text = await perguntarAI(question, game, apikey);
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text);
        aiResponse.classList.remove('hidden');
    } catch (error) {
        console.log('Erro:', error);
    } finally {
        askButton.disable = false;
        askButton.textContent = 'Perguntar para IA';
        askButton.classList.add('loading');
    }

    askButton.disable = true;
    askButton.textContent = 'Pergutando...';
    askButton.classList.remove('loading');

}

form.addEventListener('submit', enviarFormulario);