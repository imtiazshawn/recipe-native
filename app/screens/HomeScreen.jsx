import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

import Recipe from '../components/Recipe';
import Categories from '../components/Categories';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipe();
  }, []);

  // Change Category
  const handleChangeCategory = category => {
    getRecipe(category);
    setActiveCategory(category);
    setRecipeData([]);
  }

  // Category API Fetch
  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {

    }
  }

  // Category Data API Fetch
  const getRecipe = async (category = 'beef') => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setRecipeData(response.data.meals);
      }
    } catch (error) {

    }
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        {/* Avatar */}
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(6.5), height: hp(6.5) }} />
          <BellIcon size={hp(5)} color='gray' />
        </View>

        {/* Greetings */}
        <View className='mx-4 space-y-2 mb-2'>
          <Text style={{ fontSize: hp(1.7) }} className='text-neutral-500'>Hello, Shawn</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className='text-neutral-600 font-semibold'>Make your own food</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className='text-neutral-600 font-semibold'>Stay At
            <Text className='text-amber-400'>{" "}Home</Text>
          </Text>
        </View>

        {/* Searchbar */}
        <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            style={{ fontSize: hp(1.7) }}
            className='flex-1 text-base mb-1 pl-3 tracking-wider'
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray' />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* Recipe */}
        <View>
          <Recipe meals={recipeData} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}