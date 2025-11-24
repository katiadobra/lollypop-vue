import {
  create,
  NButton,
  NCard,
  NCheckbox,
  NDivider,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
  NGradientText,
  NGrid,
  NGridItem,
  NInput,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NSelect,
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
        NCheckbox,
        NDivider,
        NCollapse,
        NCollapseItem,
        NForm,
        NFormItem,
        NGradientText,
        NGrid,
        NGridItem,
        NInput,
        NLayout,
        NLayoutHeader,
        NLayoutFooter,
        NLayoutContent,
        NSelect,
        NSpace,
        NTag,
        NText,
      ],
    });
    app.use(naive);
  },
};
