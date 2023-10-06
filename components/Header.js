//import liraries
import React, { useState } from 'react';
import { View, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// create a component
const Header = ({ question, setHomeUpdate, proData }) => {
    const [userQuestion, setUserQuestion] = useState(question ? question : '')
    const nav = useNavigation()
    return (
        <KeyboardAvoidingView  className={'w-full h-[20%] flex flex-col border-b-gray-300 border-b justify-center min-h-[70px] items-center max-h-[100px]'}>
 
            
            <View className={'w-[95%]  flex flex-row justify-center  items-center h-[50%] max-h-[50px] '}>
               
                <TextInput
                    onPressIn={() => Keyboard.dismiss()}
                    onChangeText={(text) => setUserQuestion(text)}
                    value={userQuestion}
                    placeholder='Ask Your Question Here..'
                    className={' w-[80%] h-full rounded-tl-[10px] min-h-[30px] rounded-bl-[10px] bg-gray-200 px-2 text-[18px] '}
                    inputStyle={{ color: '#A100FF', fontWeight: "900", paddingHorizontal: 5 }}
                    inputContainerStyle={{ borderRadius: 35, width: 50, margin: 0, backgroundColor: '#fff', position: "relative", borderBottomWidth: 0 }} />

                <Button
                    icon={<Icon name='search' size={30} color={'white'} />}
                    containerStyle={{ width: '15%', height: "100%" }}
                    onPress={() => nav.navigate('AllAnswers', { question: userQuestion, setHomeUpdate, proData })}
                    buttonStyle={{ backgroundColor: 'black', height: "100%", borderTopEndRadius: 10, borderBottomRightRadius: 10 }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};


//make this component available to the app
export default Header;
