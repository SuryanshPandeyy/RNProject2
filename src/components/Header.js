import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';

const Header = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/Logo/Logo.png')} />
      </View>
      {/* <Pressable
        style={styles.notification}
        onPress={() => navigation.navigate('Notification')}>
        <Image
          source={require('../../assets/MenuIcons/Filled/Notification.png')}
        />
      </Pressable> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 67,
    zIndex: 2,
    backgroundColor: '#F8954F',
  },
  notification: {
    borderWidth: 1,
    borderColor: '#006CB6',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 15,
  },
});
