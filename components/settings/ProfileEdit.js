//import liraries
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/base';
import { Text } from '@rneui/themed';
import React from 'react';
import { Image, View } from 'react-native';


// create a component
const ProfileEdit = ({ dat }) => { 
    const nav = useNavigation()
    return (
        <View className={'w-[100%] relative h-full mx-auto bg-white flex flex-row justify-between items-center  rounded-md'}>
            <View className={'w-[30%]  flex justify-center items-center   h-full'}>
                <View className={"w-[90px] p-[3px] bg-purple-500 h-[90px] rounded-full  "}>
                    <Image

                        source={{
                            uri: dat.UserImg === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg' :
                                dat.UserImg === "Iron Girl" ? 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619' : dat.UserImg
                        }}
                        resizeMode='contain'
                        className={'w-full  h-full rounded-full'}
                    />
                </View>
            </View>
            <View className={'w-[70%] flex flex-col px-3 justify-center items-start h-[85%]'}>
                <Button
                    className={'absolute top-0 right-0'}
                    containerStyle={{ position: 'absolute', top: -10, right: 0 }}
                    onPress={() => { nav.navigate('Home') }}
                    color={'purple'}
                    icon={<Icon name='edit' color={'white'} />}
                />
                <Text h4>{dat.username}</Text>
                <View className={'h-[20%] mt-2  w-full '}>
                    <Image
                        className={"w-[35px] h-[35px] "}
                        resizeMode='contain'
                        source={require("../../assets/medals/gold-medal.png")}
                    />
                    <Text>Gold</Text>
                </View>
            </View>

        </View>
    );
};

// define your styles

//make this component available to the app
export default ProfileEdit;
