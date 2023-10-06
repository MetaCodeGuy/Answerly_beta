//import liraries
import { useNavigation } from '@react-navigation/native'; 
import React from 'react';
import {  Icon, Skeleton } from '@rneui/themed';
import { View, Text, Image, Pressable, Alert } from 'react-native'; 
import { Button } from '@rneui/themed'; 
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

// create a component
const Question = ({ showbtn, dat, ProData ,setHomeUpdate }) => { 
    let time = (new Date(dat?.CreatedAt?.seconds * 1000)).toDateString().split(" ") 
    const navigation = useNavigation() 
    if (dat.question) {
        return (
<Pressable onPress= {() => navigation.navigate("Answer", { id: dat.id,ProData,setHomeUpdate })}> 

            <View 
                className={'w-[95%] flex flex-col mt-2 border-b border-b-stone-300  rounded-sm  justify-evenly min-h-[120px] max-h-[200px]  items-start mx-auto '}
            >
              
            

               {true?<View className={'  flex flex-row  justify-start items-center  w-full h-[30%]'}>
                    <View className={'w-fit h-full flex  flex-row justify-center items-center '}>
                        <Image
                            source={{
                                uri: dat.UserImg === "Iron Man" ? 'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg'
                                    : dat.UserImg === "Iron Girl" ? 'https://cdnb.artstation.com/p/assets/images/images/043/389/817/large/mironishin-story-gwen-i03.jpg?1637132619' :
                                        dat.UserImg
                            }}
                            resizeMode='contain'
                            className={'w-[40px] h-[40px] rounded-full'}
                        />
                    </View>
                        <Text className={'text-gray-600 font-bold text-[14px] ml-1 h-fit max-w-[150px]'}>{dat.subject} •</Text>
                      <Text>{dat.questPoint || 0} Point • {time[1]}-{time[2]} {time[3]}</Text>

               {  !showbtn    ? <Button
              color={"#ff353f"}
             containerStyle={{marginLeft:'auto'}}
             onPress={()=>{
                deleteDoc(doc(db,"Questions",dat.id)).then(()=>{
                    Alert.alert("Question Deleted")
                    setHomeUpdate(prev=>!prev)
                })
             }}
              icon={<Icon name='delete' size={25} type='material' color={"white"}/>}
              />:undefined}
                
                </View>:undefined

} 
                <View className={'h-[65%] w-full  flex-col  justify-between items-start'}>
                    <Text className={'text-[16px]  font-[900] p-1'}>{dat.question} ?</Text>
                    <View className={'w-full h-[40%]   flex flex-row justify-between items-center   mb-3'}>

                        {showbtn ? <Button onPress={() =>
                         (navigation.navigate('answeringpage', { id: dat.id, ProData,setHomeUpdate }))} title={"Give Answer"} 
                         color={"black"}
                         containerStyle={{marginLeft:'auto',borderRadius:60}}
                        // buttonStyle={{backgroundColor:'white',marginLeft:'auto'}} 
                        // titleStyle={{color:'purple',padding:0,textAlign:'center',margin:0,fontSize:14}}
                        //  containerStyle={{width:130,height:40,borderColor:'purple',borderWidth:2,marginLeft:'auto',borderRadius:100,}} 
                         /> : undefined}
                    </View>
                </View>
            </View>
            </Pressable>
        );
    } else {
        return (
            <View className={'flex w-[95%] mx-auto  max-h-[100px] mt-2 flex-row justify-evenly items-center '}>
                <Skeleton circle width={50} height={50} />
                <View className={'w-[75%] h-full flex flex-col justify-center'}>
                    <Skeleton width={'85%'} style={{ marginBottom: 2 }} height={20} />
                    <Skeleton width={'75%'} style={{ marginBottom: 6 }} height={15} />
                    <Skeleton width={'40%'} style={{ marginBottom: 2 }} height={10} />
                </View>
            </View>
        )
    }
}
//make this component available to the app
export default Question;
