import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  console.log(env);
  
    return {
        base: './',
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: '/src'
                }
            ]
        },
        server: {
            host: true,
            proxy: {
              "/api": {
                    target: env.VITE_BASE_HOST,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "")
                }
            },
            hmr: { overlay: false }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    implementation: require('sass'),
                    sassOptions: {
                        // 生效代码
                        outputStyle: 'expanded'
                    }
                }
            }
        },
        plugins: [
            vue(),
            Components({
                // allow auto load markdown components under `./src/components/`
                // extensions: ['vue', 'md'],
                // allow auto import and register components used in markdown
                // include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ],
                dts: 'src/components.d.ts'
            }),

            // https://github.com/antfu/unocss
            // see unocss.config.ts for config
            Unocss({
                presets: [
                    presetUno(),
                    presetAttributify(),
                    presetIcons({
                        scale: 1.2,
                        warn: true
                    })
                ],
                transformers: [transformerDirectives(), transformerVariantGroup()]
            })
        ]
    }
})
