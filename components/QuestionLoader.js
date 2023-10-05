//import liraries
import { Skeleton } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const QuestionLoader = () => {
  return (
    <View className={'flex w-[95%]  mx-auto h-[20%] border-b py-3 border-gray-200 max-h-[190px] mt-2 flex-col justify-evenly items-center '}>
      <View className={' w-[95%] flex flex-row  items-center'}>
        <Skeleton  width={50} height={50} style={{borderRadius:100}}/>
        <Skeleton  width={"30%"} height={20} style={{marginLeft:5}}/>
      </View>
      <Skeleton width={"95%"} style={{marginTop:15,marginBottom:10}} height={"70%"}/>

    </View>
  );
};



//make this component available to the app
export default QuestionLoader;

