import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

// https://vite.dev/config/
export default defineConfig({
  base: isGithubPages ? '/lollypop-vue/' : '/',
  plugins: [vue()],
});
