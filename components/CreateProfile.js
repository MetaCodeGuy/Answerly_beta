
import { Button } from '@rneui/base';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, Image, Pressable, KeyboardAvoidingView } from 'react-native';
import { auth, db, storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// create a component
const CreateProfile = ({ route }) => {
    const [UserName, setUserName] = useState('')
    const nav = useNavigation()
    const [UserProfileic, setuserProfilePic] = useState('Iron Man')
    const [image, setImage] = useState('');
    const { setAuthScreenUpdate } = route.params
    const [UserImg, setUserImg] = useState("Iron Man")
    const CreateProfile = () => {
        const proref = collection(db, "Profiles")
        const ProfileData = {
            UserImg: UserProfileic,
            username: UserName,
            points:0,
            userid: auth.currentUser.uid
        }
        if (!UserImg || !UserName) return Alert.alert("Complete Every Filed!", "Please Fill Everything to Create Your Profile! ")
        addDoc(proref, ProfileData).then(() => {
            Alert.alert("BOOM!", "Your Profile Was Created Successfully!")
            AsyncStorage.setItem('isAuth', 'true')
            setAuthScreenUpdate(prev => !prev)
        })
    }



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
 

        if (!result.canceled) {
            uploadImageAsync(result.assets[0].uri).then((url) => {
                setuserProfilePic(url)
            })
            setImage(result.assets[0].uri);
        }
    };


    const uploadImageAsync = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        try {
            const PicRef = ref(storage, `ProfilePics/image-${Math.floor(Math.random() * 3000 + 3)}-${Date.now()}`)
            const result = await uploadBytes(PicRef, blob)
            blob.close()
            return await getDownloadURL(PicRef)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className={'w-full h-full flex justify-center items-center '}>
            <Image
                source={require('../assets/adaptive-icon.png')}
                className={'w-[100px] mb-4 rouned-[10px] h-[100px]'}
                resizeMode='contain'
            />
            <KeyboardAvoidingView className={'w-[90%] h-[60%] justify-evenly items-center bg-white min-h-[350px] flex p-2 rounded-sm flex-col  '} >

                <View className={"w-[80%] h-[50%]  flex flex-col mx-auto"}>

                    <View className={'w-[100%] flex p-2 flex-row justify-evenly items-center'}>
                        <Text className={'text-[18px] text-gray-600 font-bold'}>Choose Avatar : <Text>{UserProfileic.slice(0,10)}...</Text></Text>
                    </View>

                    <View className={'w-[85%]  h-[35%] flex  mx-auto flex-row justify-evenly items-center'}>
                        <Pressable onPress={() => { setuserProfilePic("Iron Man") }}><Image source={{ uri: 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg' }} resizeMode='contain' className={'rounded-full h-[60px]  w-[60px] '} /></Pressable>
                        <Pressable onPress={() => { setuserProfilePic("Iron Girl") }} ><Image source={{ uri: 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619' }} resizeMode='contain' className={'rounded-full h-[60px] w-[60px] '} /></Pressable>
                    </View>


                    <Text className={'text-center my-3 font-bold '}>Or</Text>
                    <Button title={"Pick From Gallery"} onPress={() => pickImage()} />
                </View>
                <View className={'w-full h-[15%]'}>
                    <TextInput
                        value={UserName}
                        className={"border-2 border-gray-500 rounded font-bold p-2 h-full w-[95%]  text-[16px] mx-auto"}
                        onChangeText={(txt) => setUserName(txt)}
                        maxLength={12}
                        placeholder='Enter Your Name (e.x Nithish)'
                    />

                </View>

                <Button title={"Create Profile"} onPress={() => CreateProfile()} />

            </KeyboardAvoidingView>
        </View>
    );
};


//make this component available to the app
export default CreateProfile;
