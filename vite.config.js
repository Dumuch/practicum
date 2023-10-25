import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path'

export default defineConfig({
    publicDir: resolve(__dirname, 'public'),
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
            resolve(__dirname, 'src/components/button'),
            resolve(__dirname, 'src/components/link'),
            resolve(__dirname, 'src/components/input'),
            resolve(__dirname, 'src/components/modals'),
            resolve(__dirname, 'src/components/images'),


            resolve(__dirname, 'src/layouts'),
        ],
        context: 'global'
    })],

})
