import React, { useMemo } from 'react';
import { View } from 'react-native';

import useThemeColors from '../../hooks/useThemeColors';
import PageTitle from '../PageTitle';
import { NotesProps } from '../types/notes.type';
import CustomText from '../ui/CustomText';

import notesStyles from './notes.styles';

const Notes = ({ notes, wrapperStyles, render, noteContStyles, noteTextProps, headingProps }: NotesProps) => {
  const { colors } = useThemeColors();

  const memoizedNotes = useMemo(() => {
    if (typeof notes === 'string') {
      return <View>{notes}</View>;
    }

    return (
      <>
        {notes.map((note, index) => (
          <View
            style={[noteContStyles]}
            key={index}>
            {render && render(note)}
            {!render && <CustomText {...noteTextProps}>{note}</CustomText>}
          </View>
        ))}
      </>
    );
  }, [notes, noteContStyles, noteTextProps, render]);

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: colors.primary50,
        borderColor: colors.primary,
        borderWidth: 1
      }
    };
  }, [colors.primary, colors.primary50]);

  return (
    <View style={[notesStyles.container, dynamicStyles.container, wrapperStyles]}>
      {headingProps?.title && <PageTitle {...headingProps} />}

      {memoizedNotes}
    </View>
  );
};

export default Notes;
