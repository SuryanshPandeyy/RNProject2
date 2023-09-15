import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Home from './src/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About from './src/screens/About';
import Contact from './src/screens/Contact';
import AllProd from './src/screens/AllProd';
import Gallery from './src/screens/Gallery';
import Donate from './src/screens/Donate';
import Notification from './src/screens/Notification';
import Category from './src/screens/Category';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (loader) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(222, 244, 255, 1)',
        }}>
        <Image
          source={require('./assets/Logo/loading.jpg')}
          resizeMode="contain"
          style={{marginBottom: 50, width: '100%', height: '50%'}}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const tabOptions = [
    {
      name: 'Home',
      component: Home,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'About',
      component: About,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'Contact',
      component: Contact,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'AllProd',
      component: AllProd,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'Donate',
      component: Donate,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'Gallery',
      component: Gallery,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'Notification',
      component: Notification,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
    {
      name: 'Category',
      component: Category,
      options: ({route}) => ({
        headerShown: false,
        // animation: 'none',
      }),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="About">
          {tabOptions.map((item, i) => {
            return (
              <Stack.Screen
                key={i}
                name={item.name}
                component={item.component}
                options={item.options}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
