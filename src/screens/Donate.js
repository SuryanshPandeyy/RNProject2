import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import {Picker} from '@react-native-picker/picker';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DonateItem = ({
  image,
  productId,
  price,
  setPrice,
  actualPrice,
  productList,
  setProductList,
}) => {
  const [item, setItem] = useState(0);

  // const index = productList?.findIndex(object => {
  //   return object.productId === productId;
  // }); // 👉️

  // console.log(index);

  // console.log(productList.find(item => item.productId === productId));
  return (
    <View style={styles.donateItem}>
      <Image
        source={{uri: image}}
        style={styles.donateItemImage}
        resizeMode="cover"
      />
      <View style={styles.donateCounter}>
        <Pressable
          disabled={item === 0 ? true : false}
          style={[
            styles.donateCounterIcon,
            item === 0 && {backgroundColor: '#ccc'},
          ]}
          onPress={() => {
            setItem(prev => (prev -= 1)), setPrice(prev => prev - actualPrice);

            let elements = [...productList];
            let currentElementIndex = elements.findIndex(
              x => x.productId === productId,
            );

            elements[currentElementIndex] = {
              ...elements[currentElementIndex],
              amount: (elements[currentElementIndex].amount -= actualPrice),
              quantity: (elements[currentElementIndex].quantity -= 1),
            };

            // if you do elements[currentElementIndex].value = ... your data array will be mutated. then its better you do the way above
            setProductList(elements);
          }}>
          <Text style={styles.donateCounterIconText}>-</Text>
        </Pressable>
        <View style={styles.donateCounterNo}>
          <Text style={styles.donateCounterText}>{item}</Text>
        </View>
        <Pressable
          style={styles.donateCounterIcon}
          onPress={() => {
            setItem(prev => (prev += 1));
            setPrice(prev => (prev += actualPrice));

            let elements = [...productList];
            let currentElementIndex = elements.findIndex(
              x => x.productId === productId,
            );
            if (currentElementIndex === -1) {
              elements.push({
                productId,
                quantity: 1,
                amount: actualPrice,
                price: actualPrice,
              });
            } else {
              elements[currentElementIndex] = {
                ...elements[currentElementIndex],
                amount: (elements[currentElementIndex].amount += actualPrice),
                quantity: (elements[currentElementIndex].quantity += 1),
              };
            }
            // if you do elements[currentElementIndex].value = ... your data array will be mutated. then its better you do the way above
            setProductList(elements);
          }}>
          <Text style={styles.donateCounterIconText}>+</Text>
        </Pressable>
      </View>

      <View style={{marginVertical: 8}}>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            fontSize: 18,
          }}>
          Rs. {actualPrice}
        </Text>
      </View>
    </View>
  );
};

