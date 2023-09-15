import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';

const Menu = ({navigation, route}) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    async () => {
      const sliderDataApi = await fetch(
        '',
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      if (sliderDataApi) {
        setCategoryData(
          JSON.parse(JSON.parse(JSON.stringify(sliderDataApi)).msg).category,
        );
      }
    };
  }, []);

  const menuList = [
    {
      name: 'Home',
      urlFill: require('../../assets/MenuIcons/Filled/home.png'),
      url: require('../../assets/MenuIcons/Outline/home.png'),
    },
    {
      name: 'About',
      urlFill: require('../../assets/MenuIcons/Filled/about.png'),
      url: require('../../assets/MenuIcons/Outline/about.png'),
    },
    {
      name: 'Contact',
      urlFill: require('../../assets/MenuIcons/Filled/contact.png'),
      url: require('../../assets/MenuIcons/Outline/contact.png'),
    },
    {
      name: 'Category',
      urlFill: require('../../assets/MenuIcons/Filled/donate.png'),
      url: require('../../assets/MenuIcons/Outline/donate.png'),
      params: {
        menu: true,
      },
    },
    {
      name: 'Gallery',
      urlFill: require('../../assets/MenuIcons/Filled/gallery.png'),
      url: require('../../assets/MenuIcons/Outline/gallery.png'),
    },
  ];
  return (
    <View style={styles.container}>
      {menuList.map((item, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => navigation.navigate(item.name, item.params)}>
            <Image
              source={
                route && route.name === item.name ? item.urlFill : item.url
              }
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 20,
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: '#F8954F',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
