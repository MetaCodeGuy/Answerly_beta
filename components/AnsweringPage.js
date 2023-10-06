//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput, Alert } from 'react-native';
import Question from './Question';
import Header from './Header';
import { Button } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

// create a component
const AnsweringPage = ({ route }) => {
  const nav = useNavigation()
  const [Answer, setAnswer] = useState('')
  const [Profile, SetProfile] = useState()
  const [QuestData, setQuestData] = useState([])
  const { id, proData, setHomeUpdate } = route.params
  const GetData = async () => {
    const questref = doc(db, "Questions", id)
    const rawdat = await getDoc(questref)
    const data = rawdat.data()
    setQuestData(data)
  }

  const GetProfiledata = async () => {
    const proRef = collection(db, "Profiles")
    // const rawdata = await getDocs(proRef)
    // const filProData = rawdata.docs.map((doc)=>({...doc.data(),id:doc.id}))
    // SetProfile(filProData) 
    getDocs(proRef).then((data) => {
      SetProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  const AnswerHandler = () => {
   
    let UserCred = {}
    Profile.map((pro) => {
      if (pro.userid === auth.currentUser.uid) {
        UserCred.UserImg = (pro.UserImg)
        UserCred.UserName = (pro.username)
        UserCred.id = (pro.id)
        UserCred.points = pro.points
      }
    })
    try {

      const AnswerData = {
        answer: Answer,
        UserImg: UserCred.UserImg,
        UserName: UserCred.UserName,
        author: auth.currentUser.uid,
        questionid: id,
        CreatedAt:serverTimestamp()
      }
      const answerRef = collection(db, "Answers")
      if (!Answer) return Alert.alert("Type it...", 'Please type The Answer Before Posting')
      addDoc(answerRef, AnswerData).then(() => {
        setAnswer('')
        updateDoc(doc(db,"Profiles",UserCred.id),{
          points:Number(UserCred.points+QuestData.questPoint)
        }).then(()=>{
          Alert.alert("Boom!", "Answer Posted!")
          setHomeUpdate(prev=>!prev)
          nav.navigate('Home')
        })
      })
    } catch (error) {
 console.log(error)
    }

  }

  useEffect(() => {
    GetProfiledata().then(() => {
      GetData()
    })
    return () => { }
  }, [])

  return (
    <SafeAreaView className={'w-full h-full bg-white '}>
      <Header proData={proData} setHomeUpdate={setHomeUpdate} />
      {
        QuestData ? (<Question dat={QuestData} />) : undefined
      }
      <View className={'w-full h-[60%]'}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          value={Answer}
          onChangeText={(text) => setAnswer(text)}
          placeholder='Enter Your Answer Here (Keep it Short and Clear!)'
          className={'w-[95%]  mx-auto mt-4 border-2   border-gray-500 text-[16px] bg-gray-400  p-4 font-[600] rounded-md'}
          style={{ height: "70%", textAlignVertical: 'top', backgroundColor: '#fff' }}
        />
        <Button
          onPress={() => AnswerHandler()}
          color={"black"}
          containerStyle={{ width: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 15, borderRadius: 35 }}

        >
          Post Answer
        </Button>
      </View>
    </SafeAreaView>
  );
};


//make this component available to the app
export default AnsweringPage;