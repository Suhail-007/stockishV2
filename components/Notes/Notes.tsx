import React, { useMemo } from 'react';
import { View } from 'react-native';

import useThemeColors from '../../hooks/useThemeColors';
import { NotesProps } from '../types/notes.type';
import PageTitle from '../PageTitle';
import notesStyles from './notes.styles';
import CustomText from '../ui/CustomText';

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
  }, [notes]);

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: colors.primary50,
        borderColor: colors.primary,
        borderWidth: 1
      }
    };
  }, []);

  return (
    <View style={[notesStyles.container, dynamicStyles.container, wrapperStyles]}>
      {headingProps?.title && <PageTitle {...headingProps} />}

      {memoizedNotes}
    </View>
  );
};

export default Notes;
