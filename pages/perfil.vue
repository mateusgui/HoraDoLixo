<template>
  <div class="page-container-profile">
    <div v-if="pending" class="loading-feedback">
      <p>Carregando seu perfil...</p>
    </div>

    <div v-else-if="error" class="error-feedback">
      <p>Ocorreu um erro ao carregar seus dados. Por favor, tente recarregar a página.</p>
    </div>

    <div v-else-if="userData" class="profile-card">
      <h1>Meu Perfil</h1>
      <p class="profile-subtitle">Gerencie suas informações pessoais, endereço e preferências de alerta.</p>

      <form @submit.prevent="salvarAlteracoes">
        <fieldset class="profile-fieldset">
          <legend>Dados Pessoais</legend>
          <div class="data-item">
            <label>Nome Completo</label>
            <p v-if="!isEditing" class="data-value">{{ userData.nomeCompleto }}</p>
            <input v-else type="text" v-model="formEdit.nomeCompleto" class="input-edit" disabled>
          </div>
          <div class="data-item">
            <label>E-mail</label>
            <p v-if="!isEditing" class="data-value">{{ userData.email }}</p>
            <input v-else type="email" v-model="formEdit.email" class="input-edit" disabled>
          </div>
          <div class="data-item">
            <label>Telefone</label>
            <p v-if="!isEditing" class="data-value">{{ userData.telefone || 'Não informado' }}</p>
            <input v-else type="tel" v-model="formEdit.telefone" class="input-edit">
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
                <input type="text" id="rua" v-model="formEdit.enderecoRua" class="input-edit" required>
              </div>
              <div class="input-group-profile">
                <label for="numero">Número</label>
                <input type="text" id="numero" v-model="formEdit.enderecoNumero" class="input-edit" required>
              </div>
              <div class="input-group-profile">
                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" v-model="formEdit.enderecoBairro" class="input-edit" required>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="profile-fieldset">
          <legend>Minhas Coletas e Alertas</legend>
          <div class="schedule-cards-container-profile">
            <div class="info-card-profile" v-if="collectionInfo?.coletaComum">
              <h2 class="card-title">Coleta Comum</h2>
              <p class="card-zone">Sua zona: <strong>{{ collectionInfo.coletaComum.nome }}</strong></p>
              <p class="card-schedule">{{ formatarDias(collectionInfo.coletaComum.programacao) }}, a partir das {{ formatarHorario(collectionInfo.coletaComum.programacao) }}</p>
              
              <div v-if="!isEditing" class="alert-status">
                <span v-if="userData.alertaComumAtivo">Alerta configurado para as {{ formatTime(userData.horarioAlertaComum) }}</span>
                <span v-else class="status-inactive">Alerta não configurado</span>
              </div>
              
              <div v-else>
                <div class="alert-config-box">
                  <label class="switch"><input type="checkbox" v-model="formEdit.alertaComumAtivo"><span class="slider round"></span></label>
                  <label>Ativar alerta</label>
                </div>
                <div v-if="formEdit.alertaComumAtivo" class="time-config">
                  <label for="hora-comum">Horário:</label>
                  <input type="time" id="hora-comum" v-model="formEdit.horarioAlertaComum">
                </div>
              </div>
            </div>

            <div class="info-card-profile" v-if="collectionInfo?.coletaSeletiva">
               <h2 class="card-title">Coleta Seletiva</h2>
               <p class="card-zone">Sua zona: <strong>{{ collectionInfo.coletaSeletiva.nome }}</strong></p>
               <p class="card-schedule">{{ formatarDias(collectionInfo.coletaSeletiva.programacao) }}, a partir das {{ formatarHorario(collectionInfo.coletaSeletiva.programacao) }}</p>
              <div v-if="!isEditing" class="alert-status">
                <span v-if="userData.alertaSeletivaAtivo">Alerta configurado para as {{ formatTime(userData.horarioAlertaSeletiva) }}</span>
                <span v-else class="status-inactive">Alerta não configurado</span>
              </div>
              <div v-else>
                <div class="alert-config-box">
                    <label class="switch"><input type="checkbox" v-model="formEdit.alertaSeletivaAtivo"><span class="slider round"></span></label>
                    <label>Ativar alerta</label>
                </div>
                <div v-if="formEdit.alertaSeletivaAtivo" class="time-config">
                  <label for="hora-seletiva">Horário:</label>
                  <input type="time" id="hora-seletiva" v-model="formEdit.horarioAlertaSeletiva">
                </div>
              </div>
            </div>

             <div class="info-card-profile unavailable" v-if="!collectionInfo?.coletaSeletiva">
              <h2 class="card-title">Coleta Seletiva</h2>
              <p class="card-schedule">Seu endereço ainda não é atendido por este serviço.</p>
            </div>
          </div>
        </fieldset>

        <div class="actions-container">
          <p v-if="saveError" class="error-message">{{ saveError }}</p>
          <button v-if="!isEditing" type="button" @click="entrarModoEdicao" class="btn-primary-profile">Editar Dados e Alertas</button>
          <div v-else class="edit-actions">
            <button type="button" @click="cancelarEdicao" class="btn-secondary-profile" :disabled="isSaving">Cancelar</button>
            <button type="submit" class="btn-primary-profile" :disabled="isSaving">
              {{ isSaving ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useAuthToken, useUser } from '~/composables/useAuth';

// Acessa o estado global de autenticação
const user = useUser();
const authToken = useAuthToken();
const config = useRuntimeConfig();

// Estado local da página
const isEditing = ref(false);
const isSaving = ref(false);
const saveError = ref('');

// Cópia dos dados do usuário para o formulário de edição
const formEdit = reactive({
  telefone: '',
  enderecoRua: '',
  enderecoNumero: '',
  enderecoComplemento: '',
  enderecoBairro: '',
  cep: '',
  alertaComumAtivo: false,
  horarioAlertaComum: '18:00',
  alertaSeletivaAtivo: false,
  horarioAlertaSeletiva: '18:00',
});


// --- BUSCA DE DADOS INICIAIS ---
const { data: initialData, pending, error, refresh } = await useAsyncData(
  'profileData',
  async () => {
    if (!user.value || !authToken.value) {
      await navigateTo('/login');
      return null;
    }
    
    const userApiUrl = `${config.public.apiBaseUrl}/Usuario/${user.value.idUsuario}`;
    const collectionApiUrl = `${config.public.apiBaseUrl}/Usuario/${user.value.idUsuario}/coleta`;

    try {
      const [userDataResponse, collectionDataResponse] = await Promise.all([
        $fetch(userApiUrl, { headers: { 'Authorization': `Bearer ${authToken.value}` } }),
        $fetch(collectionApiUrl, { headers: { 'Authorization': `Bearer ${authToken.value}` } })
      ]);
      return { userData: userDataResponse, collectionData: collectionDataResponse };
    } catch (e) {
      console.error("Erro ao buscar dados do perfil:", e);
      return null;
    }
  }, { watch: [user] }
);

// Propriedades computadas para exibir dados do estado inicial
const userData = computed(() => initialData.value?.userData);
const collectionInfo = computed(() => initialData.value?.collectionData);

const enderecoFormatado = computed(() => {
  if (!userData.value) return '';
  const u = userData.value;
  return `${u.enderecoRua}, ${u.enderecoNumero} - ${u.enderecoBairro}`;
});

const formatTime = (timeString) => {
  // Se a string for nula ou vazia, retorna um valor padrão para o input de horário
  return timeString ? timeString.substring(0, 5) : '18:00';
};

// --- LÓGICA DE VISUALIZAÇÃO E EDIÇÃO ---

const entrarModoEdicao = () => {
  if (!userData.value) return; 
  
  const u = userData.value;
  // Copia os dados atuais para o formulário de edição
  // O nome e o e-mail não são copiados para o formEdit, pois não são editáveis.
  formEdit.telefone = u.telefone;
  formEdit.enderecoRua = u.enderecoRua;
  formEdit.enderecoNumero = u.enderecoNumero;
  formEdit.enderecoComplemento = u.enderecoComplemento;
  formEdit.enderecoBairro = u.enderecoBairro;
  formEdit.cep = u.cep;
  formEdit.alertaComumAtivo = u.alertaComumAtivo;
  formEdit.horarioAlertaComum = formatTime(u.horarioAlertaComum);
  formEdit.alertaSeletivaAtivo = u.alertaSeletivaAtivo;
  formEdit.horarioAlertaSeletiva = formatTime(u.horarioAlertaSeletiva);
  
  isEditing.value = true;
};

const cancelarEdicao = () => {
  isEditing.value = false;
  saveError.value = ''; 
};

// FUNÇÃO ATUALIZADA
const salvarAlteracoes = async () => {
  if (!user.value) return;
  isSaving.value = true;
  saveError.value = '';
  const apiUrl = `${config.public.apiBaseUrl}/Usuario/${user.value.idUsuario}`;

  // Monta o DTO com os dados do formulário, ESPELHANDO a classe UsuarioUpdateDto.cs
  const payload = {
    Telefone: formEdit.telefone,
    EnderecoRua: formEdit.enderecoRua,
    EnderecoNumero: formEdit.enderecoNumero,
    EnderecoComplemento: formEdit.enderecoComplemento,
    EnderecoBairro: formEdit.enderecoBairro,
    Cep: formEdit.cep,
    AlertaComumAtivo: formEdit.alertaComumAtivo,
    HorarioAlertaComum: formEdit.alertaComumAtivo ? `${formEdit.horarioAlertaComum}:00` : null,
    AlertaSeletivaAtivo: formEdit.alertaSeletivaAtivo,
    HorarioAlertaSeletiva: formEdit.alertaSeletivaAtivo ? `${formEdit.horarioAlertaSeletiva}:00` : null,
  };

  try {
    // Faz a chamada PUT para a API
    await $fetch(apiUrl, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${authToken.value}`,
        'Content-Type': 'application/json'
      },
      body: payload
    });
    
    // Se salvou com sucesso, atualiza os dados na tela re-executando a busca inicial
    await refresh(); 
    
    alert('Alterações salvas com sucesso!');
    isEditing.value = false; // Volta para o modo de visualização
  } catch (err) {
    console.error("Erro ao salvar alterações:", err.data);
    saveError.value = "Não foi possível salvar. Verifique os dados e tente novamente.";
  } finally {
    isSaving.value = false;
  }
};

const formatarDias = (programacao) => {
  if (!programacao || programacao.length === 0) return 'Dias não informados';
  const diasDaSemana = ["", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  const dias = programacao.map(p => diasDaSemana[p.diaSemana]).join(', ');
  // Formata para trocar a última vírgula por "e"
  return dias.replace(/,([^,]*)$/, ' e' + '$1');
};

const formatarHorario = (programacao) => {
  return programacao?.[0]?.horarioInicioPrevisto?.substring(0, 5) || '??:??';
};
</script>

<style scoped>
/* O seu CSS scoped continua o mesmo */
.page-container-profile { padding: 40px 20px; min-height: calc(100vh - 72px); align-items: flex-start; display: flex; justify-content: center; }
.profile-card { background-color: #fff; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); width: 100%; max-width: 900px; padding: 40px; box-sizing: border-box; }
.profile-card h1, .profile-subtitle { text-align: center; }
.profile-card h1 { margin-top: 0; margin-bottom: 8px; color: #333; }
.profile-subtitle { margin-top: 0; margin-bottom: 40px; color: #666; }
.profile-fieldset { border: none; border-top: 1px solid #eee; padding: 25px 0; margin: 0 0 25px 0; }
.profile-fieldset legend { font-size: 1.2rem; font-weight: 600; color: #3149BC; padding-right: 15px; }
.data-item { margin-bottom: 20px; }
.data-item:last-child { margin-bottom: 0; }
.data-item label { font-size: 0.9rem; color: #888; margin-bottom: 4px; display: block; }
.data-item .data-value { font-size: 1.1rem; color: #333; margin: 0; }
.input-edit { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; margin-top: 4px; }
.address-inputs .input-group-profile { margin-bottom: 10px; }
.address-inputs .input-group-profile:last-child { margin-bottom: 0; }
.address-inputs .input-group-profile label { font-size: 0.9rem; color: #555; }
.schedule-cards-container-profile { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.info-card-profile { background-color: #fdfdfd; border: 1px solid #eee; border-radius: 12px; padding: 20px; flex: 1; min-width: 280px; text-align: center; }
.card-title { margin-top: 0; font-size: 1.3rem; color: #3149BC;}
.card-zone { font-size: 0.8rem; color: #666; margin-top: -10px;}
.card-schedule { font-size: 1rem; font-weight: 500; color: #333; min-height: 40px; }
.alert-status { margin-top: 15px; padding-top: 15px; border-top: 1px solid #f0f0f0; font-weight: 500; }
.alert-status .status-inactive { color: #888; font-style: italic; }
.alert-config-box { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 15px; }
.time-config { margin-top: 10px; }
.actions-container { margin-top: 30px; text-align: right; }
.edit-actions { display: flex; justify-content: flex-end; gap: 15px; }
.btn-primary-profile { width: auto; padding: 12px 30px; background-color: #3149BC; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.3s ease; }
.btn-primary-profile:hover { background-color: #283e9e; }
.btn-secondary-profile { width: auto; padding: 12px 30px; background-color: #f0f2f5; color: #555; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; }
.btn-secondary-profile:hover { background-color: #e2e6ea; }
.switch { position: relative; display: inline-block; width: 50px; height: 28px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 28px;}
.slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%;}
input:checked + .slider { background-color: #3149BC; }
input:checked + .slider:before { transform: translateX(22px); }
.loading-feedback, .error-feedback { padding: 40px; text-align: center; font-size: 1.2rem; color: #555; }
.error-feedback { color: #D8000C; background-color: #FFD2D2; border: 1px solid #D8000C; border-radius: 8px; }
.error-message { text-align: right; margin-top: 15px; font-size: 0.9rem; color: #D8000C; }
</style>