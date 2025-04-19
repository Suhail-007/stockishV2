import { useForm } from 'react-hook-form';

import FormController from '../../FormController';
import PageWrapper from '../../ui/PageWrapper';
import TextInput from '../../ui/TextInput';
import Button from '../../ui/Button';
import { ProductAddForm } from './addProduct.type';

/**
 * A form for adding a product.
 *
 * This form takes in a product name, quantity, buy price, and sell price.
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
  const { control, handleSubmit } = useForm<ProductAddForm>({
    defaultValues: {
      productName: '',
      quantity: '',
      buyPrice: '',
      sellPrice: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = (data: ProductAddForm) => {
    console.log(data);
  };

  return (
    <PageWrapper.Section style={{ gap: 16, marginTop: 0, paddingTop: 0, flex: 1 }}>
      <FormController<ProductAddForm>
        control={control}
        name='productName'
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

      <Button.Primary onPress={handleSubmit(onSubmit)}>Add Product</Button.Primary>
    </PageWrapper.Section>
  );
};

export default AddProductForm;
