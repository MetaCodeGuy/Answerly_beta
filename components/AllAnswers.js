//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, useAnimatedValue } from 'react-native';
import Header from './Header';
import Question from './Question';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

// create a component
const AllAnswers = ({ route }) => {
    const [Data, setData] = useState([])
    const { question, setHomeUpdate, proData } = route.params
    console.log(proData,"\t from All Answer")
    const nav = useNavigation()
    const getData = async () => {
        const QuestRef = collection(db, 'Questions')
        const RawData = await getDocs(QuestRef)
        const filteredData = RawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setData(filteredData)
    }

    useEffect(() => {
        getData();
    }, [question])

    return (
        <View className={'w-full h-full b-white '}>
            <Header question={question} proData={proData} />
            <View className={"w-[full] flex flex-col  h-[90%]  "}>
                {/* <View className={'w-[150px] h-[30px] mx-auto flex justify-center items-center bg-[#A100FF] rounded-full'} >

                <Text className={'text-white'}>Post Your Question +</Text>
             </View> */}
             <Text className={'py-2 font-bold text-center text-blue-400'}>Not Found What You Searched For ? Try Posting </Text>
                <Button  title={"Post Your Question + "} onPress={() => { nav.navigate('AskQuestion', { quest: question, setHomeUpdate, proData }) }} className={'w-[50%] '} color={'black'} />
                <ScrollView style={{ flex: 1 }}  className={'w-[100%]  bg-white mx-auto '}>

                    {
                       Data ? Data.filter((dat) => {
                        if (dat.question.toLowerCase().includes(question.toLowerCase())) return dat
                         }).map((dat, index) =>{
                             if(dat) return <Question dat={dat} key={index} showbtn={true} proData={proData} />
                     }) : (
                        <Text>No Quesion? </Text>
                     )
                    }
                </ScrollView>
            </View>
        </View>
    );
};



//make this component available to the app
export default AllAnswers;
