<template>
    <consoleComponent :consoleArray="consoleArray" @executeCommand="fill" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";

export default {
    data() {
        return {
            currentNode: 0,
            connectionStatus: 0,
            systemLogStatus: 0,
            userInput: ""
        }
    },
    computed: {
        consoleArray: function () {
            return [
                {
                    id: 0,
                    text: "WELCOME TO THE SERN NODE " + this.currentNode,
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 1,
                    text: "CONNECTION STATUS: " + (this.connectionStatus == 1 ? "[ONLINE]" : "[OFFLINE]"),
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 2,
                    text: "SYSTEM LOG: " + (this.systemLogStatus == 1 ? "LOADED SUCCESSFULLY" : "ERROR"),
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 3,
                    text: 'COMMANDS AVAILABLE: <br><br> 1 - CONNECT "TIMETRAVEL_SERVER" <br> 2 - VIEW "GOVERNMENT_FILES" <br> 3 - ACCESS "SECRET_TRANSMISSIONS" <br> 4 - DISCONNECT <br><br>',
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 4,
                    text: "USER INPUT REQUIRED: ",
                    input: true,
                    ready: false,
                    response: null,
                    displayedText: ""
                }
            ]
        }
    },
    watch: {
        'consoleArray': {
            handler(newValue, oldValue) {
                this.userInput = newValue[3].response;
            },
            deep: true
        },
        userInput: function () {
            if (this.userInput != null) {
                console.log(this.userInput);
            }
        },
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
<style scoped>
.blink {
    display: none;
}

input {
    width: 7px;
}
</style>