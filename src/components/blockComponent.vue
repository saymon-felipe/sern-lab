<template>
    <consoleComponent :consoleArray="consoleArray" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";

export default {
    emits: ["back"],
    data() {
        return {
            currentNode: 0,
            connectionStatus: 1,
            systemLogStatus: 0,
            accessLevel: localStorage.getItem("access_level") || 0,
            ip: 0
        }
    },
    props: ["noticeDetails"],
    computed: {
        consoleArray: function () {
            return [
                {
                    id: 0,
                    text: "<br> ALERTA: Intrusao detectada do IP " + this.ip,
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 1,
                    text: "<br> Escaneando acesso nao autorizado...",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 2,
                    text: "<br> AVISO: Atividade anomala detectada no setor /root/sys/secure_logs",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 3,
                    text: "<br> Rastreando origem...",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 4,
                    text: "<br> Fonte identificada: Sessao de terminal nao reconhecida ID " + this.currentNode,
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 5,
                    text: "<br> Executando contramedidas...",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 6,
                    text: "<br> Substituicao do firewall iniciada...",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 7,
                    text: "<br> Privilegios de acesso revogados para SESSAO" + this.currentNode,
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 8,
                    text: "<br> Bloqueando conexao nao autorizada...",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 9,
                    text: "<br> CONEXAO TERMINADA",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 10,
                    text: "<br> BLOQUEIO DO SISTEMA ATIVADO",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 11,
                    text: "<br> ERRO 451: Acesso Negado – Protocolo de Seguranca Ativado",
                    input: false,
                    ready: false,
                response: null,
                displayedText: ""
            }
            ]
        }
    },
    mounted: function () {
        let self = this;

        fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            self.ip = data.ip;
        })
        .catch(error => console.error("Erro ao obter IP:", error));
    },
    components: {
        consoleComponent
    }
}
</script>