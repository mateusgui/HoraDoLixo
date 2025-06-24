<template>
  <div class="page-container-profile">
    <div class="profile-card">
      <h1>Meu Perfil</h1>
      <p class="profile-subtitle">Gerencie suas informações pessoais, endereço e preferências de alerta.</p>

      <form @submit.prevent="salvarAlteracoes">
        <fieldset class="profile-fieldset">
          <legend>Dados Pessoais</legend>
          <div class="data-item">
            <label>Nome Completo</label>
            <p v-if="!isEditing" class="data-value">{{ usuario.nomeCompleto }}</p>
            <input v-else type="text" v-model="usuario.nomeCompleto" class="input-edit">
          </div>
          <div class="data-item">
            <label>E-mail</label>
            <p v-if="!isEditing" class="data-value">{{ usuario.email }}</p>
            <input v-else type="email" v-model="usuario.email" class="input-edit">
          </div>
          <div class="data-item">
            <label>Telefone</label>
            <p v-if="!isEditing" class="data-value">{{ usuario.telefone }}</p>
            <input v-else type="tel" v-model="usuario.telefone" class="input-edit">
          </div>
        </fieldset>

        <fieldset class="profile-fieldset">
          <legend>Endereço</legend>
          <div class="data-item">
            <label>Endereço de Coleta</label>
            <p v-if="!isEditing" class="data-value">{{ enderecoFormatado }}</p>
            <div v-else class="address-inputs">
              <div class="input-group-profile">
                <label for="rua">Rua / Avenida</label>
                <input type="text" id="rua" v-model="usuario.rua" class="input-edit">
              </div>
              <div class="input-group-profile">
                <label for="numero">Número</label>
                <input type="text" id="numero" v-model="usuario.numero" class="input-edit">
              </div>
              <div class="input-group-profile">
                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" v-model="usuario.bairro" class="input-edit">
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="profile-fieldset">
          <legend>Minhas Coletas e Alertas</legend>
          <div class="schedule-cards-container-profile">
            <div class="info-card-profile" v-if="coletaComum.zona">
              <h2 class="card-title">Coleta Comum</h2>
              <p class="card-zone">Sua zona: <strong>{{ coletaComum.zona }}</strong></p>
              <p class="card-schedule">{{ coletaComum.dias }}, a partir das {{ coletaComum.horario }}</p>
              
              <div v-if="!isEditing" class="alert-status">
                <span v-if="alertaComum.ativo">Alerta configurado para as {{ alertaComum.horario }}</span>
                <span v-else class="status-inactive">Alerta não configurado</span>
              </div>
              
              <div v-else>
                <div class="alert-config-box">
                  <label class="switch"><input type="checkbox" v-model="alertaComum.ativo"><span class="slider round"></span></label>
                  <label>Ativar alerta</label>
                </div>
                <div v-if="alertaComum.ativo" class="time-config">
                  <label for="hora-comum">Horário:</label>
                  <input type="time" id="hora-comum" v-model="alertaComum.horario">
                </div>
              </div>
            </div>

            <div class="info-card-profile" v-if="coletaSeletiva.zona">
               <h2 class="card-title">Coleta Seletiva</h2>
               <p class="card-zone">Sua zona: <strong>{{ coletaSeletiva.zona }}</strong></p>
               <p class="card-schedule">{{ coletaSeletiva.dias }}, a partir das {{ coletaSeletiva.horario }}</p>
              <div v-if="!isEditing" class="alert-status">
                <span v-if="alertaSeletiva.ativo">Alerta configurado para as {{ alertaSeletiva.horario }}</span>
                <span v-else class="status-inactive">Alerta não configurado</span>
              </div>
              <div v-else>
                <div class="alert-config-box">
                    <label class="switch"><input type="checkbox" v-model="alertaSeletiva.ativo"><span class="slider round"></span></label>
                    <label>Ativar alerta</label>
                </div>
                <div v-if="alertaSeletiva.ativo" class="time-config">
                  <label for="hora-seletiva">Horário:</label>
                  <input type="time" id="hora-seletiva" v-model="alertaSeletiva.horario">
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="actions-container">
          <button v-if="!isEditing" type="button" @click="entrarModoEdicao" class="btn-primary-profile">Editar Dados e Alertas</button>
          <div v-else class="edit-actions">
            <button type="button" @click="cancelarEdicao" class="btn-secondary-profile">Cancelar</button>
            <button type="submit" class="btn-primary-profile">Salvar Alterações</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const isEditing = ref(false);

