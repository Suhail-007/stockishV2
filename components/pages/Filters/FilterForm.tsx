import React, { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { IconButton, ToggleButton } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';
import { Route, router, useLocalSearchParams } from 'expo-router';

import { defaultFilters } from '../../../constants/variables';
import useThemeColors from '../../../hooks/useThemeColors';
import { Filters } from '../../../utils/global.type';
import FormController from '../../FormController';
import PageTitle from '../../PageTitle';
import Button from '../../ui/Button';
import CustomText from '../../ui/CustomText';
import TextInput from '../../ui/TextInput';

import filterStyles from './filters.styles';

export const FilterForm: React.FC = () => {
  const { colors } = useThemeColors();
  const params = useLocalSearchParams<{ stringifiedData: string; goToRoute: string }>();
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  // Parse initial values from params
  const initialValues: Filters = React.useMemo(() => {
    if (params?.stringifiedData) {
      try {
        const parsedValues = JSON.parse(params.stringifiedData);
        // Check if any filters are different from default
        const hasFilters = Object.keys(parsedValues).some(
          (key) => JSON.stringify(parsedValues[key]) !== JSON.stringify(defaultFilters[key as keyof Filters])
        );
        setHasAppliedFilters(hasFilters);
        return parsedValues;
      } catch (e) {
        console.error('Failed to parse filter data:', e);
      }
    }
    return defaultFilters;
  }, [params?.stringifiedData]);

  const { control, handleSubmit, reset, watch } = useForm<Filters>({
    defaultValues: initialValues
  });

  const formValues = watch();

  const onSubmitHandler = (data: Filters) => {
    if (params?.goToRoute) {
      const stringifiedData = JSON.stringify(data);
      router.push({
        pathname: params.goToRoute as Route,
        params: {
          stringifiedData
        }
      });
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const clearFilters = () => {
    reset(defaultFilters);
    goBack();
  };

  const dynamicStyles = useMemo(
    () => ({
      borderColor: {
        borderColor: colors.borderDefault
      },
      background: {
        backgroundColor: colors.background
      }
    }),
    [colors.borderDefault, colors.background]
  );

  return (
    <View style={filterStyles.container}>
      <View style={filterStyles.header}>
        <IconButton
          onPress={goBack}
          icon='arrow-left'
        />
        <PageTitle
          containerStyles={filterStyles.pageHeader}
          title='Filters'
        />
      </View>

      <View style={filterStyles.filterCol}>
        <CustomText>Sort By ({formValues.sortBy === 'ASC' ? 'Ascending' : 'Descending'})</CustomText>
        <FormController<Filters>
          control={control}
          name='sortBy'
          render={({ field }) => (
            <Fragment>
              <ToggleButton.Row
                style={[dynamicStyles.borderColor]}
                value={field.value as Filters['sortBy']}
                onValueChange={field.onChange}>
                <ToggleButton
                  style={{
                    flex: 1,
                    backgroundColor: field.value === 'ASC' ? colors.tertiary100 : colors.background
                  }}
                  value={'ASC'}
                  icon={() => (
                    <MaterialIcons
                      name='arrow-upward'
                      size={20}
                      color={colors.tertiary}
                    />
                  )}
                />
                <ToggleButton
                  style={{
                    flex: 1,
                    backgroundColor: field.value === 'DESC' ? colors.tertiary100 : colors.background
                  }}
                  value={'DESC'}
                  icon={() => (
                    <MaterialIcons
                      name='arrow-downward'
                      size={20}
                      color={colors.tertiary}
                    />
                  )}
                />
              </ToggleButton.Row>
            </Fragment>
          )}
        />
      </View>

      <View style={filterStyles.filterCol}>
        <CustomText>Products Status ({formValues.isActive === true ? 'Active' : 'Inactive'})</CustomText>
        <FormController<Filters>
          control={control}
          name='isActive'
          render={({ field }) => (
            <ToggleButton.Row
              style={[dynamicStyles.borderColor]}
              value={field.value ? '1' : '0'}
              onValueChange={(value) => field.onChange(value === '1')}>
              <ToggleButton
                style={{
                  flex: 1,
                  backgroundColor: field.value ? colors.tertiary100 : colors.background
                }}
                value='1'
                icon='check'
                iconColor={colors.tertiary}
              />
              <ToggleButton
                style={{
                  flex: 1,
                  backgroundColor: !field.value ? colors.tertiary100 : colors.background
                }}
                value='0'
                iconColor={colors.tertiary}
                icon='close'
              />
            </ToggleButton.Row>
          )}
        />
      </View>

      <View style={filterStyles.filterRow}>
        <View style={filterStyles.flexAll}>
          <FormController
            control={control}
            name='minPriceFilter'
            render={({ field }) => (
              <TextInput
                outlineStyle={[filterStyles.textInput, dynamicStyles.borderColor]}
                contentStyle={filterStyles.textInputCont}
                left={<TextInput.Icon icon='currency-rupee' />}
                mode='outlined'
                label='Minimum Price'
                onChangeText={(value) => field.onChange(value)}
                value={String(field.value)}
                keyboardType='numeric'
              />
            )}
          />
        </View>

        <View style={filterStyles.flexAll}>
          <FormController
            control={control}
            name='maxPriceFilter'
            render={({ field }) => {
              return (
                <TextInput
                  outlineStyle={[filterStyles.textInput, dynamicStyles.borderColor]}
                  contentStyle={filterStyles.textInputCont}
                  mode='outlined'
                  label='Maximum Price'
                  left={<TextInput.Icon icon='currency-rupee' />}
                  onChangeText={(value) => field.onChange(value)}
                  value={String(field.value)}
                  keyboardType='numeric'
                />
              );
            }}
          />
        </View>
      </View>

      <View style={[filterStyles.filterRow, filterStyles.buttonCont]}>
        <Button.Primary
          loading={control._formState.isSubmitting}
          disabled={control._formState.isSubmitted}
          style={filterStyles.flexAll}
          onPress={handleSubmit(onSubmitHandler)}>
          {control._formState.isLoading ? 'Applying Filters...' : 'Apply Filters'}
        </Button.Primary>
        <Button.Transparent
          textColor={colors.tertiary}
          mode='text'
          disabled={!hasAppliedFilters}
          onPress={clearFilters}>
          Clear
        </Button.Transparent>
      </View>
    </View>
  );
};
