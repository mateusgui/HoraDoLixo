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
import { useAuthToken, useUser } from '~/composables/useAuth';

definePageMeta({
  layout: false,
});

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const authToken = useAuthToken();
const user = useUser();
const config = useRuntimeConfig();

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const apiUrl = `${config.public.apiBaseUrl}/Usuario/login`;

    const responseData = await $fetch(apiUrl, {
      method: 'POST',
      body: {
        Email: email.value,
        Senha: password.value,
      },
    });

    if (responseData && responseData.token && responseData.usuario) {
      console.log('Login bem-sucedido!');
      
      authToken.value = responseData.token;
      user.value = responseData.usuario;

      await navigateTo('/home');

    } else {
      throw new Error("Resposta da API de login inválida ou incompleta.");
    }

  } catch (error) {
    errorMessage.value = 'E-mail ou senha incorretos. Por favor, tente novamente.';
    console.error('Erro ao fazer login:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>