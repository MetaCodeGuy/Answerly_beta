//import liraries
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, FlatList, Image, ScrollView, Text, ActivityIndicator, Pressable } from 'react-native';
import Header from './Header'; 
import { Skeleton, Tab, TabView } from '@rneui/themed';
import Question from './Question';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, getDocs, namedQuery, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import AllAnswers from './AllAnswers';
import QuestionLoader from './QuestionLoader';
import Profile from './Profile';
import Categories from './Categories';


// create a component
const HomePage = () => {
  
  const nav = useNavigation()
  const [HomeUpdate, setHomeUpdate] = useState(false)
  const [index, setIndex] = useState(0);
  const [ProfileData, setProfileData] = useState([])
  //const [ShowWelcome, setShowWelcome] = useState(true)
  const [Data, setData] = useState([])
  const getData = async () => {
   
    const QuestRef = collection(db, 'Questions')
    const QuestQuery = query(QuestRef,orderBy("CreatedAt","desc"))
    const RawData = await getDocs(QuestQuery)
    const filteredData = RawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setData(filteredData) 
  }

  const getProfileData = async () => {
    try {
      const proref = collection(db, "Profiles")
      const rwdat = await getDocs(proref)
      const data = rwdat.docs.map((data) => ({ ...data.data(), id: data.id }))
      setProfileData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
    getProfileData()

    return () => { }
  }, [HomeUpdate])
{
  return (
    <SafeAreaView className={"w-full h-full bg-white"}>
      <View className={"w-full  h-full"}>
      

        <View style={{ flex: 1 }} className={'h-[65%] min-h-[300px]'}>

          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ width: '100%' }}>
              <ScrollView >
                {
                  Data && ProfileData ? Data.map((dat, index) => {
                    return <Question key={dat.id} dat={dat} showbtn={true} setHomeUpdate={setHomeUpdate} proData={ProfileData} />
                  }) : <ScrollView className={'w-full h-[75%]'}>
                    {[1, 2, 3, 4, 5, 7].map((dat, index) => { return <QuestionLoader key={index} />; })}
                  </ScrollView>}
              </ScrollView>
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}> 

 <Categories  setHomeUpdate={setHomeUpdate} proData={ProfileData} />
 
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <Profile proData={ProfileData} />
            </TabView.Item> 
          </TabView>
          <Tab
            value={index}
            containerStyle={{ borderTopColor: '#e0e0e0', borderTopWidth: 1 }}
            indicatorStyle={{ backgroundColor: 'black' }}
            onChange={(e) => setIndex(e)}
          >
            <Tab.Item  
            titleStyle={{color:'black',fontSize:10}}
             title={"Give Answer"}
              icon={{name:'article',type:'material',color:'black'}}
            />
            <Tab.Item
                title={"Find"}

                titleStyle={{color:'black',fontSize:10}}
              icon={{ name: 'search', type: 'ionicon', color: 'black' }}
            />
            <Tab.Item
            titleStyle={{color:'black',fontSize:10}}
                title={"Me"}
              icon={{ name: 'person', type: 'ionicon', color: 'black' }}
            />  
          </Tab> 
        </View>
      </View>
    </SafeAreaView>
  );
}
  

};



//make this component available to the app
export default HomePage;
