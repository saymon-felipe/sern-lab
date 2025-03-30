<template>
    <consoleComponent :consoleArray="consoleArray" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";
import $ from 'jquery';

export default {
    emits: ["back"],
    data() {
        return {
            currentNode: 0,
            connectionStatus: 1,
            systemLogStatus: 0,
            accessLevel: localStorage.getItem("access_level") || 0
        }
    },
    props: ["noticeDetails"],
    computed: {
        consoleArray: function () {
            return [
                {
                    id: 0,
                    text: this.noticeDetails.obj,
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 1,
                    text: "<br><br><br><br><br><br><br>ESC = Retornar",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
            ]
        }
    },
    mounted: function () {
        $(document).on("keydown", (e) => {
            if (e.key === "Escape") {
                this.$emit("back");
            }
        })
    },
    components: {
        consoleComponent
    }
}
</script>