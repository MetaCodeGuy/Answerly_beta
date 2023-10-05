import { Avatar } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'


const Welcome = ({ dat, setShowWelcome }) => {
  return (
    <LinearGradient
      className={"w-[30%] min-w-[100px]  h-[90%]  rounded-[20px]  flex flex-col justify-center items-center  "} 
      start={{ x: .1, y: .3 }}
      end={{ x: 1, y: .9 }}
      colors={['#A100FF', '#6E00FF']}>
      <Image
        source={{
          uri: dat.UserImg === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg' :
            'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619'
        }}
        resizeMode='contain'
        style={{ padding: 10 }}
        className={'w-[45px] h-[45px]  p-[5px] bg-white rounded-full '}
      />
      <Text className={'text-white text-[16px] w-full text-center  font-[900] '} >Welcome Back {dat.username}!</Text>


    </LinearGradient>
  );
};


//make this component available to the app
export default Welcome;
