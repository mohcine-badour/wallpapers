import React, { useMemo, useCallback, useState } from 'react';
import { Alert, FlatList, Image, ListRenderItem, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WallpaperItem, { WallpaperItemProps } from '../components/WallpaperItem';

type Wallpaper = Required<Pick<WallpaperItemProps, 'id' | 'imageUrl'>> & {
  title?: string;
  isFavorite?: boolean;
};

const mockWallpapers: Wallpaper[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200', title: 'Mountain View' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200', title: 'Starry Night' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200', title: 'Ocean Waves' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200', title: 'Forest Path' },
  { id: '5', imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1200', title: 'Desert Dunes' },
  { id: '6', imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200', title: 'Aurora' },
  { id: '7', imageUrl: 'https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?q=80&w=1200', title: 'City Lights' },
  { id: '8', imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200', title: 'Valley' },
];

export default function LatestUpdates() {
  const [items, setItems] = useState(() => mockWallpapers.map(w => ({ ...w, isFavorite: w.isFavorite ?? false })));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = useCallback((id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  }, []);

  const handleLongPress = useCallback((id: string) => {
    // TODO: context menu
  }, []);

  const handleToggleFavorite = useCallback((id: string, next: boolean) => {
    setItems(prev => prev.map(w => (w.id === id ? { ...w, isFavorite: next } : w)));
    // TODO: persist favorite state to storage/server
  }, []);

  const handleDownload = useCallback(() => {
    // TODO: implement download (expo-file-system + expo-media-library)
    Alert.alert('Download', 'Downloading image...');
  }, []);

  const handleSetAsWallpaper = useCallback(() => {
    // TODO: implement set wallpaper (native module)
    Alert.alert('Set as wallpaper', 'Setting wallpaper...');
  }, []);

  const renderItem: ListRenderItem<Wallpaper> = useCallback(({ item }) => {
    return (
      <View style={styles.gridItem}>
        <WallpaperItem
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          isFavorite={!!item.isFavorite}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onToggleFavorite={handleToggleFavorite}
        />
      </View>
    );
  }, [handlePress, handleLongPress, handleToggleFavorite]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalRoot}>
          <View style={styles.backdrop} />
          {selectedId ? (
            <View style={styles.modalContent}>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)} hitSlop={10}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
              <Image
                source={{ uri: items.find(i => i.id === selectedId)?.imageUrl }}
                resizeMode="cover"
                style={styles.modalImage}
              />
              <View style={styles.actionsContainer}>
                <Pressable style={styles.actionButton} onPress={handleDownload}>
                  <Text style={styles.actionText}>Download</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={handleSetAsWallpaper}>
                  <Text style={styles.actionText}>Set as wallpaper</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    padding: 12,
  },
  column: {
    gap: 12,
  },
  gridItem: {
    flex: 1,
    marginBottom: 12,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 720,
    aspectRatio: 9 / 16,
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0b0b0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  closeText: {
    color: '#ffffff',
    fontSize: 10,
    lineHeight: 16,
  },
  actionsContainer: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontFamily: 'Lexend',
    fontSize: 14,
  },
  actionPrimary: {
    backgroundColor: '#2563EB',
  },
  actionPrimaryText: {
    color: '#ffffff',
  },
});


