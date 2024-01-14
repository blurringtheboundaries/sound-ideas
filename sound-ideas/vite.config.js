// vite.config.js
import pugPlugin from "vite-plugin-pug"
const options = { pretty: true } 
const locals = {  }
export default {
    // config options
    build: {
        outDir: 'docs',
    },
    plugins: [pugPlugin(options, locals)]
}

// import { defineConfig } from "vite"


