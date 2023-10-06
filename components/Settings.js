 
import { Button, Icon } from '@rneui/themed';
import { signOut } from 'firebase/auth'
import React from 'react'; 
import { View, Text,  Alert, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const Settings = ({ route }) => {
    const { setAuthScreenUpdate, proData } = route.params

    return (
        <SafeAreaView className={"w-full h-full  justify-evenly items-center flex flex-col "}> 


<View className={'w-[90%] h-[30%] '}>


</View>
            <TouchableOpacity className={'w-[90%] bg-white flex flex-row justify-start items-center h-[10%] max-h-[50px] rounded-md '} >
                 <Button
                 color={"red"}
                 
                 containerStyle={{borderRadius:10,marginLeft:10}}
                 icon={<Icon name="logout" color={"white"} type='material' size={25}/>}
                 />
                <Text onPress={() => {
                    signOut(auth).then(() => {
                        Alert.alert("Boom", "you Are Logged Out!")
                        AsyncStorage.clear()
                        setAuthScreenUpdate(prev => !prev);
                    })
                }} className={'text-red-500 ml-2 font-bold text-[16px]'}>Log Out</Text>
            </TouchableOpacity>

            


            <Text className={'  text-center '}>Please Note That Answerly is Not Fully Developed yet  This App is Still in Development </Text>
        </SafeAreaView>
    );
};
 
 
export default Settings;
