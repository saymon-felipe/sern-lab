<template>
    <div class="console-line" v-for="(row, index) in consoleArrayData" :key="index">
        <span v-html="row.displayedText + ' ' + (row.response != null && row.response != undefined ? row.response : '')"></span>
        <span class="input" v-if="row.input && row.ready">
            <input type="text" :id="'console-input-' + row.id">
            <p class="blink">█</p>
        </span>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    emits: ["executeCommand"],
    props: ["consoleArray"],
    data() {
        return {
            consoleArrayData: JSON.parse(JSON.stringify(this.consoleArray)), // Clonando para evitar mutações diretas na prop
            inputBuffer: true,
            writeBuffer: 0,
            currentRow: null
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

        $(document).off("keydown").on("keydown", (e) => {
            if (this.isAlphanumeric(e)) {
                $("input").val($("input").val() + e.key);
            } else if (e.key === "Backspace") {
                $("input").val($("input").val().slice(0, -1));
            } else if (e.key === "Enter") {
                this.currentRow.response = $("input").val();
                this.$emit("executeCommand", this.currentRow);
                this.inputBuffer = false;
            }

            this.writeInput();
        })
    },
    methods: {
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

            const escrever = () => {
                if (i < this.currentRow.text.length) {
                    this.currentRow.displayedText += this.currentRow.text.charAt(i);
                    i++;
                    setTimeout(escrever, 40);
                } else {
                    this.currentRow.ready = true;

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
}

input {
    width: 10px;
}
</style>
