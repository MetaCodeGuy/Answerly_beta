//import liraries
import { Button } from '@rneui/base';
import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { auth, db } from '../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { Icon } from '@rneui/themed';

// create a component
const BigAnswer = ({ dat, setUpdated }) => {
    const DeleteAnswer = () => {
        const ansref = doc(db, "Answers", dat.id)
        deleteDoc(ansref).then(() => {
            Alert.alert("BooM!", "Answer Deleted!!!")
            setUpdated(prev => !prev)
        })
    }
    return (
        <View className={'w-[95%] rounded-[10px]  mb-2 flex flex-col bg-white border border-cyan-500   h-fit mx-auto'} >
            <View className={"w-full bg-cyan-500 rounded  flex flex-row items-center justify-center h-[50px] "} >
                <Text className={'text-white font-bold text-[16px]  ml-2'}>Answer</Text>
                {dat.author == auth.currentUser.uid ? <Button icon={<Icon name='delete' color={'white'} />} color={"#ff353f"} onPress={() => DeleteAnswer()} containerStyle={{ marginLeft: 'auto' }} /> : undefined}
            </View>

            <View className={'p-2 flex justify-center items-center  w-full'}>
                <Text className={'text-[16px] mb-2 font-[900]    w-[95%]'}>
                    {dat.answer}
                </Text>
            </View>
            <View className={'W-[20%] flex flex-row justify-evenly items-center'}>
                <View className={'w-full  flex justify-start items-center flex-row h-full p-2'}>
                    <Image
                        source={{
                            uri: dat.UserImg === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg'
                                : dat.UserImg === "Iron Girl" ? 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619' :
                                    dat.UserImg
                        }}
                        className={'h-[40px] w-[40px] rounded-full  '}
                    />
                    <Text className={'text-center ml-2 font-bold '}>{dat.UserName}</Text>
                </View>

            </View>


        </View>
    );
};



//make this component available to the app
export default BigAnswer;
