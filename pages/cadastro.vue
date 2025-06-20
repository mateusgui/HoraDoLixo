<template>
  <div class="page-container">
    <div class="register-card">

      <div class="register-header">
        <NuxtLink to="/login">
          <img src="/img/IconeHoraDoLixo.png" alt="Ícone Hora do Lixo" class="header-logo">
        </NuxtLink>
          <h1>Crie sua Conta</h1>
          <p>Informe seus dados para começar a usar o serviço.</p>
      </div>

      <div class="register-form-section">
        <form @submit.prevent="handleRegister">
          <div class="form-columns-container">
            <div class="form-column">
              <fieldset>
                <legend>Dados Pessoais</legend>
                <div class="input-group">
                  <label for="nome">Nome Completo</label>
                  <input type="text" id="nome" v-model="form.nomeCompleto" required>
                </div>
                <div class="input-group">
                  <label for="email">E-mail</label>
                  <input type="email" id="email" v-model="form.email" required>
                </div>
                <div class="input-group">
                  <label for="senha">Senha</label>
                  <input type="password" id="senha" v-model="form.senha" required>
                </div>
                <div class="input-group">
                  <label for="confirmar-senha">Confirmar Senha</label>
                  <input type="password" id="confirmar-senha" v-model="form.confirmarSenha" required>
                </div>
              </fieldset>
            </div>
            <div class="form-column">
              <fieldset>
                <legend>Endereço</legend>
                <div class="input-group">
                  <label for="cep">CEP</label>
                  <input type="text" id="cep" v-model="form.cep">
                </div>
                <div class="input-group">
                  <label for="rua">Rua / Avenida</label>
                  <input type="text" id="rua" v-model="form.rua" required>
                </div>
                <div class="input-group">
                  <label for="numero">Número</label>
                  <input type="text" id="numero" v-model="form.numero" required>
                </div>
                <div class="input-group">
                  <label for="bairro">Bairro</label>
                  <input type="text" id="bairro" v-model="form.bairro" required>
                </div>
                <div class="input-group">
                  <label for="complemento">Complemento (Opcional)</label>
                  <input type="text" id="complemento" v-model="form.complemento">
                </div>
              </fieldset>
            </div>
          </div>
          <button type="submit" class="btn-primary">Cadastrar</button>
          <div class="links-container">
            <p>Já tem uma conta? <NuxtLink to="/login">Faça o login</NuxtLink></p>
          </div>
        </form>
      </div>
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

const handleRegister = () => {
  if (form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem. Por favor, verifique.');
    return;
  }
  console.log('Tentativa de cadastro com os seguintes dados:', form);
  alert('Cadastro enviado! (Verifique o console para ver os dados)');
};
</script>