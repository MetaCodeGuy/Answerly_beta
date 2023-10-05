//import liraries
import React, { useEffect, useState }  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from '../components/Auth';
import CreateProfile from '../components/CreateProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
// create a component
const AuthRoute = ({setAuthScreenUpdate }) => {
    const[Signed,setSigned]=useState(false) 
    const ReadLocal =async ()=>{
    const res =await AsyncStorage.getItem('signed')
    setSigned(Boolean(res));
    }

    useEffect(()=>{
      ReadLocal();
    },[])

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='Auth' component={Authentication} initialParams={{ setAuthScreenUpdate ,setSigned}} />
             <Stack.Screen options={{ headerShown: false }} name='CreateProfile' component={CreateProfile} initialParams={{ setAuthScreenUpdate }} />
        </Stack.Navigator>
    );
};
 
//make this component available to the app
export default AuthRoute;
