import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Image, Animated } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';

import Loader from './Loader';

export default function Recipe({ meals, categories }) {
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='text-neutral-600 font-semibold'>Recipe</Text>

      <View>
        { categories.length == 0 || meals.length == 0 ? (
            <Loader size="large" className='mt-2'/>
        ) : ( 
            <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, i}) => <RecipeCard item={item} index={i} />}
                // refreshing={isLoadingNext}
                // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
            />
        )}
      </View>
    </View>
  )
}

const RecipeCard = ({ item, index }) => {
    const [fadeIn] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
    }, []);

    let isEven = index%2==0;
    return (
        <Animated.View style={{ opacity: fadeIn }}>
            <Pressable
                style={{
                  width: '100%',
                  paddingLeft: isEven ? 0 : 8,
                  paddingRight: isEven ? 8 : 0,
                  justifyContent: 'center',
                  marginBottom: 4
                }}
            >
                <Image
                source={{ uri: item.strMealThumb }}
                style={{
                    width: '100%',
                    height: index % 3 === 0 ? hp(25) : hp(35),
                    borderRadius: 35,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }}
                />
                <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', marginLeft: 4, color: '#333' }}>
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}