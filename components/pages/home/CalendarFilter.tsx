import { memo, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { isThisYear } from 'date-fns';

import CustomDropdown from '../../ui/CustomDropdown';

interface CalendarFilterProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const CalendarFilter = memo(({ selectedMonth, selectedYear, onMonthChange, onYearChange }: CalendarFilterProps) => {
  const [showMonthMenu, setShowMonthMenu] = useState(false);
  const [showYearMenu, setShowYearMenu] = useState(false);

  const months = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const monthCount = isThisYear(new Date(selectedYear, 0)) ? currentMonth : 12;

    return Array.from({ length: monthCount }, (_, i) => ({
      label: new Date(2000, i).toLocaleString('default', { month: 'long' }),
      value: i + 1
    }));
  }, [selectedYear]);

  const years = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        label: String(new Date().getFullYear() - i),
        value: new Date().getFullYear() - i
      })),
    []
  );

  return (
    <View style={styles.filterContainer}>
      <CustomDropdown
        visible={showMonthMenu}
        onDismiss={() => setShowMonthMenu(false)}
        onShow={() => setShowMonthMenu(true)}
        items={months}
        selectedValue={selectedMonth}
        onSelect={onMonthChange}
      />
      <CustomDropdown
        visible={showYearMenu}
        onDismiss={() => setShowYearMenu(false)}
        onShow={() => setShowYearMenu(true)}
        items={years}
        selectedValue={selectedYear}
        onSelect={onYearChange}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  }
});

CalendarFilter.displayName = 'CalendarFilter';

export default CalendarFilter;
