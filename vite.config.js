import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path'

export default defineConfig({
    server: {
        port: 3000
    },
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                profile: resolve(__dirname, 'src/profile.html'),
                signIn: resolve(__dirname, 'src/signIn.html'),
                signUp: resolve(__dirname, 'src/signUp.html'),
                norFound: resolve(__dirname, 'src/404.html'),
                error: resolve(__dirname, 'src/5**.html')
            }
        },
        outDir: resolve(__dirname, 'dist')
    },
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials')
    })],
})
