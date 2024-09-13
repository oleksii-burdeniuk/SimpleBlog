import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from '@/hooks/useTranslation';
import { PostItemInterface } from '@/types/posts';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UserInterfaceIdiom } from '@/types/users';
import { memo } from 'react';
import { capitalizeFirstLetter } from '@/utils/functions';
export default memo(function UserItem({ item }: { item: UserInterfaceIdiom }) {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor(
    { dark: '#FFFFFF33', light: '#00000033' },
    'background'
  );
  return (
    <ThemedView style={[styles.container, { borderColor: backgroundColor }]}>
      <ThemedText type={'title'}>{capitalizeFirstLetter(item.name)}</ThemedText>
      <ThemedText type={'default'}>
        {capitalizeFirstLetter(item.address.city)}
      </ThemedText>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 8,
  },
});
