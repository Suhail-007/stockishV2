import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { IconButton, Menu, ToggleButton } from 'react-native-paper';

import { MaterialIcons } from '@expo/vector-icons';
import { Route, router, useLocalSearchParams } from 'expo-router';

import { defaultValues } from '../../../constants/variables';
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  // Parse initial values from params
  const initialValues: Filters = React.useMemo(() => {
    if (params?.stringifiedData) {
      try {
        const parsedValues = JSON.parse(params.stringifiedData);
        // Check if any filters are different from default
        const hasFilters = Object.keys(parsedValues).some(
          (key) => JSON.stringify(parsedValues[key]) !== JSON.stringify(defaultValues[key as keyof Filters])
        );
        setHasAppliedFilters(hasFilters);
        return parsedValues;
      } catch (e) {
        console.error('Failed to parse filter data:', e);
      }
    }
    return defaultValues;
  }, [params?.stringifiedData]);

  const { control, handleSubmit, reset } = useForm<Filters>({
    defaultValues: initialValues
  });

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
    reset(defaultValues);
    goBack();
  };

  const dynamicStyles = useMemo(
    () => ({
      borderColor: {
        borderColor: colors.borderDefault
      },
      background: {
        backgroundColor: colors.background
      },
      menuItem: {
        background: colors.grey100
      }
    }),
    [colors.borderDefault, colors.grey100, colors.background]
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
        <CustomText>Sort By</CustomText>
        <FormController<Filters>
          control={control}
          name='sortBy'
          render={({ field }) => (
            <Menu
              visible={menuVisible}
              elevation={4}
              contentStyle={[dynamicStyles.borderColor, filterStyles.menuContent]}
              style={filterStyles.sortMenu}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button.Tertiary
                  style={[filterStyles.defaultRadius, dynamicStyles.borderColor]}
                  onPress={() => setMenuVisible(true)}
                  icon='menu-down'>
                  <CustomText>{field.value}</CustomText>
                </Button.Tertiary>
              }>
              {['ASC', 'DESC'].map((item) => (
                <Menu.Item
                  style={{
                    backgroundColor: item === field.value ? colors.grey100 : colors.background,
                    maxWidth: 'auto'
                  }}
                  leadingIcon={() => (
                    <MaterialIcons
                      size={24}
                      name={item === 'ASC' ? 'arrow-upward' : 'arrow-downward'}
                    />
                  )}
                  key={item}
                  onPress={() => {
                    field.onChange(item);
                    setMenuVisible(false);
                  }}
                  title={item}
                />
              ))}
            </Menu>
          )}
        />
      </View>

      <View style={filterStyles.filterCol}>
        <CustomText>Active Products</CustomText>
        <FormController<Filters>
          control={control}
          name='isActive'
          render={({ field }) => (
            <ToggleButton.Row
              style={[dynamicStyles.borderColor]}
              value={field.value ? '1' : '0'}
              onValueChange={(value) => field.onChange(value === '1')}>
              <ToggleButton
                value='1'
                icon='check'
              />
              <ToggleButton
                value='0'
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
