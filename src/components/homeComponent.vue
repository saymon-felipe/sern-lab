<template>
    <consoleComponent v-if="!loading" :consoleArray="consoleArray" @executeCommand="fill" :reloadInput="reloadInput" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";

export default {
    emits: ["goToNews", "blockedAccess"],
    data() {
        return {
            currentNode: 0,
            connectionStatus: 1,
            systemLogStatus: 0,
            accessLevel: 0,
            userInput: "",
            consoleArray: [],
            loading: true,
            triggered_command: "",
            attempts: 0,
            reloadInput: null
        }
    },
    watch: {
        'consoleArray': {
            handler(newValue, oldValue) {
                if (newValue[4].response != null) {
                    this.userInput = newValue[4].response;

                    if (newValue[4].triggered_command == "override access") {
                        this.triggered_command = newValue[4].triggered_command;
                    }

                    if (newValue[4].attempts) { 
                        this.attempts = newValue[4].attempts;
                    }
                }
            },
            deep: true
        },
        userInput: function () {
            if (this.userInput != null) {
                if (this.attempts >= 5) {
                    this.blockAccess();
                } else {
                    if (this.triggered_command == "override access") {
                        this.tentativas++;
                    }
                }

                if (this.userInput == 1) {
                    this.tentativas = 0;
                    this.consoleArray[4].attempts = 0;
                    this.reloadInput = false;
                    this.$emit("goToNews");
                } else {
                    this.consoleArray[4].triggered_command = "";
                    this.consoleArray[4].response = "";
                    this.reloadInput = null;
                    
                    this.$nextTick(() => {
                        this.reloadInput = this.consoleArray[4].id;
                    })
                }
            }
        },
    },
    mounted: function () {
        this.consoleArray = [
            {
                id: 0,
                text: "BEM VINDO AO TERMINAL SERN " + this.currentNode,
                input: false,
                ready: false,
                response: null,
                displayedText: "",
                accessLevel: null
            },
            {
                id: 1,
                text: "STATUS DE CONEXAO: " + (this.connectionStatus == 1 ? "[ONLINE]" : "[OFFLINE]"),
                input: false,
                ready: false,
                response: null,
                displayedText: "",
                accessLevel: null
            },
            {
                id: 2,
                text: "NIVEL DE ACESSO: " + (this.accessLevel == 0 ? "PUBLICO" : ""),
                input: false,
                ready: false,
                response: null,
                displayedText: "",
                accessLevel: null
            },
            {
                id: 3,
                text: '<br> COMANDOS DISPONIVEIS: <br><br> 1 - VER NOTICIAS <br><br>',
                input: false,
                ready: false,
                response: null,
                displayedText: "",
                accessRequired: 0
            },
            {
                id: 4,
                text: "ENTRADA DO USUARIO NECESSARIA: ",
                input: true,
                ready: false,
                response: null,
                displayedText: "",
                accessLevel: null,
                accepted_commands: ["override access"],
                attempts: 0
            }
        ]

        this.loading = false;
    },
    components: {
        consoleComponent
    },
    methods: {
        fill: function (event) {
            let index = this.consoleArray.findIndex((item) => { return item.id == event.id });
            this.consoleArray[index].response = event.response;
            this.consoleArray[index].attempts = event.attempts;
            this.consoleArray[index].triggered_command = event.triggered_command;
        },
        blockAccess: function () {
            this.$emit("blockedAccess");
        }
    }
}
</script>