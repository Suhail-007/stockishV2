import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

import { addProduct, editProductDetails } from '../../../apis/product.api';
import { AddProductNotesAdmin } from '../../../constants/notes';
import { STATUS_CODES } from '../../../constants/statusCodes';
import { updateProducts, editProducts } from '../../../features/product';
import { Product } from '../../../features/types/product.type';
import { useAppDispatch } from '../../../store/store';
import ErrorMessage from '../../ErrorMessage';
import FormController from '../../FormController';
import Notes from '../../Notes/Notes';
import Button from '../../ui/Button';
import Header from '../../ui/Header';
import PageWrapper from '../../ui/PageWrapper';
import TextInput from '../../ui/TextInput';

import { ProductAddForm } from './productForm.type';

/**
 * A form for adding a product.
 *
 * This form takes in a product name, quantity, buy price, sell price, and notes.
 *
 * The form uses react-hook-form to handle validation and submission.
 *
 * The form is wrapped in a PageWrapper.Section component to provide a basic
 * layout for the form.
 *
 * Each input field is wrapped in a FormController component to handle the
 * validation rules and provide the correct props to the TextInput component.
 *
 * The form is submitted when the "Add Product" button is pressed.
 */
const ProductFormPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const params = useLocalSearchParams<Record<keyof Product, string> & { isEdit: string }>();
  const isEdit = params?.isEdit === 'true' ? true : false;
  const {
    mutateAsync: addProductMutation,
    isPending: addProductIsPending,
    isError: addProductIsError,
    error: addProductError
  } = useMutation({
    mutationFn: (data: ProductAddForm) => {
      return addProduct(data);
    }
  });
  const {
    mutateAsync: editProductMutation,
    isPending: editProductIsPending,
    isError: editProductIsError,
    error: editProductError
  } = useMutation({
    mutationFn: (data: Partial<ProductAddForm> & { id: string }) => {
      return editProductDetails(data);
    }
  });

  const { control, handleSubmit, reset } = useForm<ProductAddForm>({
    defaultValues: {
      name: params?.name || '',
      quantity: params?.quantity || '',
      buyPrice: params?.buyPrice || '',
      sellPrice: params?.sellPrice || ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: NativeStackHeaderProps) => (
        <Header
          title={isEdit ? 'Edit Product' : 'Add Product'}
          showBack
          onBackPress={props.navigation.goBack}
          {...props}
        />
      )
    });
  }, [isEdit, navigation]);

  const onAddSubmit = async (data: ProductAddForm) => {
    try {
      const res = await addProductMutation(data);
      debugger;
      if (res.data.status === STATUS_CODES.success) {
        const newlyAddedProduct = res.data.data;

        //increment the active product count
        dispatch(updateProducts(newlyAddedProduct));

        //reset the form
        reset(control._formValues);

        // navigate to the product page with the newly added product
        router.navigate({
          pathname: '/(app)/(tabs)/products',
          params: {
            ...(newlyAddedProduct as Product),
            isUpdate: 'false'
          }
        });
      }
    } catch (error) {
      console.log('🚀 ~ onAddSubmit ~ error:', error);
    }
  };

  const setActionButtonLabel = () => {
    if (isEdit && !editProductIsPending) {
      return 'Edit Product';
    }

    if (isEdit && editProductIsPending) {
      return 'Editing Product...';
    }

    if (!isEdit && addProductIsPending) {
      return 'Adding Product...';
    }

    return 'Add Product';
  };

  const onEditSubmit = async (data: ProductAddForm) => {
    try {
      const res = await editProductMutation({ ...data, id: params.id });

      if (res.data.status === STATUS_CODES.success) {
        const updatedProducts = res.data.data;

        //increment the active product count
        dispatch(editProducts(updatedProducts));

        //reset the form
        reset(control._formValues);

        // navigate to the product page with the newly added product
        router.navigate({
          pathname: '/(app)/(tabs)/products',
          params: {
            ...(updatedProducts as Product),
            isUpdate: 'true'
          }
        });
      }
    } catch (error) {
      console.log('🚀 ~ onEditSubmit ~ error:', error);
    }
  };

  const setActionButtonPressHandler = (data: ProductAddForm) => {
    if (isEdit) {
      return onEditSubmit(data);
    }

    return onAddSubmit(data);
  };

  return (
    <PageWrapper.Section style={{ gap: 16, marginTop: 0, paddingTop: 0, flex: 1 }}>
      <FormController<ProductAddForm>
        control={control}
        name='name'
        rules={{
          required: {
            value: true,
            message: 'Product name is required'
          }
        }}
        render={({ field, fieldState }) => (
          <TextInput
            label='Product Name *'
            mode='outlined'
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
          />
        )}
      />

      <FormController<ProductAddForm>
        control={control}
        name='quantity'
        rules={{
          required: {
            value: true,
            message: 'Quantity is required'
          }
        }}
        render={({ field, fieldState }) => (
          <TextInput
            label='Quantity *'
            mode='outlined'
            keyboardType='decimal-pad'
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
          />
        )}
      />

      <FormController<ProductAddForm>
        control={control}
        name='buyPrice'
        rules={{
          required: {
            value: true,
            message: 'Buy price is required'
          }
        }}
        render={({ field, fieldState }) => (
          <TextInput
            label='Buy Price *'
            mode='outlined'
            keyboardType='numeric'
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
          />
        )}
      />

      <FormController<ProductAddForm>
        control={control}
        name='sellPrice'
        rules={{
          required: {
            value: true,
            message: 'Sell price is required'
          }
        }}
        render={({ field, fieldState }) => (
          <TextInput
            label='Sell Price *'
            mode='outlined'
            keyboardType='numeric'
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
          />
        )}
      />

      <Notes
        headingProps={{ title: 'Notes' }}
        noteTextProps={{ variant: 'labelLarge' }}
        notes={AddProductNotesAdmin}
      />

      {/* Fill the  styling for validation errors */}
      {addProductIsError && addProductError && <ErrorMessage error={addProductError} />}
      {editProductIsError && editProductError && <ErrorMessage error={editProductError} />}

      <Button.Primary
        loading={editProductIsPending || addProductIsPending}
        disabled={editProductIsPending || addProductIsPending}
        onPress={handleSubmit(setActionButtonPressHandler)}>
        {setActionButtonLabel()}
      </Button.Primary>
    </PageWrapper.Section>
  );
};

export default ProductFormPage;
