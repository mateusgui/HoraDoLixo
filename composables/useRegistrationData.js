import { useState } from 'nuxt/app'

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
  horarioAlertaComum: '18:00',
  alertaComumAtivo: false,
  horarioAlertaSeletiva: '18:00',
  alertaSeletivaAtivo: false
}));