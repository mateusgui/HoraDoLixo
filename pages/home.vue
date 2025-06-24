<template>
  <div class="page-container">
    <div class="dashboard-container">

      <div class="schedule-cards-container">
        
        <div class="schedule-card" v-if="coletaComum.zona">
          <h2 class="card-title">Coleta Comum</h2>
          <p class="card-zone">Sua zona: <strong>{{ coletaComum.zona }}</strong></p>
          <p class="card-schedule">{{ coletaComum.dias }}, a partir das {{ coletaComum.horario }}</p>
          
          <div class="alert-status">
            <span v-if="alertaComum.ativo">Alerta configurado para as {{ alertaComum.horario }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>

        <div class="schedule-card" v-if="coletaSeletiva.zona">
          <h2 class="card-title">Coleta Seletiva</h2>
          <p class="card-zone">Sua zona: <strong>{{ coletaSeletiva.zona }}</strong></p>
          <p class="card-schedule">{{ coletaSeletiva.dias }}, a partir das {{ coletaSeletiva.horario }}</p>

          <div class="alert-status">
            <span v-if="alertaSeletiva.ativo">Alerta configurado para as {{ alertaSeletiva.horario }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>
         
        <div class="schedule-card unavailable" v-if="!coletaSeletiva.zona">
            <h2 class="card-title">Coleta Seletiva</h2>
            <p class="card-schedule">Seu endereço ainda não é atendido por este serviço.</p>
        </div>

      </div>

      <div class="map-button-container">
        <NuxtLink to="/mapa" class="btn-primary btn-auto-width">Visualizar regiões de coleta no mapa</NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Simulação de dados que virão do backend
const coletaComum = reactive({
  zona: 'REGIÃO 02',
  dias: 'Segundas, Quartas e Sextas-feiras',
  horario: '19:00'
});

const coletaSeletiva = reactive({
  zona: 'coleta_seletiva_12',
  dias: 'Sextas-feiras',
  horario: '18:00'
});

const alertaComum = reactive({
  ativo: true,
  horario: '18:00'
});

const alertaSeletiva = reactive({
  ativo: false,
  horario: '17:00'
});
</script>