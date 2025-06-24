<template>
  <header class="main-header">
    <div class="header-container">
      <div class="header-logo-container">
        <NuxtLink to="/home">
          <img src="/img/LogoHeader.png" alt="Ícone Hora do Lixo" class="header-logo-img">
        </NuxtLink>
      </div>
      
      <nav class="main-nav">
        <NuxtLink to="/home" class="nav-link">Início</NuxtLink>
        <NuxtLink to="/perfil" class="nav-link">Cadastro</NuxtLink>
        <a href="#" @click.prevent="logout" class="nav-link">Sair</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
// Função de logout adicionada
const logout = async () => {
  // 1. Pede confirmação ao usuário para evitar cliques acidentais
  const confirmed = confirm('Você tem certeza que deseja sair?');

  // 2. Se o usuário confirmar, executa a lógica de logout
  if (confirmed) {
    // No futuro, aqui você limparia os dados de autenticação do usuário (ex: token)
    console.log('Usuário deslogado. Redirecionando para o login...');

    // 3. Redireciona o usuário para a página de login
    await navigateTo('/login');
  }
};
</script>

<style scoped>
/* Os seus estilos continuam os mesmos e já se aplicam ao novo link */
.main-header {
  background-color: #3149BC;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #fff;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.header-logo-container img {
  height: 40px;
  display: block;
}
.main-nav {
  display: flex;
  gap: 25px;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
  cursor: pointer; /* Adicionado para o link de Sair parecer clicável */
}
.nav-link:hover {
  border-bottom-color: rgba(255, 255, 255, 0.7);
}
.nav-link.router-link-exact-active {
  font-weight: 700;
  border-bottom-color: #fff;
}
</style>