// SIMULAÇÃO DE DADOS
const usuario = reactive({
  nomeCompleto: 'Mateus Guimarães Moraes Vilela',
  email: 'mateus.vilela@exemplo.com',
  telefone: '(67) 99999-8888',
  rua: 'Avenida Afonso Pena',
  numero: '123',
  bairro: 'Centro',
});

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

const alertaComum = reactive({ ativo: true, horario: '18:00' });
const alertaSeletiva = reactive({ ativo: false, horario: '17:00' });

// Guarda uma cópia dos dados originais para o "cancelar"
let dadosOriginais = {};
let alertasOriginais = {};

const enderecoFormatado = computed(() => {
  return `${usuario.rua}, ${usuario.numero} - ${usuario.bairro}`;
});

const entrarModoEdicao = () => {
  // Salva o estado atual antes de começar a editar
  dadosOriginais = { ...usuario };
  alertasOriginais = {
    comum: { ...alertaComum },
    seletiva: { ...alertaSeletiva }
  };
  isEditing.value = true;
};

const cancelarEdicao = () => {
  // Restaura os dados originais
  Object.assign(usuario, dadosOriginais);
  Object.assign(alertaComum, alertasOriginais.comum);
  Object.assign(alertaSeletiva, alertasOriginais.seletiva);
  isEditing.value = false;
};

const salvarAlteracoes = () => {
  console.log('Salvando dados do usuário:', usuario);
  console.log('Salvando configuração de alertas:', { comum: alertaComum, seletiva: alertaSeletiva });
  alert('Alterações salvas com sucesso!');
  isEditing.value = false; // Volta para o modo de visualização
};
</script>

<style scoped>

.page-container-profile {
  padding: 40px 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.profile-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 900px;
  padding: 40px;
  box-sizing: border-box;
}

.profile-card h1, .profile-subtitle {
  text-align: center;
}
.profile-card h1 { margin-top: 0; margin-bottom: 8px; color: #333; }
.profile-subtitle { margin-top: 0; margin-bottom: 40px; color: #666; }

.profile-fieldset {
  border: none;
  border-top: 1px solid #eee;
  padding: 25px 0;
  margin: 0 0 25px 0;
}

.profile-fieldset legend {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3149BC;
  padding-right: 15px;
}

.data-item { margin-bottom: 20px; }
.data-item:last-child { margin-bottom: 0; }
.data-item label { font-size: 0.9rem; color: #888; margin-bottom: 4px; display: block; }
.data-item .data-value { font-size: 1.1rem; color: #333; margin: 0; }

.input-edit {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 4px;
}

.address-inputs .input-group-profile { margin-bottom: 10px; }
.address-inputs .input-group-profile:last-child { margin-bottom: 0; }
.address-inputs .input-group-profile label { font-size: 0.9rem; color: #555; }

.schedule-cards-container-profile {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.info-card-profile {
  background-color: #fdfdfd;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  flex: 1;
  min-width: 280px;
  text-align: center;
}
.card-title { margin-top: 0; font-size: 1.3rem; color: #3149BC;}
.card-zone { font-size: 0.8rem; color: #666; margin-top: -10px;}
.card-schedule { font-size: 1rem; font-weight: 500; color: #333; min-height: 40px; }
.alert-status { margin-top: 15px; padding-top: 15px; border-top: 1px solid #f0f0f0; font-weight: 500; }
.alert-status .status-inactive { color: #888; font-style: italic; }
.alert-config-box { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 15px; }
.time-config { margin-top: 10px; }

.actions-container {
  margin-top: 30px;
  text-align: right;
}
.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
.btn-primary-profile {
  width: auto;
  padding: 12px 30px;
  background-color: #3149BC;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary-profile:hover {
  background-color: #283e9e;
}
.btn-secondary-profile {
  width: auto;
  padding: 12px 30px;
  background-color: #f0f2f5;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.btn-secondary-profile:hover {
  background-color: #e2e6ea;
}

.switch { position: relative; display: inline-block; width: 50px; height: 28px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
input:checked + .slider { background-color: #3149BC; }
input:checked + .slider:before { transform: translateX(22px); }
.slider.round { border-radius: 28px; }
.slider.round:before { border-radius: 50%; }
</style>