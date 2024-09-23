import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {createHtmlPlugin} from 'vite-plugin-html';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

const padZero = (num: number) => ('0' + num).slice(-2);

// 格式化时间
const formatDate = d => {
  return (
    `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}` +
    ' ' +
    `${padZero(d.getHours())}:${padZero(d.getMinutes())}:${padZero(
      d.getSeconds()
    )}`
  );
};

export default defineConfig(async ({mode}) => {
  const sdkVersion = '9.0.0';

  // 只能这么引入
  const cosPath = `/cjit/jeditor/${sdkVersion}`;
  const cosEnvMapper = {
    prod: `https://static.cdn.tencent.com${cosPath}`,
    test: `https://test-static.cdn.tencent.com${cosPath}`,
    dev: `https://dev-static.cdn.tencent.com${cosPath}`,
    default: '/'
  };
  const cosEnv = (process.env.COS_ENV ||
    'default') as keyof typeof cosEnvMapper;
  const cdnUrl = cosEnvMapper[cosEnv];
  const JAMIS_DEBUG = process.env.JAMIS != null;
  const amisAddr =
    process.env.COS_ENV === 'prod'
      ? 'static.cdn.tencent.com/cjit/jamis/9.00'
      : `dev-static.cdn.tencent.com/cjit/jamis${
          JAMIS_DEBUG ? '-debug' : ''
        }/9.0.0`;
  console.log(`cosPath=${cosPath}, cosEnv=${cosEnv}, cdnUrl=${cdnUrl}`);

  return {
    base: mode !== 'production' ? '/' : cdnUrl,
    resolve: {
      alias: [
        {
          find: /((?:codemirror|froala-editor|tinymce|video-react|cropperjs).+\.css)/,
          replacement: resolve(__dirname, '../amis/node_modules/$1')
        },
        {
          find: 'amis/schema.json',
          replacement: resolve(__dirname, '../amis/schema.json')
        },
        {
          find: /^amis$/,
          replacement: resolve(__dirname, '../amis/src/index.tsx')
        },
        {
          find: 'amis/lib',
          replacement: resolve(__dirname, '../amis/src/')
        },
        {
          find: /^amis-core$/,
          replacement: resolve(__dirname, '../amis-core/src/index.tsx')
        },
        {
          find: /^amis-ui$/,
          replacement: resolve(__dirname, '../amis-ui/src/index.tsx')
        },
        {
          find: 'amis-ui/lib',
          replacement: resolve(__dirname, '../amis-ui/src/')
        },
        {
          find: 'amis-ui/scss',
          replacement: resolve(__dirname, '../amis-ui/scss/')
        },
        {
          find: 'amis-formula/lib/doc',
          replacement: resolve(__dirname, '../amis-formula/lib/doc.js')
        },
        {
          find: /^amis\-formula$/,
          replacement: resolve(__dirname, '../amis-formula/src/index.ts')
        },
        {
          find: /^amis-editor-core$/,
          replacement: resolve(__dirname, '../amis-editor-core/src/index.ts')
        },
        {
          find: 'amis-editor-core/scss',
          replacement: resolve(__dirname, '../amis-editor-core/scss/')
        },
        {
          find: /^amis-editor$/,
          replacement: resolve(__dirname, '../amis-editor/src/index.tsx')
        },
        {
          find: /^amis-theme-editor-helper$/,
          replacement: resolve(
            __dirname,
            '../amis-theme-editor-helper/src/index.ts'
          )
        },
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    preprocessorOptions: {
      scss: {
        // 通过配置 `quietDeps` 选项来禁用所有 Sass 警告
        additionalData: '@use "sass:math";', // 示例额外数据，可以根据需要调整
        sassOptions: {
          quietDeps: true, 
        }
    }
  },
    optimizeDeps: {},
    plugins: [
      react({
        jsxRuntime: 'classic',
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties']
          }
        }
      }),
      svgr({
        exportAsDefault: true
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            RELEASE_INFO: `=== RELEASE_TIME: ${formatDate(new Date())} ===`,
            amisAddr
          }
        }
      }),
      monacoEditorPlugin({
        publicPath: 'monacoeditorwork',
        customDistPath: (root: string, buildOutDir: string, base: string) => {
          return `${root}/dist/monacoeditorwork`;
        }
      })

      // viteExternalsPlugin({
      //   jamis: 'amisLib'
      // })
    ],
    build: {
      target: 'modules'
      // rollupOptions: {
      //   external: 'jamis'
      // }
    }
  };
});
