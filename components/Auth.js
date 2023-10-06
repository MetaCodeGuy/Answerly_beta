//import liraries
import { Button, Text } from '@rneui/themed';  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'; 
import { View, Alert, TextInput, Image, KeyboardAvoidingView } from 'react-native';  
import { auth, db } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateProfile from './CreateProfile';
import { useNavigation } from '@react-navigation/native';


// create a component
const Authentication = ({route}) => {
  const {setAuthScreenUpdate } = route.params 
  const[UserData,setUserData] = useState({})
  const nav  = useNavigation()
  const CreateAccount = ()=>{
    try {
      createUserWithEmailAndPassword(auth,UserData.Email,UserData.Password).then(()=>{
        Alert.alert("Boom You are Now A Member of Answerly!","Use It Wisely!")
        nav.navigate('CreateProfile',{setAuthScreenUpdate})
      })
      .catch((err)=>{
        console.log(err.code)
        switch(err.code){
          case "auth/email-already-in-use":
            LoginAccount()
            break;
        }
      }) 
    } catch (error) {
      
    }
  }


  const LoginAccount = ()=>{
    try {
      signInWithEmailAndPassword(auth,UserData.Email,UserData.Password).then(()=>{
        Alert.alert("Boom Welcome Back","We Are Proudly Welcome you Back To Answerly ")
        AsyncStorage.setItem('isAuth', 'true')
        setAuthScreenUpdate(prev => !prev) 
      })
      .catch((err)=>{
        console.log(err.code)
        switch(err.code){
        case "auth/wrong-password":
          Alert.alert('Wrong Password',"Check Your Password!")
        }
      }) 
    } catch (error) {
      
    }
  }

    return (
        <KeyboardAvoidingView enabled={true} behavior="height" className={'w-full h-full flex justify-center  items-center'} >  
 
        <View className={'bg-white  w-[85%] flex flex-col p-3 justify-evenly items-center h-[60%] max-h-[450px] min-h-[350px] rounded-[5px]'} >
          <Image
          source={require('../assets/adaptive-icon.png')}
          className={'w-[100px] rounded-[10px] h-[100px]'}
          resizeMode='contain'
          />
        <TextInput
        className={'p-3 w-[95%] text-[16px] bg-white border-2  border-gray-400  rounded'}
        value={UserData.Email}
        placeholder='Enter Your Email..'
        onChangeText={(txt)=>setUserData(prev=>({...prev,Email:txt}))}
        />
         <TextInput
         value={UserData.Password}
         className={'p-3 w-[95%] text-[16px] my-5 bg-white border-2 border-gray-400 rounded '}
        placeholder='Enter Your Password..'
        onChangeText={(txt)=>setUserData(prev=>({...prev,Password:txt}))}
        secureTextEntry={true}
        />
           <Button
           title={"Sign In"} 
    
    onPress={()=>CreateAccount()}
           />
           <Text className={"mt-5 text-[16px] "}>Already A Member ? Try <Text onPress={()=>LoginAccount()} className={'text-blue-600 underline border-blue-600 border-[1px] p-2'} style={{color:'blue'}}>Login</Text></Text>
        </View>
        
        </KeyboardAvoidingView>
    );
};

 

//make this component available to the app
export default Authentication;
