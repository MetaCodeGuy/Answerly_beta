//import liraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../components/HomePage';
import AnsweringPage from '../components/AnsweringPage'
import AskQuestion from '../components/AskQuestionPage';
import AllAnswers from '../components/AllAnswers';
import Answer from '../components/Answer';
import Settings from '../components/Settings';
import LeaderBoard from '../components/LeaderBoard';
import EditProfile from '../components/EditProfile';
const Stack = createNativeStackNavigator();
// create a component
const HomeRoute = ({ setAuthScreenUpdate }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='Home' component={HomePage} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='answeringpage' component={AnsweringPage} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='AskQuestion' component={AskQuestion} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='AllAnswers' component={AllAnswers} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='Answer' component={Answer} />
            <Stack.Screen options={{ headerShown: false,statusBarColor: 'black' }} name='Settings' component={Settings} initialParams={{ setAuthScreenUpdate }} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='LeaderBoard' component={LeaderBoard} initialParams={{ setAuthScreenUpdate }} />
            <Stack.Screen options={{ headerShown: false, statusBarColor: 'black' }} name='EditProfile' component={EditProfile} />
        </Stack.Navigator>
    );
};


//make this component available to the app
export default HomeRoute;
