<template>
  <div class="page-container">
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
            <p v-if="!isEditing" class="data-value">{{ enderecoFormatado }}</p>
            
            <div v-else class="address-inputs">
              <div class="input-group">
                <label for="rua">Rua / Avenida</label>
                <input type="text" id="rua" v-model="usuario.rua" class="input-edit">
              </div>
              <div class="input-group">
                <label for="numero">Número</label>
                <input type="text" id="numero" v-model="usuario.numero" class="input-edit">
              </div>
              <div class="input-group">
                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" v-model="usuario.bairro" class="input-edit">
              </div>
              <div class="input-group">
                <label for="complemento">Complemento (Opcional)</label>
                <input type="text" id="complemento" v-model="usuario.complemento" class="input-edit">
              </div>
              <div class="input-group">
                <label for="cep">CEP</label>
                <input type="text" id="cep" v-model="usuario.cep" class="input-edit">
              </div>
            </div>
          </div>
        </fieldset>

        <div class="actions-container">
          <button v-if="!isEditing" type="button" @click="entrarModoEdicao" class="btn-primary">Editar Dados</button>
          <div v-else class="edit-actions">
            <button type="button" @click="cancelarEdicao" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Salvar Alterações</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

// A lógica do script continua a mesma, não precisa mudar nada aqui.
const isEditing = ref(false);

const usuario = reactive({
  nomeCompleto: 'Mateus Guimarães Moraes Vilela',
  email: 'mateus.vilela@exemplo.com',
  telefone: '(67) 99999-8888',
  rua: 'Avenida Afonso Pena',
  numero: '123',
  bairro: 'Centro',
  complemento: 'Apto 42',
  cep: '79000-000'
});

let dadosOriginais = {};

const enderecoFormatado = computed(() => {
  return `${usuario.rua}, ${usuario.numero} - ${usuario.bairro}, Campo Grande - MS`;
});

const entrarModoEdicao = () => {
  dadosOriginais = { ...usuario };
  isEditing.value = true;
};

const cancelarEdicao = () => {
  Object.assign(usuario, dadosOriginais);
  isEditing.value = false;
};

const salvarAlteracoes = () => {
  console.log('Salvando as seguintes alterações:', usuario);
  alert('Alterações salvas com sucesso! (Verifique o console)');
  isEditing.value = false;
};
</script>

<style scoped>
/* Estilos específicos para a página de perfil */
.profile-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  padding: 40px;
  box-sizing: border-box;
}

.profile-card h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
}

.profile-subtitle {
  text-align: center;
  margin-top: 0;
  margin-bottom: 40px;
  color: #666;
}

.profile-fieldset {
  border: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.profile-fieldset legend {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3149BC;
  margin-bottom: 15px;
}

.data-item {
  margin-bottom: 20px;
}

.data-item label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #888;
}

.data-item .data-value {
  font-size: 1.1rem;
  color: #333;
  margin: 4px 0 0 0;
}

.input-edit {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  margin-top: 4px;
}

/* A classe abaixo pode ser removida pois .input-group do main.css já faz o espaçamento */
.address-inputs .input-group:last-child {
  margin-bottom: 0; /* Remove a margem extra do último item */
}


.actions-container {
  margin-top: 30px;
  text-align: right;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.actions-container .btn-primary {
  width: auto;
  padding-left: 30px;
  padding-right: 30px;
}

.btn-secondary {
  width: auto;
  padding: 12px 30px;
  background-color: #f0f2f5;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #e2e6ea;
}
</style>