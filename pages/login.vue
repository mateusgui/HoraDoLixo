<template>
  <div class="page-container">
    <div class="auth-card">

      <div class="auth-branding">
        <NuxtLink to="/login">
          <img src="/img/LogoHoraDoLixo.png" alt="Logo Hora do Lixo" class="login-logo">
        </NuxtLink>
        <p class="branding-description">
          Faça seu cadastro, consulte os horários e receba alertas para coletas do lixo no seu bairro.
        </p>
      </div>

      <div class="auth-form-section">
        <form @submit.prevent="handleLogin">
          <h3>Entrar na sua conta</h3>

          <div class="input-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com" required>
          </div>

          <div class="input-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="password" placeholder="Sua senha" required>
          </div>

          <button type="submit" class="btn-primary">Entrar</button>

          <div class="links-container">
            <NuxtLink to="/esqueci-senha">Esqueci minha senha</NuxtLink>
            <p>Não tem uma conta? <NuxtLink to="/cadastro">Cadastre-se</NuxtLink>
            </p>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: false,
});

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  console.log('Tentativa de login com:', { email: email.value, password: password.value });

  // Verifica se o e-mail e a senha correspondem aos valores chumbados para teste
  if (email.value === 'mateus_g@ufms.br' && password.value === 'Senha123@') {
    
    await navigateTo('/home');

  } else {
    alert('E-mail ou senha incorretos. Tente novamente.');
  }
};
</script>