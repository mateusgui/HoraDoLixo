import { useState } from 'nuxt/app'

// Cria um estado compartilhado para os dados do cadastro
export const useRegistrationData = () => useState('registrationData', () => ({
  nomeCompleto: '',
  email: '',
  telefone: '',
  senha: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  complemento: '',
  // Adicionamos também os campos de alerta aqui
  horarioAlertaComum: '18:00',
  alertaComumAtivo: false,
  horarioAlertaSeletiva: '18:00',
  alertaSeletivaAtivo: false
}));