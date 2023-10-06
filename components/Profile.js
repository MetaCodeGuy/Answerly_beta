//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// create a component
const Profile = ({setHomeUpdate , HomeUpdate}) => {
  const Ranks = ["Learner","Rookie","Master","Lord","Genius"]
  const [Update, setUpdate] = useState(false)
  const nav = useNavigation()
  const [Profiles, setprofiles] = useState({})
  const [ThisUserProfile, setThisUserProfile] = useState()



  const getProfileData = async () => {
    try {
      const proref = collection(db, "Profiles")
      const rwdat = await getDocs(proref)
      const data = rwdat.docs.map((data) => ({ ...data.data(), id: data.id }))
      setprofiles(data)
      data.map((dat) => {
        if (dat.userid === auth.currentUser.uid) {
          setThisUserProfile(dat)
        }
      })

    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    getProfileData()
    return () => { }
  }, [HomeUpdate,Update])

  return (
    <View className={'w-full h-full '}>
      <View className="w-full flex justify-center items-center h-[40%] ">

        <View className={'w-[95%]  h-[45%]  flex relative flex-row  justify-evenly items-center  mx-auto '}>
          {/* <Image
            className={'w-[80px] h-[80px] rounded-full'}
            resizeMode='contain'
            source={{ uri: ThisUserProfile.UserImg==="Iron Man"?"": ThisUserProfile?.UserImg }}
          /> */}
          <Image
            source={{
              uri: ThisUserProfile?.UserImg === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg'
                : ThisUserProfile?.UserImg === "Iron Girl" ? 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619' :
                  ThisUserProfile?.UserImg
            }}
            resizeMode='contain'
            className={'w-[70px] h-[70px] rounded-full'}
          />
          <View className={'w-[50%]  flex flex-col justify-center  items-start  h-full '}>
            <Text className={" ml-2 text-[18px]  font-bold "}>{ThisUserProfile?.username}</Text>
            <View className={' flex flex-row items-center justify-evenly w-[100px] h-[30%] '}>
              <Image
                source={require('../assets/medals/gold-medal.png')}
                className={'w-[30px] h-[30px]'}
                resizeMode='contain'
              />
              <Text className={'text-blue-500'}>{Number(ThisUserProfile?.points ||0)<50?Ranks[0]:Number(ThisUserProfile?.points||0)<100?Ranks[1]:'No Rank'}({Number(ThisUserProfile?.points) || 0 })</Text>
            </View>


          </View>
          <Button color={'black'} onPress={() => { nav.navigate('EditProfile', { data: ThisUserProfile, setUpdate }) }} icon={<Icon name='edit' color={'white'} size={30} />} />

        </View>

        <View className={'w-[95%] flex flex-row justify-evenly items-center  h-[30%] '}>
          <View className={'w-[45%] flex justify-center items-center h-[75%] bg-gray-100 rounded-[10px]'}>
            <Text className={'font-bold text-[16px] '}>Following 0</Text>
          </View>
          <View className={'w-[45%] h-[75%] flex justify-center items-center bg-gray-100 rounded-[10px]'}>
            <Text className={'font-bold text-[16px] '}>Followers 10</Text>
          </View>
        </View>

      </View>


      <View className={' w-[95%] mx-auto h-[10%] flex flex-row  justify-start items-center border-b border-b-gray-200'}>
     
      <Image
      resizeMode='contain'
      className={"w-[30px]"}
      source={require('../assets/adaptive-icon.png')}
      />
        <Text className={'text-[16px] ml-2 font-bold '}> About Answerly</Text>
      </View>


      <View className={' w-[95%] mx-auto h-[10%] flex flex-row  justify-start items-center border-b border-b-gray-200'}>
        <Icon name='chat' className={'w-[15%] h-full '} />
        <Text className={'text-[16px] ml-2 font-bold '}>My Answers</Text>
      </View>

      <View className={' w-[95%] mx-auto h-[10%] flex flex-row  justify-start items-center border-b border-b-gray-200'}>
        <Icon name='message' className={'w-[15%] h-full '} />
        <Text className={'text-[16px] ml-2 font-bold '}>My Questions</Text>
      </View>

      <View onTouchEnd={() => { nav.navigate('Settings') }} className={' w-[95%] mx-auto h-[10%] flex flex-row  justify-start items-center border-b border-b-gray-200'}>
        <Icon name='settings' className={'w-[15%] h-full '} />
        <Text className={'text-[16px] ml-2 font-bold '}>Settings</Text>
      </View>
      <Text className={' mt-4 text-center text-gray-500'}>Version 1.0 Beta Testing Prototype By <Text className={'text-blue-400 font-bold'}>Nithish😎</Text></Text>
    </View>
  );
};



//make this component available to the app
export default Profile;
