import React, { memo } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import HeartIcon from '../assets/icons/HeartIcon';

export type WallpaperItemProps = {
  id: string;
  title?: string;
  imageUrl: string;
  isFavorite?: boolean;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  onPress?: (id: string) => void;
  onLongPress?: (id: string) => void;
  onToggleFavorite?: (id: string, next: boolean) => void;
};

const WallpaperItem = memo(function WallpaperItem({
  id,
  title,
  imageUrl,
  isFavorite = false,
  containerStyle,
  imageStyle,
  onPress,
  onLongPress,
  onToggleFavorite,
}: WallpaperItemProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={() => onPress?.(id)}
        onLongPress={() => onLongPress?.(id)}
        android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
        style={styles.pressable}
      >
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={[styles.image, imageStyle]}
        />

        {title ? (
          <View style={styles.titleWrap}>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
          </View>
        ) : null}

        <Pressable
          onPress={() => onToggleFavorite?.(id, !isFavorite)}
          hitSlop={8}
          style={styles.favButton}
        >
          <HeartIcon size={16} color={isFavorite ? '#FF3B30' : '#ffffffB3'} strokeWidth={2} />
        </Pressable>
      </Pressable>
    </View>
  );
});

export default WallpaperItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  },
  pressable: {
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 9 / 16,
  },
  titleWrap: {
    position: 'absolute',
    left: 8,
    right: 44,
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    color: '#ffffff',
    fontFamily: 'Lexend',
    fontSize: 12,
  },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  favButtonActive: {},
  
});


