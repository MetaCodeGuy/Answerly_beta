//import liraries
import React  from 'react';
import { View, Text, ScrollView, Image, Pressable  } from 'react-native';
import Header from './Header';

// create a component
const Categories = ({setHomeUpdate,proData}) => {
const CatData = [
    { label: 'Mathematics', value: require('../assets/categories/mathematics.png')},
    { label: 'Biology', value: require('../assets/categories/biology.png') },
    { label: 'General', value:require('../assets/categories/mathematics.png') },
    { label: 'Physics', value:require('../assets/categories/mathematics.png') },
    { label: 'Chemistry', value: require('../assets/categories/chemistry.png') },
    { label: 'Computer Science', value:require('../assets/categories/computer-science.png') },
    { label: 'English', value: require('../assets/categories/english.png') },
    { label: 'Tamil', value: require('../assets/categories/mathematics.png')},
    { label: 'Accountancy', value: require('../assets/categories/mathematics.png') },
    { label: 'Commerce', value: require('../assets/categories/mathematics.png') },
    { label: 'Engineering', value: require('../assets/categories/mathematics.png') },
    { label: 'Programming', value: require('../assets/categories/mathematics.png') },
    { label: 'Computer Application', value: require('../assets/categories/mathematics.png') },
    { label: 'Hindi', value: require('../assets/categories/mathematics.png')},
    { label: 'Cooking', value:require('../assets/categories/mathematics.png') },
    { label: 'Electronics', value: require('../assets/categories/mathematics.png') },
]
    return (
        <View>
            <Header setHomeUpdate={setHomeUpdate} proData={proData}/>
        <ScrollView className={'w-full h-[80%] flex'} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}>
        
             {
       CatData.map((dat,index)=>{
        return (
            <Pressable key={index}>
            <View className={'w-[80px] flex justify-evenly items-center h-[80px] rounded  m-5'}>
                      <Image
                      resizeMode='contain'
                      className={'w-[40px] h-[40px]'}
                      source={dat.value}
                      />
                      <Text className={'text-center text-[13px]'}>{dat.label}</Text>
                </View>
                
            </Pressable>
        )
       })
             }
        </ScrollView>
        
            
        </View>
    );
};
 

//make this component available to the app
export default Categories;
