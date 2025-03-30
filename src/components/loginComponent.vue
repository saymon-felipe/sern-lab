<template>
    <consoleComponent v-if="!loading" :consoleArray="consoleArray" @executeCommand="fill" />
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
            password: null,
            authenticated: localStorage.getItem("username") != null && localStorage.getItem("password") != null,
            loginAction: null,
            loading: true
        }
    },
    mounted: function () {
        if (this.authenticated) {
            this.consoleArray.unshift(
                {
                    id: 999,
                    text: "OLA [" + localStorage.getItem("username") + "], DESEJA DESCONECTAR? (S/N)",
                    input: true,
                    ready: false,
                    response: null,
                    displayedText: ""
                }
            )
        } 

        this.loading = false;
    },
    watch: {
        'consoleArray': {
            handler(newValue, oldValue) {
                if (this.authenticated) {
                    this.loginAction = newValue[0].response;
                } else {
                    this.username = newValue[0].response;
                    this.password = newValue[1].response;
                }
            },
            deep: true
        },
        loginAction: function () {
            if (this.loginAction == "S" || this.loginAction == "s") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                location.reload();
            } else if (this.loginAction == "N" || this.loginAction == "n") {
                this.$emit("go");
            }
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