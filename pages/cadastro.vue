<template>
  <div class="page-container">
    <div class="form-container">
      
      <NuxtLink to="/login">
        <img src="/img/LogoHoraDoLixo.png" alt="Logo Hora do Lixo" class="form-logo">
      </NuxtLink>

      <h1>Crie sua Conta</h1>
      <p class="subtitle">Informe seus dados para começar a usar o serviço.</p>

      <form @submit.prevent="handleRegister">
        
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div class="input-group">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" v-model="form.nomeCompleto" placeholder="Seu nome completo" required>
          </div>
          <div class="input-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="form.email" placeholder="seuemail@exemplo.com" required>
          </div>
          <div class="input-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="form.senha" placeholder="Crie uma senha forte" required>
          </div>
          <div class="input-group">
            <label for="confirmar-senha">Confirmar Senha</label>
            <input type="password" id="confirmar-senha" v-model="form.confirmarSenha" placeholder="Repita a senha" required>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div class="input-group">
            <label for="cep">CEP (Opcional)</label>
            <input type="text" id="cep" v-model="form.cep" placeholder="00000-000">
          </div>
          <div class="input-group">
            <label for="rua">Rua / Avenida</label>
            <input type="text" id="rua" v-model="form.rua" placeholder="Ex: Av. Afonso Pena" required>
          </div>
          <div class="input-group">
            <label for="numero">Número</label>
            <input type="text" id="numero" v-model="form.numero" placeholder="Ex: 123" required>
          </div>
          <div class="input-group">
            <label for="bairro">Bairro</label>
            <input type="text" id="bairro" v-model="form.bairro" placeholder="Ex: Centro" required>
          </div>
          <div class="input-group">
            <label for="complemento">Complemento (Opcional)</label>
            <input type="text" id="complemento" v-model="form.complemento" placeholder="Ex: Apto 101, Bloco B">
          </div>
        </fieldset>
        
        <button type="submit" class="form-button">Cadastrar</button>

        <div class="links-container">
          <p>Já tem uma conta? <NuxtLink to="/login">Faça o login</NuxtLink></p>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  nomeCompleto: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  complemento: ''
});

// Função que será chamada quando o formulário for enviado
const handleRegister = () => {
  if (form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem. Por favor, verifique.');
    return;
  }

  console.log('Tentativa de cadastro com os seguintes dados:');
  console.log(form);

  alert('Cadastro enviado! (Verifique o console para ver os dados)');

  // Futuramente, aqui vem a chamada da API para cadastrar o usuário, determinar a zona de coleta, etc.
};
</script>

<style scoped>

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  text-align: center;
}

.form-logo {
  max-width: 180px;
  margin-bottom: 20px;
  cursor: pointer;
}

.form-container h1 {
  margin-top: 0;
  margin-bottom: 8px;
}

.subtitle {
  margin-top: 0;
  margin-bottom: 24px;
  color: #666;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
  color: #333;
}

.form-button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #218838;
}
</style>