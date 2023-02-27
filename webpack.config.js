import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default {

    entry: resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'sound-ideas-main.js',
        path: resolve(__dirname, 'docs'),
        library: 'SoundIdeas',
        libraryTarget: 'umd'
    },
    module:{
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    mode:'production'
}