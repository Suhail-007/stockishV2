import React from 'react';

import PageWrapper from '../../ui/PageWrapper';

import ProductForm from './ProductForm';

const AddProductPage = () => {
  return (
    <PageWrapper.Scroll>
      <ProductForm />
    </PageWrapper.Scroll>
  );
};

export default AddProductPage;
