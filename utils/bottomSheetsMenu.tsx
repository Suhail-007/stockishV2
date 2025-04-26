import { Icon } from 'react-native-paper';

import { ProductBottomSheetMenuType } from './bottomSheetsMenu.type';

export const productBottomSheetMenu: ProductBottomSheetMenuType[] = [
  {
    id: '1',
    title: 'View Details',
    icon: (
      <Icon
        source='eye'
        size={24}
      />
    )
  },
  {
    id: '2',
    title: 'Edit',
    icon: (
      <Icon
        source='pencil'
        size={24}
      />
    )
  },
  {
    id: '3',
    title: 'Delete'
  }
];
