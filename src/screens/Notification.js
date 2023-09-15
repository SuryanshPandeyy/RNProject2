import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Entypo from 'react-native-vector-icons/Entypo';

const Notification = ({navigation, route}) => {

    const [notData, setNotData] = useState([]);

    useEffect(() => {
      const notFunc = async () => {
        const notData = await fetch(
          '',
          {
            method: 'GET',
          },
        )
          .then(res => res.json())
          .catch(err => console.log(err));

        if (notData) {
          setNotData(notData);
        }
      };

      notFunc();
    }, []);
  const data = [
    {
      id: 1,
      title: 'First Notification',
      description: 'You Donated Something',
    },
    {
      id: 2,
      title: 'Second Notification',
      description: 'You Donated Something',
    },
    {
      id: 3,
      title: 'Third Notification',
      description: 'You Donated Something',
    },
    {
      id: 4,
      title: 'Fourth Notification',
      description: 'You Donated Something',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      <View style={styles.container}>
        <FlatList
          renderItem={({item}) => {
            return (
              <View style={styles.notificationBox}>
                <View>
                  <Text
                    style={[styles.notificationTitle, styles.notificationText]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.notificationDesc, styles.notificationText]}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
          data={notData}
        />
      </View>
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Poppins-Regular',
  },
  notificationDesc: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  notificationText: {
    marginVertical: 2,
  },
});
