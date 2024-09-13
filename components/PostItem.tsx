import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from '@/hooks/useTranslation';
import { PostItemInterface } from '@/types/posts';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { memo } from 'react';
import { capitalizeFirstLetter } from '@/utils/functions';
import { UserInterfaceIdiom } from '@/types/users';

export default memo(function PostItem({
  item,
  user,
}: {
  item: PostItemInterface;
  user: UserInterfaceIdiom;
}) {
  const { t } = useTranslation();
  const borderColor = useThemeColor(
    { dark: '#FFFFFF33', light: '#00000033' },
    'background'
  );
  const backgroundColor = useThemeColor(
    { dark: '#000000', light: '#f0f0f0' },
    'background'
  );

  return (
    <ThemedView style={[styles.container, { borderColor: borderColor }]}>
      <View style={styles.nameContainer}>
        <ThemedText type={'subtitle'}>
          {capitalizeFirstLetter(user.name)}
        </ThemedText>
        <ThemedText type={'small'}>
          {capitalizeFirstLetter(user.address.city)}
        </ThemedText>
      </View>
      <View
        style={{
          backgroundColor: backgroundColor,
          padding: 16,
          borderRadius: 8,
        }}
      >
        <ThemedText type={'title'}>
          {capitalizeFirstLetter(item.title)}
        </ThemedText>
        <ThemedText type={'default'}>
          {capitalizeFirstLetter(item.body)}
        </ThemedText>
      </View>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 8,
  },
  nameContainer: {
    padding: 8,
    opacity: 0.8,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
