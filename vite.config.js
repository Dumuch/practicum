import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path'

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/index.html': '/pages/index/index.html'
        }
    },
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                profile: resolve(__dirname, 'src/profile.html'),
                signIn: resolve(__dirname, 'src/signIn.html'),
                signUp: resolve(__dirname, 'src/signUp.html'),
                notFound: resolve(__dirname, 'src/404.html'),
                error: resolve(__dirname, 'src/500.html')
            }
},
        outDir: resolve(__dirname, 'dist')
    },
    plugins: [handlebars({
        partialDirectory: [
            resolve(__dirname, 'src/partials/button'),
            resolve(__dirname, 'src/partials/link'),
            resolve(__dirname, 'src/partials/input'),
            resolve(__dirname, 'src/partials/form'),
            resolve(__dirname, 'src/layouts/main'),
        ],
        context: 'global'
    })],

})
