import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  const [fadeIn] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const stringifyAnimation = (value) => {
    return `${value}px`;
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        { categories && categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';
          const translateY = fadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
          });

          return (
            <Animated.View
              key={index}
              style={{
                transform: [{ translateY }],
                opacity: fadeIn,
                marginRight: hp(1.75),
              }}
            >
              <TouchableOpacity
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={{ alignItems: 'center' }}
              >
                <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(7), height: hp(7), borderRadius: hp(3) }}
                  />
                  {/* <CachedImage 
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(7), height: hp(7), borderRadius: hp(3) }}
                  /> */}
                </View>
                <Text style={{ fontSize: hp(1.6), color: '#333', marginTop: 5 }}>{cat.strCategory}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
