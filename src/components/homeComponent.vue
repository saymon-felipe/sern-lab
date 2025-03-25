<template>
    <h1>SERN - Quantum research</h1>

    <span id="welcome">WELCOME TO THE SERN NODE {{ currentNode }}</span>
    
    <br><br>

    <span id="connection-status">CONNECTION STATUS: {{ connectionStatus == 1 ? "[ONLINE]" : "[OFFLINE]" }}</span>
    
    <br><br>

    <span id="system-log">SYSTEM LOG: {{ systemLogStatus == 1 ? "LOADED SUCCESSFULLY" : "ERROR" }}</span>

    <br><br>

    <p style="display: flex; align-items: center;"><span id="user-input">USER INPUT REQUIRED: </span> <input type="text" v-model="userInput" maxlength="1"><p class="blink">█</p></p>

    <br><br>

    <p v-if="show">
        COMMANDS AVAILABLE: <br><br>
        1 - CONNECT "TIMETRAVEL_SERVER" <br>
        2 - VIEW "GOVERNMENT_FILES" <br>
        3 - ACCESS "SECRET_TRANSMISSIONS" <br>
        4 - DISCONNECT
    </p>
    
    <br><br>

    <span v-if="show">PLEASE ENTER A COMMAND:</span>
</template>
<script>
import $ from 'jquery';

export default {
    data() {
        return {
            currentNode: 0,
            connectionStatus: 0,
            systemLogStatus: 0,
            userInput: "",
            show: false
        }
    },
    mounted: function () {
        this.$writeText("#welcome").then(() => {
            this.currentNode = 45;
            this.$writeText("#connection-status").then(() => {
                this.connectionStatus = 1;
                this.$writeText("#system-log").then(() => {
                    this.systemLogStatus = 1;
                    this.$writeText("#user-input").then(() => {
                        this.show = true;
                        $(".blink").show();
                        $("input").focus();
                    })
                })
            })
        })
    }
}
</script>
<style scoped>
span {
    display: inline-block;
    opacity: 0;
}
.blink {
    display: none;
}

input {
    all: unset;
    caret-color: transparent;
    width: 7px;
    margin-left: 7px;
}
</style>