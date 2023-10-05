//import liraries
import { Icon } from '@rneui/base';
import { Button } from '@rneui/themed';
import { collection, doc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { db, storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; 
import { useNavigation } from '@react-navigation/native';

// create a component
const EditProfile = ({route}) => {
    const{data,setUpdate}=route.params
    const nav = useNavigation()
    const [image, setImage] = useState(data.UserImg);
    const[CurName,setCurName] = useState(data.username) 



    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
        });


        if (!result.canceled) {
            uploadImageAsync(result.assets[0].uri).then((url) => {
                setImage(url) 
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


    const UpdateProfile = ()=>{
       const proRef = doc(db,`Profiles`,data.id)
        updateDoc(proRef,{
            username:CurName,
            UserImg:image
        }).then(()=>{
            Alert.alert('Profile Updated',"Your Profile Was Changed Successfully")
            setUpdate(prev=>!prev)
            nav.navigate('Home')
        })

    }

    return (
        <View  className={'w-full h-full flex justify-center items-center'}>
            <View className={"w-[95%]  flex  justify-center items-center h-[25%] "}>
             <Image
            source={{
                uri: image === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg' :
                    image=== "Iron Girl" ? 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironshin-story-gwen-i03.jpg?1637132619' : image
            }}
             className={'w-24 h-24 rounded-full '}
             resizeMode='contain'
             />
            </View>
            <View>
                <Button
                title={"Pick From Gallery"}
                color={'black'}
            onPress={()=>pickImage()}
                icon={<Icon color={"white"} name='image' />}
                />
            </View>
            <TextInput
            autoFocus={true}
            maxLength={12}
            className={" bg-white text-[18px] font-bold my-4 py-2 px-16 rounded"}
            onChangeText={(txt)=>setCurName(txt)}
            value={CurName}
            />
            <Button
            title={"Save"}
  onPress={()=>UpdateProfile()}
            />
    </View>
    );
};
 
//make this component available to the app
export default EditProfile;
