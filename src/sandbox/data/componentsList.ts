import { FaqWidgetExample } from '../../features/faq/components/FaqWidget/FaqWidgetExample';
import FaqDocs from '../../features/faq/components/FaqWidget/FaqWidget.md?raw';
import FaqOverview from '../../features/faq/docs/overview.md?raw';

export const componentsList = [
  {
    id: 'faq-widget',
    featureId: 'faq',
    name: 'FAQ Widget',
    // React example component
    example: FaqWidgetExample,
    // Raw markdown docs
    docs: {
      component: FaqDocs,
      overview: FaqOverview,
    },
  },
];
