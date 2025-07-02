<template>
  <div class="page-container home-page-layout">
    <div class="dashboard-container">
      
      <div v-if="user" class="welcome-header">
        <h1>Olá, {{ user.nomeCompleto.split(' ')[0] }}!</h1>
        <p>Aqui estão as informações de coleta para o seu endereço.</p>
      </div>

      <div v-if="pending" class="loading-feedback">
        <p>Buscando informações de coleta...</p>
      </div>
      
      <div v-if="fetchError" class="error-feedback">
        <p>Não foi possível carregar as informações de coleta. Por favor, tente recarregar a página.</p>
      </div>

      <div v-if="!pending && !fetchError && collectionInfo" class="schedule-cards-container">
        
        <div class="schedule-card" v-if="collectionInfo.coletaComum">
          <h2 class="card-title">Coleta Comum</h2>
          <p class="card-zone">Sua zona: <strong>{{ collectionInfo.coletaComum.nome }}</strong></p>
          <p class="card-schedule">{{ formattedCommonDays }}, a partir das {{ formattedCommonTime }}</p>
          <div class="alert-status">
            <span v-if="user?.alertaComumAtivo">Alerta configurado para as {{ formattedCommonAlertTime }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>

        <div class="schedule-card" v-if="collectionInfo.coletaSeletiva">
          <h2 class="card-title">Coleta Seletiva</h2>
          <p class="card-zone">Sua zona: <strong>{{ collectionInfo.coletaSeletiva.nome }}</strong></p>
          <p class="card-schedule">{{ formattedSelectiveDays }}, a partir das {{ formattedSelectiveTime }}</p>
          <div class="alert-status">
            <span v-if="user?.alertaSeletivaAtivo">Alerta configurado para as {{ user.horarioAlertaSeletiva.substring(0, 5) }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>
        
        <div class="schedule-card unavailable" v-if="!collectionInfo.coletaSeletiva">
          <h2 class="card-title">Coleta Seletiva</h2>
          <p class="card-schedule">Seu endereço ainda não é atendido por este serviço.</p>
        </div>
      </div>

      <div v-if="!pending" class="map-button-container">
        <NuxtLink to="/mapa" class="btn-primary btn-auto-width">Visualizar regiões de coleta no mapa</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthToken, useUser } from '~/composables/useAuth';

const user = useUser();
const authToken = useAuthToken();
const config = useRuntimeConfig();

const formatarDias = (programacao) => {
  if (!programacao || programacao.length === 0) return 'Dias não informados';
  const diasDaSemana = ["", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  const dias = programacao.map(p => diasDaSemana[p.diaSemana]).join(', ');
  return dias.replace(/,([^,]*)$/, ' e' + '$1');
};
const formatarHorario = (programacao) => {
  return programacao?.[0]?.horarioInicioPrevisto?.substring(0, 5) || '??:??';
};

const { data: collectionInfo, pending, error: fetchError } = await useAsyncData(
  'collectionInfo',
  async () => {
    if (!authToken.value || !user.value?.idUsuario) {
      console.log("Usuário não autenticado. Redirecionando...");
      await navigateTo('/login');
      return null;
    }
    
    const apiUrl = `${config.public.apiBaseUrl}/Usuario/${user.value.idUsuario}/coleta`;
    
    return await $fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${authToken.value}`
      }
    });
  },
  { watch: [user] }
);

const formattedCommonDays = computed(() => collectionInfo.value?.coletaComum ? formatarDias(collectionInfo.value.coletaComum.programacao) : '');
const formattedCommonTime = computed(() => collectionInfo.value?.coletaComum ? formatarHorario(collectionInfo.value.coletaComum.programacao) : '');
const formattedCommonAlertTime = computed(() => user.value?.horarioAlertaComum?.substring(0, 5) || '');

const formattedSelectiveDays = computed(() => collectionInfo.value?.coletaSeletiva ? formatarDias(collectionInfo.value.coletaSeletiva.programacao) : '');
const formattedSelectiveTime = computed(() => collectionInfo.value?.coletaSeletiva ? formatarHorario(collectionInfo.value.coletaSeletiva.programacao) : '');
</script>

<style scoped>
.loading-feedback, .error-feedback {
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}
.error-feedback {
  color: #D8000C;
  background-color: #FFD2D2;
  border: 1px solid #D8000C;
  border-radius: 8px;
}
.home-page-layout {
  align-items: flex-start;
}
.welcome-header {
  margin-bottom: 40px;
}
</style>