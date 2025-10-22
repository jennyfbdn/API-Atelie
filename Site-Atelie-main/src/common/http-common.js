import axios from 'axios';
//const API_URL =  "https://projeto.com.br/"; //remote(produção)
const API_URL = "http://localhost:8080/"; //local(desenvolvimento)

//Texto somente
const mainInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    },
    timeout: 10000
});

// Interceptor para debug
mainInstance.interceptors.request.use(
    (config) => {
        console.log('Fazendo requisição para:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
);

mainInstance.interceptors.response.use(
    (response) => {
        console.log('Resposta recebida:', response.data);
        return response;
    },
    (error) => {
        console.error('Erro na resposta:', error);
        return Promise.reject(error);
    }
);

//Arquivos e texto
const multipartInstance = axios.create({
    baseURL: API_URL,
    // Não definir Content-Type para multipart - axios define automaticamente com boundary
});

const httpCommom = {
    mainInstance,
    multipartInstance,
};
export default httpCommom;