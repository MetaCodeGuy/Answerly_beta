
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import AnsweringPage from './components/AnsweringPage'
import AskQuestion from './components/AskQuestionPage';
import AllAnswers from './components/AllAnswers';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authentication from './components/Auth';
import Settings from './components/Settings';
import Answer from './components/Answer';
import CreateProfile from './components/CreateProfile';
import AuthRoute from './routes/AuthRoute';
import HomeRoute from './routes/HomeRoute'; 
import { Image, View ,Text} from 'react-native';
const Stack = createNativeStackNavigator();
export default function App() {

  const [isAuth, setisAuth] = useState(false)
  const [Loaded, setLoaded] = useState(false)
  const [AuthScreenUpdate, setAuthScreenUpdate] = useState(false)
  const [isConnected, setisConnected] = useState(false)

  const ReadLocal = async () => {
    const locauth = await AsyncStorage.getItem("isAuth");
    setisAuth(Boolean(locauth));
    setLoaded(true)
  }
  const CheckConnection = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
if(res.ok) setisConnected(true)
     
    })
      .catch((err) => {
        console.log(err.code)
      })
  }

  useEffect(() => { 
    CheckConnection()
    ReadLocal();
  }, [AuthScreenUpdate])

  return (
    <NavigationContainer>{/* Rest of your app code */}

      {

        !isAuth && isConnected && Loaded ? <AuthRoute setAuthScreenUpdate={setAuthScreenUpdate} /> : isAuth && isConnected && Loaded  ? (<HomeRoute setAuthScreenUpdate={setAuthScreenUpdate} />) :
        Loaded && !isConnected ? (
        <View className={'w-full h-[100%]   flex bg-white justify-center items-center'}>

          <View className={'w-[80%] h-[35%] max-h-[230px] p-3 rounded-md  flex flex-col justify-between items-center '}>
            
          
          <Image
          className={'w-[100px] h-[100px] '}
          resizeMode='contain'
          source={require('./assets/no-wifi.png')}
          />
          <Text className={'text-center text-xl  px-2 font-bold '}>Please Connect To The Internet! and reopen This App</Text>
          </View>
          
          </View>):undefined
      }
    </NavigationContainer>
  );
}

