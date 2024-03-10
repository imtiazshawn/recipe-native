import React, { useEffect, useRef } from 'react';
import { Image, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const animatedPadding = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animatedPadding, {
      toValue: hp(5),
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);

  return (
    <View className='flex-1 justify-center items-center bg-amber-500' style={{ padding: hp(5) }}>
      <StatusBar style='light' />

      {/* Logo  */}
      <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 999, padding: animatedPadding }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 999, padding: hp(5.5) }}>
          <Image source={require('../../assets/images/welcome.png')} style={{ width: wp(40), height: hp(20) }} />
        </View>
      </Animated.View>

      {/* Title */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: hp(5), fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 1 }}>RecipeNative</Text>
        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 1 }}>Food is always Right!</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
