import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { useFonts } from 'expo-font';
import SearchIcon from './assets/icons/SearchIcon';
import LatestUpdates from './screens/LatestUpdates';

enableScreens();

type DrawerParamList = {
  LatestUpdates: undefined;
  WallpapersList: undefined;
  MyList: undefined;
  MyFavoriteWallpapers: undefined;
  RecentlyWatched: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function Screen({ label }: { label: string }) {
  return (
    <View style={styles.centeredScreen}>
      <Text>{label}</Text>
    </View>
  );
}

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend: require('./assets/fonts/Lexend.ttf'),
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const dynamicScreens: Array<{ name: keyof DrawerParamList; label: string; component: React.ComponentType<any>; }>
    = [
      { name: 'LatestUpdates', label: 'Latest Updates', component: LatestUpdates },
      { name: 'WallpapersList', label: 'Wallpapers List', component: () => <Screen label="Wallpapers List" /> },
      { name: 'MyList', label: 'My List', component: () => <Screen label="My List" /> },
      { name: 'MyFavoriteWallpapers', label: 'My Favorite Wallpapers', component: () => <Screen label="My Favorite Wallpapers" /> },
      { name: 'RecentlyWatched', label: 'Recently Watched', component: () => <Screen label="Recently Watched" /> },
      { name: 'Settings', label: 'Settings', component: () => <Screen label="Settings" /> },
    ];

  const labelMap = Object.fromEntries(dynamicScreens.map(({ name, label }) => [name, label] as const));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            headerShown: true,
            drawerType: 'front',
            swipeEdgeWidth: 60,
            headerStyle: { backgroundColor: '#0b0b0b' },
            headerTitleStyle: { fontFamily: 'Lexend', fontSize: 16 },
            drawerLabelStyle: { fontFamily: 'Lexend' },
            headerTitle: isSearching
              ? () => (
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search wallpapers..."
                  placeholderTextColor="#9CA3AF"
                  autoFocus
                  onBlur={() => setIsSearching(false)}
                  style={{
                    fontFamily: 'Lexend',
                    fontSize: 14,
                    color: navigationTheme.colors.text,
                    width: 220,
                  }}
                />
              )
              : labelMap[route.name as keyof DrawerParamList],
            headerRight: () => (
              <Pressable onPress={() => setIsSearching((v) => !v)} style={{ paddingRight: 12 }}>
                <SearchIcon size={20} color={navigationTheme.colors.text} />
              </Pressable>
            ),
          })}
          drawerContent={(props) => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )}
        >
          {dynamicScreens.map(({ name, label, component }) => (
            <Drawer.Screen
              key={name}
              name={name}
              component={component}
              options={{ title: label, drawerLabel: label }}
            />
          ))}
        </Drawer.Navigator>
        <StatusBar style="light" backgroundColor="#0b0b0b" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
