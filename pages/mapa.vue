<template>
  <div class="map-page-container">
    <div class="map-header">
      <h1>Mapa de Coleta</h1>
      <p>Selecione o tipo de coleta para visualizar as regiões de atendimento em Campo Grande, MS.</p>
    </div>

    <div class="map-toggle-buttons">
      <button 
        @click="mostrarMapa('comum')" 
        :class="{ active: mapaAtivo === 'comum' }"
        class="toggle-button"
      >
        Coleta Comum
      </button>
      <button 
        @click="mostrarMapa('seletiva')" 
        :class="{ active: mapaAtivo === 'seletiva' }"
        class="toggle-button"
      >
        Coleta Seletiva
      </button>
    </div>

    <div class="map-iframe-container">
      <iframe 
        :src="urlDoMapa" 
        frameborder="0" 
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const mapaAtivo = ref('comum');

const urlDoMapa = computed(() => {
  if (mapaAtivo.value === 'comum') {
    return '/mapa_regioes_coleta_comum.html';
  } else {
    return '/mapa_regioes_coleta_seletiva.html';
  }
});

const mostrarMapa = (tipo) => {
  mapaAtivo.value = tipo;
};
</script>

<style scoped>

.map-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.map-header h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 10px;
}

.map-header p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 30px;
}

.map-toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.toggle-button {
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #3149BC;
  border-radius: 50px;
  cursor: pointer;
  background-color: #fff;
  color: #3149BC;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: #f0f2f5;
}

.toggle-button.active {
  background-color: #3149BC;
  color: #fff;
}

.map-iframe-container {
  width: 100%;
  aspect-ratio: 16 / 10; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.map-iframe-container iframe {
  width: 100%;
  height: 100%;
}
</style>