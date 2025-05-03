import React from 'react';
import { View } from 'react-native';

import { FilterForm } from '../../components/pages/Filters/FilterForm';
import FiltersPage from '../../components/pages/Filters/Filters';

const Filter = () => {
  return (
    <FiltersPage>
      <View style={{ flex: 1 }}>
        <FilterForm />
      </View>
    </FiltersPage>
  );
};

export default Filter;
