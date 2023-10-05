//import liraries
import { Skeleton } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

// create a component
const ProfileLoader = () => {
    return (
        <>
        <Skeleton circle width={90} height={90} /> 
  <View className={"w-[60%] h-full  flex flex-col justify-center items-start "}>

  <Skeleton width={"95%"} height={"15%"}  style={{marginBottom:2}}/>
  <Skeleton width={"85%"} height={"15%"}style={{marginBottom:6}}  />
  <Skeleton width={"60%"} height={"10%"} />
  </View> 
  </>
    );
};

 

//make this component available to the app
export default ProfileLoader;
