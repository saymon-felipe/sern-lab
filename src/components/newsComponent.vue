<template>
    <consoleComponent :consoleArray="consoleArray" @select="selectNoticeFunction" />
</template>
<script>
import consoleComponent from "./consoleComponent.vue";
import $ from 'jquery';

export default {
    emits: ["selectNotice", "back"],
    data() {
        return {
            currentNode: 0,
            connectionStatus: 1,
            systemLogStatus: 0,
            accessLevel: localStorage.getItem("access_level") || 0
        }
    },
    computed: {
        consoleArray: function () {
            return [
                {
                    id: 0,
                    text: "- NOVA DESCOBERTA EM FLUTUACOES QUANTICAS - 18/08/2010 <br>",
                    obj: "CIENTISTAS DA SERN PUBLICARAM UME STUDO SOBRE A RELACAO ENTRE FLUTUACOES QUANTICAS E DISTORCOES GRAVITACIONAIS EM ESCALA SUBATOMICA. <br><br> OS EXPERIMENTOS INDICAM QUE, SOB CERTAS CONDICOES, PARTICULAS PODEM APRESENTAR VARIACOES ANOMALAS DE POSICAO SEM INFLUENCIA EXTERNA. A PESQUISA PODE LEVAR A AVANCOS EM TECNOLOGIAS DE CONTENCAO DE ENERGIA",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: "",
                    accessLevel: null,
                    enumerable: true,
                    selected: true,
                    accessRequired: 0
                },
                {
                    id: 1,
                    text: "- SUPERCOMPUTADOR DA SERN PASSA POR ATUALIZACAO - 05/06/2010 <br>",
                    obj: "O SUPERCOMPUTADOR IBN-55100, UTILIZADO PARA SIMULACOES QUANTICAS AVANCADAS, RECEBEU UM UPGRADE PARA AUMENTAR SUA CAPACIDADE DE PROCESSAMENTO <br><br> A NOVA ARQUITETURA PROMETE DOBRAR A EFICIENCIA NA ANALISE DE DADOS SOBRE PARTICULAS DE ALTA ENERGIA. O SISTEMA AGORA SUPORTA 10^21 CALCULOS POR SEGUNDO",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: "",
                    accessLevel: null,
                    enumerable: true,
                    selected: false,
                    accessRequired: 0
                },
                {
                    id: 2,
                    text: "- EQUIPE DE PESQUISADORES APRESENTANOVO MODELO DE SINGULARIDADE - 12/03/2010 <br>",
                    obj: "UM GRUPO DE FISICOS PROPOS UM NOVO MODELO MATEMATICO PARA PREVER SINGULARIDADES TEMPORAIS EM AMBIENTES DE ALTA DENSIDADE ENERGETICA. <br><br> SEGUNDO OS PESQUISADORES, CERTOS FENOMENOS OBSERVADOS SUGEREM QUE O TEMPO PODE SER AFETADO EM ESCALAS MENORES DO QUE SE PENSAVA ANTERIORMENTE. A SERN PRETENDE REALIZAR TESTES PARA VALIDAR AS TEORIAS APRESENTADAS",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: "",
                    accessLevel: null,
                    enumerable: true,
                    selected: false,
                    accessRequired: 0
                },
                {
                    id: 3,
                    text: '- PROGRAMA DE BOLSAS DE ESTUDO DA SERN ABRE NOVAS INSCRICOES - 22/09/2009 <br>',
                    obj: "A SERN ANUNCIOU UM NOVO CICLO DE INSCRICOES PARA ESTUDANTES INTERESSADOS EM PESQUISAS QUANTICAS E FÍSICA DE PARTTICULAS. <br><br> OS APROVADOS TERAO ACESSO AS INSTALACOES DA SERN E PODERAO ACOMPANHAR EXPERIMENTOS CONDUZIDOS POR ESPECIALISTAS DA AREA. O PROGRAMA VISA INCENTIVAR O AVANCO DA CIENCIA E ATRAIR NOVOS TALENTOS",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: "",
                    enumerable: true,
                    selected: false,
                    accessRequired: 0
                },
                {
                    id: 4,
                    text: '- FREQUENCIAS ANOMALAS DETECTADAS EM TESTES EXPERIMENTAIS - 30/04/2009 <br>',
                    obj: "DURANTE UMA ROTINA DE CALIBRACAO NO ACELERADOR DE PARTICULAS, CIENTISTAS REGISTRARAM FLUTUACOES INESPERADAS EM UMA DAS FREQUENCIAS MONITORADAS. <br><br> AS VARIACOES NAO PUDERAM SER REPRODUZIDAS E, SEGUNDO OS PESQUISADORES, PODEM TER SIDO APENAS RUIDO NO SISTEMA. NO ENTANTO, RELATORIOS INTERNOS APONTAM QUE UM PADRAO SEMELHANTE JA FOI OBSERVADO ANTERIORMENTE, MAS SEM EXPLICACAO CONCLUSIVA <br><br><br><br> <span class='blink two'>4C-19X<span>",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: "",
                    enumerable: true,
                    selected: false,
                    accessRequired: 0
                },
                {
                    id: 1,
                    text: "<br><br><br><br><br><br><br>ESC = Retornar",
                    input: false,
                    ready: false,
                    response: null,
                    displayedText: ""
                }
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
    watch: {
    },
    components: {
        consoleComponent
    },
    methods: {
        selectNoticeFunction: function (event) {
            this.$emit("selectNotice", event);
        }
    }
}
</script>