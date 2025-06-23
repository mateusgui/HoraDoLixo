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
                  <label for="telefone">Telefone</label>
                  <input type="tel" id="telefone" v-model="form.telefone" placeholder="(00) 00000-0000" required>
                </div>

                <div class="input-group">
                  <label for="senha">Senha</label>
                  <input type="password" id="senha" v-model="form.senha" placeholder="Mínimo 8 caracteres" required>
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
import { reactive } from 'vue';

definePageMeta({
  layout: false,
});

const form = reactive({
  nomeCompleto: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  complemento: ''
});


const handleRegister = async () => {
  // Validação se as senhas coincidem
  if (form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem. Por favor, verifique.');
    return; // Interrompe a função
  }

  // Validação simples de tamanho da senha
  if (form.senha.length < 8) {
    alert('A senha deve ter no mínimo 8 caracteres.');
    return;
  }

  console.log('Dados do formulário válidos, pronto para enviar ao back-end:', form);

  await navigateTo('/configurar-alertas');
};
</script>

<style scoped>

</style>