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
                  <input type="text" id="nome" v-model="registrationData.nomeCompleto" required>
                </div>
                <div class="input-group">
                  <label for="email">E-mail</label>
                  <input type="email" id="email" v-model="registrationData.email" required>
                </div>
                <div class="input-group">
                  <label for="telefone">Telefone</label>
                  <input type="tel" id="telefone" v-model="registrationData.telefone" placeholder="(00) 00000-0000" required>
                </div>
                <div class="input-group">
                  <label for="senha">Senha</label>
                  <input type="password" id="senha" v-model="registrationData.senha" placeholder="Mínimo 8 caracteres" required>
                </div>
                <div class="input-group">
                  <label for="confirmar-senha">Confirmar Senha</label>
                  <input type="password" id="confirmar-senha" v-model="confirmarSenha" required>
                </div>
              </fieldset>
            </div>
            <div class="form-column">
              <fieldset>
                <legend>Endereço</legend>
                <div class="input-group">
                  <label for="cep">CEP</label>
                  <input type="text" id="cep" v-model="registrationData.cep">
                </div>
                <div class="input-group">
                  <label for="rua">Rua / Avenida</label>
                  <input type="text" id="rua" v-model="registrationData.rua" required>
                </div>
                <div class="input-group">
                  <label for="numero">Número</label>
                  <input type="text" id="numero" v-model="registrationData.numero" required>
                </div>
                <div class="input-group">
                  <label for="bairro">Bairro</label>
                  <input type="text" id="bairro" v-model="registrationData.bairro" required>
                </div>
                <div class="input-group">
                  <label for="complemento">Complemento (Opcional)</label>
                  <input type="text" id="complemento" v-model="registrationData.complemento">
                </div>
              </fieldset>
            </div>
          </div>
          <button type="submit" class="btn-primary">Continuar cadastro</button>
          <div class="links-container">
            <p>Já tem uma conta? <NuxtLink to="/login">Faça o login</NuxtLink></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useRegistrationData } from '~/composables/useRegistrationData';
import { ref } from 'vue';

definePageMeta({
  layout: false,
});

const registrationData = useRegistrationData();

const confirmarSenha = ref('');

const handleRegister = async () => {
  if (registrationData.value.senha !== confirmarSenha.value) {
    alert('As senhas não coincidem. Por favor, verifique.');
    return;
  }
  if (registrationData.value.senha.length < 8) {
    alert('A senha deve ter no mínimo 8 caracteres.');
    return;
  }

  console.log('Dados da primeira etapa salvos, redirecionando...', registrationData.value);
  await navigateTo('/configurar-alertas');
};
</script>