const Donate = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [add, setAdd] = useState('');
  const [pan, setPan] = useState('');
  const [other, setOther] = useState('');
  const [picker, setPicker] = useState('');
  const [price, setPrice] = useState(route.params.price);
  const [causemeta, setCausemeta] = useState('');

  // const [productList, setProductList] = useState([]);
  const [result, setResult] = useState(false);
  const [donate, setDonate] = useState([]);
  const [popupMsg, setPopupMsg] = useState('');
  const {params} = route;

  const [dates, setDates] = useState();
  const [distDate, setDistDate] = useState();
  const [open, setOpen] = useState(false);
  const [openDist, setOpenDist] = useState(false);

  const [picker2, setPicker2] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [payLoad, setPayLoad] = useState(false);

  const productList = [
    {
      productId: params.productId,
      quantity: 1,
      amount: params.price,
      price: params.price,
    },
  ];

  console.log(params.isJoin);

  const show = () => {
    setResult(false);
  };

  useEffect(() => {
    const aboutFunc = async () => {
      const aboutData = await fetch(
        '',
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      if (aboutData) {
        setDonate(JSON.parse(JSON.parse(JSON.stringify(aboutData)).msg));
      }
    };

    aboutFunc();
  }, []);

  const submit = async () => {
    if (
      name !== '' &&
      email !== '' &&
      mobile !== '' &&
      add !== '' &&
      picker !== '' &&
      other !== ''
    ) {
      setPayLoad(true);

      const formdata = {
        productList,
        cause: picker,
        causemeta: dates.toString(),
        distributeDate: distDate.toString(),
        youJoin: params.isJoin === '1' ? picker2 : '',
        email,
        mobile,
        quantity,
        address: add,
        other,
        Name: name,
        PanNo: pan,
        total: params.price * quantity,
      };

      console.log(formdata);

      const data = await fetch(
        '',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
        },
      )
        .then(res => res.json())
        .catch(err => setPayLoad(false));

      // const data2 = JSON.parse(JSON.stringify(data));
      const paymentData = JSON.parse(JSON.parse(JSON.stringify(data)).msg);

      const {mid, txnToken, callbackUrl, urlScheme} = paymentData;

      const orderId = paymentData.orderId.toString();
      const amount = paymentData.amount.toString();
      const isStaging = Boolean(Number(paymentData.isStaging));
      const restrictAppInvoke = Boolean(Number(paymentData.restrictAppInvoke));

      AllInOneSDKManager.startTransaction(
        orderId,
        mid,
        txnToken,
        amount,
        callbackUrl,
        isStaging,
        restrictAppInvoke,
        urlScheme,
      )
        .then(async result => {
          setPayLoad(false);

          setResult(true);
          const payResponse = await fetch(
            '',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(result),
            },
          ).then(res => res.json());

          setAdd('');
          setEmail('');
          setMobile('');
          setName('');
          setOther('');
          setPan('');
          setPicker('');
          setPicker2('');

          if (payResponse.type === 'success') {
            setPopupMsg('Thank you for donating with us.');
          } else {
            setPopupMsg('Oh! Transaction Failure');
          }

          // setTimeout(show, 3500);
        })
        .catch(err => {
          setResult(false);
          setPayLoad(false);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} route={route} />
      <ScrollView style={styles.container}>
        {/* <ScrollView
          horizontal
          style={styles.donateItemBox}
          automaticallyAdjustContentInsets={true}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}>
          {donate &&
            donate.product &&
            donate.product.map((item, i) => (
              <DonateItem
                key={i}
                price={price}
                productId={item.productId}
                image={item.image}
                productList={productList}
                setProductList={setProductList}
                setPrice={setPrice}
                actualPrice={parseFloat(item.price)}
              />
            ))}
        </ScrollView> */}
        <View style={{paddingHorizontal: 20, marginVertical: 20}}>
          <View style={[styles.donateBox]}>
            <Image
              source={{uri: params.img}}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
            />
            <View style={styles.donateSmBox}>
              <Text style={styles.text}>{params.title}</Text>
              <Text style={styles.price}>{params.content}</Text>
              <Text style={styles.price}>Price: &#8377;{params.price}</Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <View style={styles.picker}>
            <Picker
              mode="cover"
              selectedValue={picker}
              dropdownIconColor="#323232"
              dropdownIconRippleColor="#ccc"
              style={{
                width: '100%',
                color: '#000',
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#D9D9D9',
              }}
              onValueChange={(itemValue, itemIndex) => {
                setPicker(itemValue);
                setDates(null);
              }}>
              <Picker.Item label="Select Cause" value="" />
              {donate &&
                donate.cause &&
                donate.cause.map((item, i) => (
                  <Picker key={i} label={item} value={item} />
                ))}
            </Picker>
          </View>

          <View style={styles.picker}>
            <Picker
              mode="cover"
              selectedValue={quantity}
              dropdownIconColor="#323232"
              dropdownIconRippleColor="#ccc"
              style={{
                width: '100%',
                color: '#000',
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#D9D9D9',
              }}
              onValueChange={(itemValue, itemIndex) => {
                setQuantity(itemValue);
              }}>
              {['1', '2', '3', '4'].map((item, i) => (
                <Picker.Item key={i} label={`Quantity: ${item}`} value={item} />
              ))}
            </Picker>
          </View>

          {params.isJoin === '1' && (
            <View style={styles.picker}>
              <Picker
                mode="cover"
                selectedValue={picker2}
                dropdownIconColor="#323232"
                dropdownIconRippleColor="#ccc"
                style={{
                  width: '100%',
                  color: '#000',
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                }}
                onValueChange={(itemValue, itemIndex) => setPicker2(itemValue)}>
                <Picker.Item label="Will You Join?" value="" />

                <Picker label="Yes" value="Yes" />
                <Picker label="No" value="No" />
              </Picker>
            </View>
          )}

          <View style={styles.form}>
            {picker !== '' &&
              (picker === 'General' ? (
                <View style={styles.textInputContainer}>
                  <Image
                    source={require('../../assets/Icons/user.png')}
                    style={styles.formIcon}
                  />

                  <TextInput
                    placeholder="Reason for Donate"
                    style={styles.textInput}
                    placeholderTextColor="#bbb"
                    value={dates}
                    onChangeText={text => setDates(text)}
                  />
                </View>
              ) : (
                <View style={styles.textInputContainer}>
                  <Image
                    source={require('../../assets/Icons/user.png')}
                    style={styles.formIcon}
                  />
                  <DateTimePickerModal
                    isVisible={open}
                    mode="date"
                    onConfirm={date => {
                      console.log(date);
                      setOpen(false);
                      setDates(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <Pressable onPress={() => setOpen(true)}>
                    <Text style={[styles.textInput, {color: '#bbb'}]}>
                      {dates
                        ? `${new Date(dates).getDate()}/${
                            new Date(dates).getMonth() + 1
                          }`
                        : picker === 'Birthday'
                        ? 'Enter your Birth Date'
                        : 'Enter your Anniversary Date'}
                    </Text>
                  </Pressable>
                </View>
              ))}

            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <DateTimePickerModal
                isVisible={openDist}
                mode="date"
                onConfirm={date => {
                  setOpenDist(false);
                  setDistDate(date);
                }}
                onCancel={() => {
                  setOpenDist(false);
                }}
              />
              <Pressable onPress={() => setOpenDist(true)}>
                <Text style={[styles.textInput, {color: '#bbb'}]}>
                  {distDate
                    ? `${new Date(distDate).getDate()}/${
                        new Date(distDate).getMonth() + 1
                      }/${new Date(distDate).getFullYear()}`
                    : 'Select Distribution Date'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Email Id"
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Mobile No."
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={mobile}
                onChangeText={text => setMobile(text)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={add}
                onChangeText={text => setAdd(text)}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={styles.formIcon}
              />
              <TextInput
                placeholder="Pan No"
                style={styles.textInput}
                placeholderTextColor="#bbb"
                value={pan}
                onChangeText={text => setPan(text)}
              />
            </View>
            <View
              style={[
                styles.textInputContainer,
                {justifyContent: 'flex-start'},
              ]}>
              <Image
                source={require('../../assets/Icons/user.png')}
                style={[styles.formIcon, {top: 25}]}
              />
              <TextInput
                placeholder="Your Message"
                style={[styles.textInput]}
                textAlignVertical="top"
                multiline={true}
                numberOfLines={9}
                placeholderTextColor="#aaa"
                value={other}
                onChangeText={text => setOther(text)}
              />
            </View>
          </View>

          <View style={styles.total}>
            <Text
              style={[
                styles.totalText,
                {color: '#B0B0B0', fontFamily: 'Poppins-Regular'},
              ]}>
              Total:
            </Text>
            <Text style={styles.totalText}>{price * quantity}</Text>
          </View>
          <View style={styles.payView}>
            <Pressable
              onPress={submit}
              style={styles.pay}
              android_ripple={{
                color: '#ccc',
                borderless: false,
                radius: 189,
              }}>
              {payLoad ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.payText}>Pay Now</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {result && (
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <View style={styles.close}>
              <Pressable onPress={() => setResult(false)}>
                <EvilIcons name="close" size={30} color="#000" />
              </Pressable>
            </View>
            <Text style={styles.popuptext}>{popupMsg}</Text>
            <View style={styles.popuptextContainer}>
              <Text style={styles.popuptext}>For more query please</Text>
              <Pressable onPress={() => navigation.navigate('Contact')}>
                <Text style={[styles.popuptext, {color: '#fff'}]}>
                  contact us
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <Menu navigation={navigation} route={route} />
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  donateItemImage: {
    width: '100%',
    height: 110,
  },

  donateItem: {
    marginHorizontal: 5,
    background: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 15,
    width: 120,
    overflow: 'hidden',
    // height: 162,
  },

  donateCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: 5,
  },

  donateCounterText: {
    color: '#000',
    fontSize: 20,
  },

  donateCounterIconText: {
    color: '#fff',
    fontSize: 20,
  },

  donateCounterIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#24A0A8',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  donateCounterNo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  picker: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 10,
  },

  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textInputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  formIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#F5F7FB',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 16,
    paddingLeft: 40,
    marginVertical: 8,
    fontSize: 18,
    color: '#000',
  },

  total: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 15,
    width: '100%',
    height: 63,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  totalText: {
    color: '#000',
    fontSize: 20,
  },

  payView: {
    width: '100%',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 80,
  },

  pay: {
    borderWidth: 1,
    borderColor: '#24A0A8',
    backgroundColor: '#24A0A8',
    borderRadius: 15,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#24A0A8',
  },

  payText: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },

  popupContainer: {
    width: '100%',
    position: 'absolute',
    background: 'red',
    zIndex: 200,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  popup: {
    backgroundColor: 'lightgreen',
    width: '70%',
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 20,
    position: 'relative',
  },

  popuptext: {
    fontSize: 17,
    color: '#000',
    // flexDirection: 'row',
    textAlign: 'center',
  },
  popuptextContainer: {
    marginVertical: 5,
  },
  close: {
    position: 'absolute',
    right: 7,
    top: 7,
  },

  donateBox: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    shadowRadius: 0.6,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  donateSmBox: {
    marginLeft: 15,
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  price: {
    color: '#555',
    fontSize: 15,
    marginTop: 5,
  },
});
