import { memo } from 'react';
import { DataTable } from 'react-native-paper';

import { PRODUCT_TABLE_COLS } from '../helper';
import productsTableStyles from '../productsTable.styles';

const _ProductTableColumns = () => {
  return (
    <DataTable.Header>
      {PRODUCT_TABLE_COLS.map((column) => {
        if (column === 'ID') {
          return (
            <DataTable.Title
              key={column}
              style={productsTableStyles.idColumn}>
              {column}
            </DataTable.Title>
          );
        }
        return (
          <DataTable.Title
            numeric={column !== 'Name'}
            key={column}>
            {column}
          </DataTable.Title>
        );
      })}
    </DataTable.Header>
  );
};

const ProductTableColumns = memo(_ProductTableColumns);

export default ProductTableColumns;
