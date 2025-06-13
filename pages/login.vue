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

          <!-- TODO: Finalizar páginas '/esqueci-senha' e '/cadastro' -->

          <NuxtLink to="/esqueci-senha">Esqueci minha senha</NuxtLink>
          <p>Não tem uma conta? <NuxtLink to="/cadastro">Cadastre-se</NuxtLink></p>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Estilos Locais */
.login-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
}

.login-logo {
  max-width: 180px;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.links-container {
  margin-top: 20px;
  font-size: 14px;
}

.links-container a {
  color: #007bff;
  text-decoration: none;
}

.links-container a:hover {
  text-decoration: underline;
}

.links-container p {
  margin: 10px 0 0;
}
</style>