import {
  create,
  NButton,
  NCard,
  NDivider,
  NGradientText,
  NGrid,
  NGridItem,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NSpace,
  NTag,
  NText,
} from 'naive-ui';

export default {
  install(app) {
    const naive = create({
      components: [
        NButton,
        NCard,
        NDivider,
        NGradientText,
        NGrid,
        NGridItem,
        NLayout,
        NLayoutHeader,
        NLayoutFooter,
        NLayoutContent,
        NSpace,
        NTag,
        NText,
      ],
    });
    app.use(naive);
  },
};
