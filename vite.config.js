import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path'

export default defineConfig({
    server: {
        port: 3000,
        open: '/pages/signIn/signIn.html',
    },
    root: resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/pages/index/index.html'),
                chat: resolve(__dirname, 'src/pages/chat/chat.html'),
                profile: resolve(__dirname, 'src/pages/profile/profile.html'),
                signIn: resolve(__dirname, 'src/pages/signIn/signIn.html'),
                signUp: resolve(__dirname, 'src/pages/signUp/signUp.html'),
                notFound: resolve(__dirname, 'src/pages/404/404.html'),
                error: resolve(__dirname, 'src/pages/500/500.html')
            }
        },
        outDir: resolve(__dirname, 'dist')
    },
    plugins: [handlebars({
        partialDirectory: [
            resolve(__dirname, 'src/components'),
            resolve(__dirname, 'src/layouts/mainLayout'),
        ],
        context: 'global'
    })],

})
