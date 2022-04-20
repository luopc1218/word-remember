import { defineConfig } from 'umi';

export default defineConfig({
  title: '单词记忆器',
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  mfsu: {},
  dva: {
    immer: true,
    hmr: false,
  },
});
