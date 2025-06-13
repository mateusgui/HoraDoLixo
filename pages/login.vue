<template>
  <div class="login-page-container">
    <div class="login-form-container">
      
      <img src="/img/LogoHoraDoLixo.png" alt="Logo Hora do Lixo" class="login-logo">

      <form @submit.prevent="handleLogin">
        
        <div class="input-group">
          <label for="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="seuemail@exemplo.com" 
            required
          >
        </div>

        <div class="input-group">
          <label for="senha">Senha</label>
          <input 
            type="password" 
            id="senha" 
            v-model="password" 
            placeholder="Sua senha" 
            required
          >
        </div>

        <button type="submit" class="login-button">Entrar</button>

        <div class="links-container">
          <NuxtLink to="/esqueci-senha">Esqueci minha senha</NuxtLink>
          <p>Não tem uma conta? <NuxtLink to="/cadastro">Cadastre-se</NuxtLink></p>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Tentativa de login com:', { email: email.value, password: password.value });
};
</script>