<template>
    <consoleComponent :consoleArray="consoleArray" @executeCommand="fill" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";

export default {
    emits: ["go"],
    data() {
        return {
            consoleArray: [
                {
                    id: 0,
                    text: "USERNAME: ",
                    input: true,
                    ready: false,
                    response: null,
                    displayedText: ""
                },
                {
                    id: 1,
                    text: "PASSWORD: ",
                    input: true,
                    ready: false,
                    response: null,
                    displayedText: ""
                }
            ],
            requirePassword: false,
            username: null,
            password: null
        }
    },
    watch: {
        'consoleArray': {
            handler(newValue, oldValue) {
                this.username = newValue[0].response;
                this.password = newValue[1].response;
            },
            deep: true
        },
        username: function () {
            if (this.username != null) {
                localStorage.setItem("username", this.username);
            }
        },
        password: async function () {
            if (this.password != null) {
                let hash = await this.hashPassword(this.password);
                localStorage.setItem("password", hash);
                this.$emit("go");
            }
        }
    },
    methods: {
        async hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);

            const hashBuffer = await crypto.subtle.digest('SHA-256', data);

            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        },
        fill: function (event) {
            let index = this.consoleArray.findIndex((item) => { return item.id == event.id });
            this.consoleArray[index].response = event.response;
        }
    },
    components: {
        consoleComponent
    }
}
</script>