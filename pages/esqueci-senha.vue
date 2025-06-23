<template>
  <div class="page-container">
    <div class="form-card" style="max-width: 500px;">

      <div class="form-header">
        <div class="header-text">
          <h1>Recuperar Senha</h1>
          <p>Não se preocupe, acontece!</p>
        </div>
      </div>

      <form @submit.prevent="handlePasswordResetRequest" class="form-content">

        <p class="form-instructions">
          Digite seu endereço de e-mail cadastrado e nós enviaremos um link para você redefinir sua senha.
        </p>

        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com" required>
        </div>

        <button type="submit" class="btn-primary">Enviar Link de Recuperação</button>

        <div class="links-container">
          <p>Lembrou a senha? <NuxtLink to="/login">Voltar para o login</NuxtLink>
          </p>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: false,
});

const email = ref('');

// Função que será chamada quando o formulário for enviado
const handlePasswordResetRequest = () => {
  if (!email.value) {
    alert('Por favor, digite seu e-mail.');
    return;
  }

  // --- Lógica de Placeholder (simulação) ---
  // No futuro, aqui você fará a chamada para a API do seu back-end .NET
  console.log('Solicitação de recuperação de senha para o e-mail:', email.value);

  alert('Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha em breve.');

  // Opcional: redirecionar o usuário para a página de login após a solicitação
  // navigateTo('/login');
};
</script>

<style scoped>
/* Estilos específicos para esta página */
.form-card {
  /* A maior parte dos estilos vem do main.css, aqui ajustamos o que for preciso */
  text-align: center;
}

.form-content {
  padding: 30px;
}

.form-instructions {
  font-size: 0.95rem;
  color: #555;
  margin-top: 0;
  margin-bottom: 24px;
  line-height: 1.5;
}
</style>