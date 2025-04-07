// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui', '@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', file: 'ru-RU.json' },
    ],
    defaultLocale: 'ru'
  },
  quasar: {
    plugins: [
      'Notify', 'Dialog'
    ]
  },
});