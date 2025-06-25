<template>
  <div class="page-container home-page-layout">
    <div class="dashboard-container">

      <div class="schedule-cards-container">
        <div class="schedule-card" v-if="coletaComum.zona">
          <h2 class="card-title">Coleta Comum</h2>
          <p class="card-zone">Sua zona: <strong>{{ coletaComum.zona }}</strong></p>
          <p class="card-schedule">{{ coletaComum.dias }}, a partir das {{ coletaComum.horario }}</p>
          <div class="alert-status">
            <span v-if="alertaComum.ativo">Alerta configurado para as {{ alertaComum.horario }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>
        <div class="schedule-card" v-if="coletaSeletiva.zona">
          <h2 class="card-title">Coleta Seletiva</h2>
          <p class="card-zone">Sua zona: <strong>{{ coletaSeletiva.zona }}</strong></p>
          <p class="card-schedule">{{ coletaSeletiva.dias }}, a partir das {{ coletaSeletiva.horario }}</p>
          <div class="alert-status">
            <span v-if="alertaSeletiva.ativo">Alerta configurado para as {{ alertaSeletiva.horario }}</span>
            <span v-else class="status-inactive">Alerta não configurado</span>
          </div>
        </div>
        <div class="schedule-card unavailable" v-if="!coletaSeletiva.zona">
          <h2 class="card-title">Coleta Seletiva</h2>
          <p class="card-schedule">Seu endereço ainda não é atendido por este serviço.</p>
        </div>
      </div>

      <div class="map-button-container">
        <NuxtLink to="/mapa" class="btn-primary btn-auto-width">Visualizar regiões de coleta no mapa</NuxtLink>
      </div>

      <div class="services-grid-section">
        <h2 class="section-title">Mais Serviços</h2>
        <div class="services-grid">
          <a 
            v-for="servico in servicos" 
            :key="servico.titulo" 
            :href="servico.link" 
            target="_blank" 
            class="service-card"
          >
            <img :src="`/img/servicos/${servico.imagem}`" :alt="servico.titulo">
            <div class="service-card-title">
              <span>{{ servico.titulo }}</span>
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Simulação de dados que virão do backend
const coletaComum = reactive({
  zona: 'REGIÃO 02',
  dias: 'Segundas, Quartas e Sextas-feiras',
  horario: '19:00'
});
const coletaSeletiva = reactive({
  zona: 'coleta_seletiva_12',
  dias: 'Sextas-feiras',
  horario: '18:00'
});
const alertaComum = reactive({
  ativo: true,
  horario: '18:00'
});
const alertaSeletiva = reactive({
  ativo: false,
  horario: '17:00'
});

// NOVA LISTA DE DADOS PARA OS CARDS DE SERVIÇOS
const servicos = ref([
  { imagem: 'capinagem_rocada.jpg', titulo: 'Capina, roçada manual e mecanizada', link: 'https://solurb.eco.br/servico/capina-rocada-e-raspagem-manual-e-mecanizada-de-passeios-guias-sarjetas-vias-e-logradouros-publicos/13' },
  { imagem: 'coleta_animais.jpeg', titulo: 'Coleta de animais', link: 'https://solurb.eco.br/servico/coleta-de-animais/22' },
  { imagem: 'coleta_oleo.jpg', titulo: 'De Olho no Óleo', link: 'https://solurb.eco.br/servico/de-olho-no-oleo/21' },
  { imagem: 'coleta_residuos_saude.jpg', titulo: 'Coleta de Resíduos de Saúde', link: 'https://solurb.eco.br/servico/coleta-de-residuos-de-servico-de-saude/11' },
  { imagem: 'ecoponto.jpg', titulo: 'Ecoponto', link: 'https://solurb.eco.br/servico/ecoponto/20' },
  { imagem: 'educacao_ambiental.png', titulo: 'Educação Ambiental', link: 'https://solurb.eco.br/educacao-ambiental' },
  { imagem: 'lev.jpg', titulo: 'Locais de Entrega Voluntária - LEV', link: 'https://solurb.eco.br/servico/locais-de-entrega-voluntaria-lev/16' },
  { imagem: 'limpeza_apos_feira.jpg', titulo: 'Limpeza de vias após as feiras', link: 'https://solurb.eco.br/servico/limpeza-de-vias-apos-as-feiras-livres/14' },
  { imagem: 'limpeza_boca_lobo.jpg', titulo: 'Limpeza manual de boca de lobo', link: 'https://solurb.eco.br/servico/limpeza-manual-de-boca-de-lobo/12' },
  { imagem: 'pintura_meio_fio.jpg', titulo: 'Pintura de meio fio', link: 'https://solurb.eco.br/servico/pintura-de-meio-fio/15' },
  { imagem: 'solicite_palestra.JPG', titulo: 'Solicite uma palestra', link: 'https://solurb.eco.br/palestras' },
  { imagem: 'varricao_vias.jpg', titulo: 'Varrição de Vias e Logradouros', link: 'https://solurb.eco.br/servico/varricao-de-vias-e-logradouros-publicos/19' }
]);
</script>

<style scoped>
  .home-page-layout {
    align-items: flex-start;
  }
</style>