//import liraries
import React, { useState } from 'react';
import { TextInput, View, Text, Alert } from 'react-native';
import Header from './Header';
import { Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

// create a component
const AskQuestion = ({ route }) => {
    const { quest, setHomeUpdate, proData } = route.params
    console.log(proData,"----------------\n")
    const nav = useNavigation()
    const [open, setOpen] = useState(false);
    const [Question, setQuestion] = useState(quest ? quest : '')
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Biology', value: 'Biology' },
        { label: 'Business', value: 'Business' },
        { label: 'General', value: 'General' },
        { label: 'Physics', value: 'Physics' },
        { label: 'Chemistry', value: 'Chemistry' },
        { label: 'Computer', value: 'Computer' },
        { label: 'English', value: 'English' },
        { label: 'Tamil', value: 'Tamil' },
        { label: 'Accountancy', value: 'Accountancy' },
        { label: 'Commerce', value: 'Commerce' },
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Programming', value: 'Programming' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Cooking', value: 'Cooking' },
        { label: 'Electronics', value: 'Electronics' },
    ]);

    const PostQuestion = () => {
        let UserCred = {}
        proData.map((pro) => {
            if (pro.userid == auth.currentUser.uid) {
                UserCred.UserImg = (pro.UserImg)
                UserCred.UserName = (pro.username)
            }
        })
        const QuestionData = {
            subject: value,
            UserImg: UserCred.UserImg,
            username: UserCred.UserName,
            question: Question,
            author: auth.currentUser.uid,
            CreatedAt: serverTimestamp()
        }
        if (!value || !Question) return
        try {
            const questref = collection(db, "Questions")
            addDoc(questref, QuestionData).then(() => {
                Alert.alert("Boom!", "Your Question Was Posted!")
                setQuestion('')
                setHomeUpdate(prev => !prev)
                nav.navigate('Home')
            })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View className={'w-full  h-full'}>
            <Header />
            <View>
                <TextInput
                    multiline={true}
                    numberOfLines={2}
                    value={Question}
                    onChangeText={(txt) => setQuestion(txt)}
                    placeholder='Enter Your Question Here (Keep it Short and Clear!) to Get The Best Answer!'
                    className={'w-[95%] max-h-[300px] mt-3 border-gray-400 border-2 mx-auto rounded-[15px] bg-white  text-[18px] p-4 font-[600]'}
                    style={{ height: "50%", textAlignVertical: 'top' }}
                />
                <View className={'w-full px-3 h-[15%]'}>
                    <Text className={'text-[18px] mt-2 mb-3  font-bold'}>
                        Select Subject
                    </Text>
                    <DropDownPicker
                        open={open}
                        modalContentContainerStyle={{ borderWidth:0 }}
                        value={value}
                        containerStyle={{ borderWidth: 0 }}
                        style={{ borderWidth: 2 ,borderColor:'gray'}}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />

                </View>
                <Button
                    onPress={() => PostQuestion()}
                    color={'black'}
                    containerStyle={{ width: 200, marginLeft: 'auto', marginRight: 'auto', marginTop: 30, borderRadius: 35 }}
                >
                    Post Question
                </Button>
            </View>
        </View>
    );
};



//make this component available to the app
export default AskQuestion;
