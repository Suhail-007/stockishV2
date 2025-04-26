import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { addProduct } from '../../../apis/product.api';
import { AddProductNotesAdmin } from '../../../constants/notes';
import { STATUS_CODES } from '../../../constants/statusCodes';
import { addProduct as addProductAction } from '../../../features/product';
import { useAppDispatch } from '../../../store/store';
import ErrorMessage from '../../ErrorMessage';
import FormController from '../../FormController';
import Notes from '../../Notes/Notes';
import Button from '../../ui/Button';
import PageWrapper from '../../ui/PageWrapper';
import TextInput from '../../ui/TextInput';

import { ProductAddForm } from './addProduct.type';

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
const AddProductForm = () => {
  const dispatch = useAppDispatch();
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
  const { control, handleSubmit, resetField } = useForm<ProductAddForm>({
    defaultValues: {
      name: '',
      quantity: '',
      buyPrice: '',
      sellPrice: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (data: ProductAddForm) => {
    const res = await addProductMutation(data);

    if (res.data.status === STATUS_CODES.success) {
      //Update the product list in redux
      dispatch(addProductAction(res.data.data));

      //reset the form
      resetField('name');
      resetField('quantity');
      resetField('buyPrice');
      resetField('sellPrice');

      // navigate to the product page with the newly added product
      router.navigate({
        pathname: '/(app)/(tabs)/Products',
        params: {
          newlyAddedProduct: res.data.data.id
        }
      });
    }
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

      <Button.Primary
        loading={addProductIsPending}
        disabled={addProductIsPending}
        onPress={handleSubmit(onSubmit)}>
        {addProductIsPending ? 'Adding Product...' : 'Add Product'}
      </Button.Primary>
    </PageWrapper.Section>
  );
};

export default AddProductForm;
