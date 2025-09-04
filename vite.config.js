import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    // cho phép thằng Vite sử dụng process.env, mặc định thì không mà phải dùng import.meta.env
    // https://github.com/vitejs/vite/issues/1973
    define: {
        'process.env': process.env
    },
    plugins: [
        react(),
        svgr()
    ],
    resolve: {
        alias: [
            { find: '~', replacement: '/src' }
        ]
    }
})
