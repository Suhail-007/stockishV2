import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

import { RadioButtonProps } from './types/radioButton';
import { scale } from 'react-native-size-matters';

const RadioButton: React.FC<RadioButtonProps> = ({ data, onPress, containerStyles, render, value }) => {
  return (
    <PaperRadioButton.Group
      onValueChange={onPress}
      value={value}>
      <View style={[styles.contStyles, containerStyles]}>
        {data.map((item, index) => {
          //Render custom component
          if (render) {
            return render(item);
          }

          return (
            <PaperRadioButton.Item
              style={{ flexDirection: 'row', alignItems: 'center' }}
              key={index}
              theme={{ colors: { primary: 'black' } }}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </View>
    </PaperRadioButton.Group>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  contStyles: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
