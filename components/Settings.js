 
import { Button } from '@rneui/themed';
import { signOut } from 'firebase/auth'
import React from 'react'; 
import { View, Text,  Alert } from 'react-native';
import { auth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const Settings = ({ route }) => {
    const { setAuthScreenUpdate, proData } = route.params

    return (
        <SafeAreaView className={"w-full h-full  justify-evenly items-center flex flex-col "}> 

            <View className={'w-[90%] bg-white flex flex-col justify-center items-center h-[60%] rounded-md '} >
                <Text onPress={() => {
                    signOut(auth).then(() => {
                        Alert.alert("Boom", "you Are Logged Out!")
                        AsyncStorage.clear()
                        setAuthScreenUpdate(prev => !prev);
                    })
                }} className={'text-red-500 font-bold text-[16px]'}>Log Out</Text>
            </View>


            <Text className={'  text-center '}>Please Note That Answerly is Not Fully Developed yet  This App is Still in Development </Text>
        </SafeAreaView>
    );
};
 
 
export default Settings;
