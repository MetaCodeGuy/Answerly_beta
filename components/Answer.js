//import liraries
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { db } from '../firebase/config';
import Question from './Question';
import BigAnswer from './BigAnswer';
import Header from './Header';

// create a component
const Answer = ({route}) => {
    const{id,proData,setHomeUpdate} = route.params
   const [Data,setData]= useState([])
   const[Updated,setUpdated] = useState(false)
   const [AnswerData,setAnswerData] =useState([])
    const getData = async()=>{
        const QuestRef = doc(db,"Questions",id)
       const RawData = await getDoc(QuestRef) 
        setData(RawData.data()) 
    }

    const getAnswerData = async()=>{
        const AnsRef = collection(db,'Answers')
       const RawData = await getDocs(AnsRef)
       const filteredData = RawData.docs.map((doc)=>({...doc.data(),id:doc.id}))
        setAnswerData(filteredData)
    }
 
    useEffect(()=>{
getData();
getAnswerData()
return ()=>{}
    },[Updated])
    return (
        <View className={'w-full h-full bg-white '}>
          
           {
            Data ?
            <View className={'w-full max-h-[130px]  h-[25%]'}>
            <Question  dat={Data}/>
            </View>
             :undefined
           }
           <ScrollView > 
            <Text className={'text-[16px] p-1 mb-4'}>Answers : {AnswerData.filter((dat)=>dat.questionid.trim() == id).length}</Text>
           {
            AnswerData ?AnswerData.map((dat,index)=>{
                if(dat.questionid.trim() == id){ 
                    return <BigAnswer setUpdated={setUpdated} dat={dat} key={index}/> 
            }
            }):undefined
           } 
           </ScrollView>
        </View>
    );
};

 
//make this component available to the app
export default Answer;
