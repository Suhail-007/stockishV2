import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// import useThemeColors from '../hooks/useThemeColors';

import PageTitle from './PageTitle';
import { NotesProps } from './types/notes.type';

const Notes = ({ notes, headingProps }: NotesProps) => {
  // const { colors } = useThemeColors();

  const memoizedNotes = useMemo(() => {
    if (typeof notes === 'string') {
      return <View>{notes}</View>;
    }

    return (
      <>
        {notes.map((note, index) => (
          <View key={index}>
            <Text>{note}</Text>
          </View>
        ))}
      </>
    );
  }, [notes]);

  return (
    <View>
      {headingProps?.title && <PageTitle {...headingProps} />}

      {memoizedNotes}
    </View>
  );
};

export default Notes;
