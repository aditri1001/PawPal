import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "./login-singup/login";
import SignupForm from "./login-singup/signup";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { useAuth } from "../AuthContext";
import { Keyboard } from "react-native";

const Stack = createStackNavigator();

const Navigation = () => {
  const { isLogin, setIsLogin, userId, setUserId } = useAuth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      {isLogin ? (
        <Tabs tabBar={props => (!isKeyboardVisible ? <TabBar {...props} /> : null)} initialRouteName="home">
          <Tabs.Screen name="home" options={{ title: "Home", headerShown: false }} />
          <Tabs.Screen name="cats" options={{ title: "Cats", headerShown: false }} />
          <Tabs.Screen name="dogs" options={{ title: "Dogs", headerShown: false }} />
          <Tabs.Screen name="services" options={{ title: "Services", headerShown: false }} />
          <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }} initialParams={{ userId }} />
          <Tabs.Screen name="profile-page/wallet" options={{ title: "Wallet", headerShown: false }} />
          <Tabs.Screen name="profile-page/dog-breed-detail" options={{ title: "Dog Breed Detail", headerShown: false }} />
          <Tabs.Screen name="profile-page/cat-breed-detail" options={{ title: "Cat Breed Detail", headerShown: false }} />
          <Tabs.Screen name="profile-page/cart" options={{ title: "Cart", headerShown: false }} />
          <Tabs.Screen name="profile-page/support-me" options={{ title: "Suppport Me", headerShown: false }} />
          <Tabs.Screen name="profile-page/check-out" options={{ title: "Check Out", headerShown: false }} />
          <Tabs.Screen name="profile-page/about-me" options={{ title: "Check Out", headerShown: false }} />
          <Tabs.Screen name="home-pages/adoption-form" options={{ title: "Pet Aboption", headerShown: false }} />
        </Tabs>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginForm {...props} setIsLogin={setIsLogin} setUserId={setUserId} />}
          </Stack.Screen>
          <Stack.Screen name="Signup" component={SignupForm} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Navigation;
