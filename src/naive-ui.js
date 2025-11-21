import { create, NButton, NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent, NSpace } from 'naive-ui';

export default {
  install(app) {
    const naive = create({
      components: [NButton, NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent, NSpace],
    });
    app.use(naive);
  },
};
