import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        username: '',
        password: '',
    }),
    persist: true,
});
