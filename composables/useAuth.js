import { useState } from 'nuxt/app'

export const useAuthToken = () => useState('authToken', () => null);

export const useUser = () => useState('user', () => null);