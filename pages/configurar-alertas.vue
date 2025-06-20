<template>
  <div class="page-container">
    <div class="setup-container">
      <div class="welcome-header">
        <h1>Quase lá, Mateus!</h1>
        <p>Identificamos as coletas para o seu endereço. Agora, configure seus alertas para não perder o dia!</p>
      </div>

      <div class="main-content-area">

        <div class="schedule-cards-container">
          <div class="schedule-card" v-if="coletaComum.zona">
            <h2 class="card-title">Coleta Comum</h2>
            <p class="card-zone">Sua zona: <strong>{{ coletaComum.zona }}</strong></p>
            <p class="card-schedule">{{ coletaComum.dias }}, a partir das {{ coletaComum.horario }}</p>
            <div class="alert-config">
              <label class="switch">
                <input type="checkbox" v-model="alertaComum.ativo">
                <span class="slider round"></span>
              </label>
              <label>Ativar alertas para Coleta Comum</label>
            </div>
            <div v-if="alertaComum.ativo" class="time-config">
              <label for="hora-comum">Horário do Alerta:</label>
              <input type="time" id="hora-comum" v-model="alertaComum.horario">
            </div>
          </div>
          <div class="schedule-card" v-if="coletaSeletiva.zona">
            <h2 class="card-title">Coleta Seletiva</h2>
            <p class="card-zone">Sua zona: <strong>{{ coletaSeletiva.zona }}</strong></p>
            <p class="card-schedule">{{ coletaSeletiva.dias }}, a partir das {{ coletaSeletiva.horario }}</p>
             <div class="alert-config">
              <label class="switch">
                <input type="checkbox" v-model="alertaSeletiva.ativo">
                <span class="slider round"></span>
              </label>
              <label>Ativar alertas para Coleta Seletiva</label>
            </div>
            <div v-if="alertaSeletiva.ativo" class="time-config">
              <label for="hora-seletiva">Horário do Alerta:</label>
              <input type="time" id="hora-seletiva" v-model="alertaSeletiva.horario">
            </div>
          </div>
          <div class="schedule-card unavailable" v-if="!coletaSeletiva.zona">
            <h2 class="card-title">Coleta Seletiva</h2>
            <p class="card-schedule">Seu endereço ainda não é atendido pela coleta seletiva.</p>
          </div>
        </div>

        <div class="finish-setup">
          <button @click="finalizarCadastro" class="btn-primary btn-auto-width">Concluir Cadastro</button>
        </div>

      </div> </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const coletaComum = reactive({
  zona: 'REGIÃO 02',
  dias: 'Segundas, Quartas e Sextas-feiras',
  horario: '19:00'
});

const coletaSeletiva = reactive({
  zona: 'coleta_seletiva_12',
  dias: 'Sextas-feiras',
  horario: '18:00' // Período noturno
});

const alertaComum = reactive({
  ativo: false,
  horario: '17:00'
});

const alertaSeletiva = reactive({
  ativo: false,
  horario: '17:00'
});


const finalizarCadastro = () => {
  console.log('Cadastro finalizado com as seguintes preferências de alerta:');
  console.log('Alerta Comum:', alertaComum);
  console.log('Alerta Seletiva:', alertaSeletiva);
  alert('Cadastro e configuração de alertas concluídos! (Verifique o console)');
};

</script>