import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        base: 'Albert Sans',
      },
    }),
  ],
  theme: {
    colors: {
      brand: {
        purple: '#D323FF',
        black: '#212121',
        white: '#F8F8F8',
      },
    },
  },
})
