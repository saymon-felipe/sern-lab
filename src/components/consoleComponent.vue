<template>
    <div class="console-line" v-for="(row, index) in consoleArrayData" :key="index">
        <span v-if="row.enumerable && row.selected" class="blink select-arrow">&gt;&nbsp;</span>
        <span v-html="row.displayedText + ' ' + (row.response != null && row.response != undefined ? row.response : '')"></span>
        <span class="input" v-if="row.input && row.ready">
            <input type="text" :id="'console-input-' + row.id">
            <p class="blink">█</p>
        </span>
    </div>
</template>
<script>
import $ from 'jquery';
import writting from "../assets/audio/writting.mp3";

export default {
    emits: ["executeCommand", "select"],
    props: ["consoleArray"],
    data() {
        return {
            consoleArrayData: JSON.parse(JSON.stringify(this.consoleArray)), // Clonando para evitar mutações diretas na prop
            inputBuffer: true,
            writeBuffer: 0,
            currentRow: null,
            audio: null,
            soundInterval: null
        };
    },
    watch: {
        inputBuffer: function () {
            if (!this.inputBuffer) {
                this.writeText(this.writeBuffer + 1);
            }
        }
    },
    mounted() {
        if (this.consoleArrayData.length > 0) {
            this.writeText(0);
        }

        $(window).off("keydown").on("keydown", (e) => {
            if (this.isAlphanumeric(e)) {
                $("input").val($("input").val() + e.key);
                this.writeInput();
            } else if (e.key === "Backspace") {
                $("input").val($("input").val().slice(0, -1));
                this.writeInput();
            } else if (e.key === "Enter") {
                if (this.currentRow.input) {
                    if ($("input").val().trim() == "") return;

                    this.currentRow.response = $("input").val();
                    this.$emit("executeCommand", this.currentRow);
                    this.inputBuffer = false;
                    this.writeInput();
                } else if (this.currentRow.enumerable) {
                    this.$emit("select", this.currentRow);
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
            this.consoleArrayData[type == "forward" ? (selectedIndex + 1) : (selectedIndex - 1)].selected = true;
        },
        isAlphanumeric: function (event) {
            const key = event.key;

            return /^[a-zA-Z0-9]$/.test(key);
        },
        writeInput: function () {
            let input = $("input");
            let value = input.val();

            if (value.trim() == "") {
                input.css("width", "10px");
            } else {
                input.css("width", (value.length * 10) + "px");
            }
        },
        writeText(index) {
            if (index >= this.consoleArrayData.length) {
                $(".input").remove();
                return;
            };
            
            this.writeBuffer = index;
            this.currentRow = this.consoleArrayData[index];

            this.currentRow.displayedText = ""; // Inicializa o texto visível como vazio

            $(".input").remove();

            if (this.currentRow.input) {
                this.inputBuffer = true;
            }

            let i = 0;

            this.audio = new Audio(writting); 
            this.audio.play();

            this.soundInterval = setInterval(() => {
                this.audio.currentTime = 0; 
                this.audio.play(); 
            }, 3590)    

            const escrever = () => {
                if (i < this.currentRow.text.length) {
                    this.currentRow.displayedText += this.currentRow.text.charAt(i);
                    i++;
                    setTimeout(escrever, 12);
                } else {
                    this.currentRow.ready = true;

                    clearInterval(this.soundInterval);

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
