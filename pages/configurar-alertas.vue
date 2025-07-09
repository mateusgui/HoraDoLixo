<template>
  <div class="page-container">
    <div class="setup-container">
      <div class="welcome-header">
        <h1>Quase lá, {{ registrationData.nomeCompleto.split(' ')[0] }}!</h1>
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
                <input type="checkbox" v-model="registrationData.alertaComumAtivo">
                <span class="slider round"></span>
              </label>
              <label>Ativar alertas para Coleta Comum</label>
            </div>
            <div v-if="registrationData.alertaComumAtivo" class="time-config">
              <label for="hora-comum">Horário do Alerta:</label>
              <input type="time" id="hora-comum" v-model="registrationData.horarioAlertaComum">
            </div>
          </div>

          <div class="schedule-card" v-if="coletaSeletiva.zona">
            <h2 class="card-title">Coleta Seletiva</h2>
            <p class="card-zone">Sua zona: <strong>{{ coletaSeletiva.zona }}</strong></p>
            <p class="card-schedule">{{ coletaSeletiva.dias }}, a partir das {{ coletaSeletiva.horario }}</p>
            <div class="alert-config">
              <label class="switch">
                <input type="checkbox" v-model="registrationData.alertaSeletivaAtivo">
                <span class="slider round"></span>
              </label>
              <label>Ativar alertas para Coleta Seletiva</label>
            </div>
            <div v-if="registrationData.alertaSeletivaAtivo" class="time-config">
              <label for="hora-seletiva">Horário do Alerta:</label>
              <input type="time" id="hora-seletiva" v-model="registrationData.horarioAlertaSeletiva">
            </div>
          </div>
        </div>

        <div class="finish-setup">
          <button @click="finalizarCadastro" class="btn-primary btn-auto-width" :disabled="isLoading">
            {{ isLoading ? 'Finalizando...' : 'Concluir Cadastro' }}
          </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRegistrationData } from '~/composables/useRegistrationData';
import { reactive, ref } from 'vue';

definePageMeta({
  layout: false,
});

const registrationData = useRegistrationData();

const isLoading = ref(false);
const errorMessage = ref('');

// SIMULAÇÃO DE DADOS DA COLETA
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

const config = useRuntimeConfig();

const finalizarCadastro = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  const apiUrl = `${config.public.apiBaseUrl}/api/Usuario`;

  const payload = {
    NomeCompleto: registrationData.value.nomeCompleto,
    Email: registrationData.value.email,
    Senha: registrationData.value.senha,
    Telefone: registrationData.value.telefone,
    EnderecoRua: registrationData.value.rua,
    EnderecoNumero: registrationData.value.numero,
    EnderecoComplemento: registrationData.value.complemento,
    EnderecoBairro: registrationData.value.bairro,
    Cep: registrationData.value.cep,
  };

  console.log("Enviando para a API:", payload);

  try {
    const responseData = await $fetch(apiUrl, {
      method: 'POST',
      body: payload
    });

    console.log('Usuário criado com sucesso:', responseData);
    alert('Cadastro concluído com sucesso! Bem-vindo(a)!');

    await navigateTo('/home');

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.data && error.data.message) {
      errorMessage.value = error.data.message;
    } else {
      errorMessage.value = 'Ocorreu um erro ao finalizar o cadastro. Tente novamente.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>