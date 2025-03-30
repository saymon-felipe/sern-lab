<template>
    <consoleComponent v-if="!loading" :consoleArray="consoleArray" @executeCommand="fill" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";

export default {
    emits: ["goToNews"],
    data() {
        return {
            currentNode: 0,
            connectionStatus: 1,
            systemLogStatus: 0,
            accessLevel: 0,
            userInput: "",
            consoleArray: [],
            loading: true
        }
    },
    watch: {
        'consoleArray': {
            handler(newValue, oldValue) {
                if (newValue[4].response != null) {
                    this.userInput = newValue[4].response;
                }
            },
            deep: true
        },
        userInput: function () {
            if (this.userInput != null) {
                if (this.userInput == 1) {
                    this.$emit("goToNews");
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
                accessLevel: null
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
        }
    }
}
</script>