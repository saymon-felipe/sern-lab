<template>
    <div class="console-line" v-for="(row, index) in consoleArrayData" :key="index">
        <span v-if="row.enumerable && row.selected" class="blink select-arrow">&gt;&nbsp;</span>
        <span v-html="row.displayedText + ' ' + (row.response != null && row.response != undefined ? row.response : '')" style="margin-right: 10px;"></span>
        <span class="input" v-if="row.input && row.ready && inputBuffer">
            <p class="blink" :style="row.response && row.response.length > 0 ? 'margin-left: -10px' : ''">█</p>
        </span>
    </div>
</template>
<script>
import $ from 'jquery';
import writting from "../assets/audio/writting.mp3";

export default {
    emits: ["executeCommand", "select"],
    props: ["consoleArray", "reloadInput"],
    data() {
        return {
            consoleArrayData: JSON.parse(JSON.stringify(this.consoleArray)), // Clonando para evitar mutações diretas na prop
            inputBuffer: false,
            writeBuffer: 0,
            currentRow: null,
            audio: null,
            soundTimeout: null
        };
    },
    watch: {
        inputBuffer: function () {
            if (!this.inputBuffer) {
                this.writeText(this.writeBuffer + 1);
            }
        },
        reloadInput: function () {
            if (this.reloadInput) {
                let index = this.consoleArrayData.findIndex(item => item.id == this.reloadInput);
                this.consoleArrayData[index].response = "";
                this.$nextTick(() => {
                    this.inputBuffer = true;
                })
            }
        }
    },
    mounted() {
        if (this.consoleArrayData.length > 0) {
            this.writeText(0);
        }

        this.selectedObj = this.consoleArrayData.filter((item) => { return item.selected })[0];

        $(window).off("keydown").on("keydown", (e) => {
            if (this.isAlphanumeric(e)) {
                if (!this.currentRow.response) {
                    this.currentRow.response = "";
                }

                this.currentRow.response += e.key;
            } else if (e.key === "Backspace") {
                this.currentRow.response = this.currentRow.response.slice(0, -1);
            } else if (e.key === "Enter") {
                if (this.currentRow.input) {
                    if (this.currentRow.response == undefined || this.currentRow.response != undefined && this.currentRow.response.trim() == "") return;
                    if (this.currentRow.accepted_commands) {
                        this.currentRow["attempts"] = this.currentRow["attempts"] ? this.currentRow["attempts"] + 1 : 1;
                    }

                    if (this.currentRow.accepted_commands && this.currentRow.accepted_commands.some(command => command == this.currentRow.response)) {
                        this.currentRow["triggered_command"] = this.currentRow.response;
                    }

                    this.inputBuffer = false;
                    this.$emit("executeCommand", this.currentRow);
                } else if (this.selectedObj.selected) {
                    this.$emit("select", this.selectedObj);
                }
            } else if (e.key === "ArrowUp") {
                this.navigate("backward");
            } else if (e.key === "ArrowDown") {
                this.navigate("forward");
            }
        })
    },
    methods: {
        navigate: function (type) {
            let selectedIndex = this.consoleArrayData.findIndex((item) => { return item.selected });

            if (selectedIndex == 0 && type == "backward") {
                return;
            }

            if (selectedIndex == this.consoleArrayData.length - 1 && type == "forward") {
                return;
            }

            this.consoleArrayData[selectedIndex].selected = false;
            let nextIndex = type == "forward" ? (selectedIndex + 1) : (selectedIndex - 1);
            this.consoleArrayData[nextIndex].selected = true;
            this.selectedObj = this.consoleArrayData[nextIndex];
        },
        isAlphanumeric: function (event) {
            const key = event.key;

            return /^[a-zA-Z0-9]$/.test(key);
        },
        initAudioWritting: function () {
            this.audio = new Audio(writting); 
            this.audio.play();

            this.soundTimeout = setTimeout(() => {
                this.onEndedAudioWritting();
            }, 3590)    
        },
        onEndedAudioWritting: function () {
            this.audio.currentTime = 0; 
            this.audio.play(); 
            this.soundTimeout = setTimeout(() => {
                this.initAudioWritting();
            }, 3590)    
        },
        writeText(index) {
            if (index >= this.consoleArrayData.length) {
                this.inputBuffer = false;
                return;
            };
            
            this.writeBuffer = index;

            this.currentRow = this.consoleArrayData[index];

            this.currentRow.displayedText = ""; // Inicializa o texto visível como vazio

            this.inputBuffer = false;

            if (this.currentRow.input) {
                this.inputBuffer = true;
            }

            let i = 0;

            this.initAudioWritting();

            const escrever = () => {
                if (i < this.currentRow.text.length) {
                    this.currentRow.displayedText += this.currentRow.text.charAt(i);
                    i++;
                    setTimeout(escrever, 12);
                } else {
                    this.currentRow.ready = true;

                    clearTimeout(this.soundTimeout);

                    this.audio.pause();
                    this.audio = null;

                    if (!this.currentRow.input) {
                        this.writeText(index + 1);
                    }
                }
            };

            escrever();
        }
    }
}
</script>
<style scoped>
.input, .console-line {
    display: flex;
    align-items: center;
    position: relative;
}

.select-arrow {
    position: absolute;
    left: -18px;
}

input {
    width: 10px;
}
</style>
