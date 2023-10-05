 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import React  from 'react'; 

// create a component
const BottomNav = () => {
    
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      );
};
 

//make this component available to the app
export default BottomNav;
