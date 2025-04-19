import React from 'react';

import PageWrapper from '../../ui/PageWrapper';

import AddProductForm from './AddProductForm';

const AddProductPage = () => {
  return (
    <PageWrapper.Scroll>
      <AddProductForm />
    </PageWrapper.Scroll>
  );
};

export default AddProductPage;
