import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';

const noRoute = ['_sitemap', '(tabs)', 'login-singup/login', 'login-singup/signup', '+not-found', 'profile-page/wallet', 'profile-page/dog-breed-detail', 'profile-page/cat-breed-detail', 'Navigation', 'profile-page/cart', "profile-page/support-me" ,"profile-page/check-out", "profile-page/about-me", "home-pages/adoption-form"]

const TabBar = ({ state, descriptors, navigation }) => {


  const primaryColor = '#0891b2';
  const greyColor = '#737373';
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;


        if (noRoute.includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        )

        // return (
        //   <TouchableOpacity
        //     key={route.name}
        //     style={styles.tabbarItem}
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? { selected: true } : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //   >
        //     {
        //         icons[route.name]({
        //             color: isFocused? primaryColor: greyColor
        //         })
        //     }
        //     <Text style={{ 
        //         color: isFocused ? primaryColor : greyColor,
        //         fontSize: 11
        //     }}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        // );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 20
  }
})

export default TabBar