import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';

import MenuIcon from './src/icons/MenuIcon';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';
import { ModalProvider } from './src/context/ModalContext';
import HeaderRight from './src/components/HeaderRight';
import ProductsScreen from './src/screens/ProductDetails/ProductsScreen.jsx';
import ProductDetailsScreen from './src/screens/ProductDetails/ProductDetailsScreen.jsx';
import CartScreen from './src/screens/Cart/CartScreen';
import { SearchProvider } from './src/context/SearchContext';
import SearchResultScreen from './src/screens/Search/SearchResultScreen';
import WishlistScreen from './src/screens/Wishlist/WishlistScreen';
import ManageProfileScreen from './src/screens/Profile/ManageProfileScreen';
import CheckoutScreen from './src/screens/Checkout/CheckoutScreen';
import ShopCartScreen from './src/screens/Cart/ShopCartScreen';
import FailureScreen from './src/screens/Checkout/FailureScreen';
import SuccessScreen from './src/screens/Checkout/SuccessScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PolicyScreen from './src/screens/PolicyScreen/PolicyScreen';
import TermsAndServices from './src/screens/TermsAndServices/TermsAndServices';
import ShippingPolicy from './src/screens/ShippingPolicy/ShippingPolicy';
import RefundPolicy from './src/screens/RefundPolicy/RefundPolicy';
import AboutScreen from './src/screens/AboutScreen/AboutScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser } from './src/utils/user';
import { userSlice } from './src/store/slices/userSlice.js';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const setAuth = useCallback(async () => {
    const user = await getUser();
    dispatch(userSlice.actions.userLogin(user));
  }, []);

  useEffect(() => {
    const prepare = async () => {
      await setAuth();
    };

    prepare();
  }, [setAuth]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <MenuIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ManageProfile"
        component={ManageProfileScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Shopcart"
        component={ShopCartScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <View className="flex flex-row items-center">
              <MenuIcon />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      {user && (
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <View className="flex flex-row items-center">
                <MenuIcon />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image
                    source={{
                      uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                    }}
                    className="h-9 w-9 rounded-full bg-black"
                  />
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
        />
      )}
      <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Failure" component={FailureScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ModalProvider>
        <SearchProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="HomeStack"
              screenOptions={{
                drawerStyle: {
                  backgroundColor: '#f4f4f4', // Light background
                  width: 240, // Drawer width
                },
                drawerActiveTintColor: '#6200EE', // Active item color
                drawerInactiveTintColor: '#555', // Inactive item color
                drawerLabelStyle: {
                  fontSize: 16, // Label font size
                },
              }}
            >
              {/* Home Screen */}
              <Drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
                  drawerLabel: 'Home',
                  headerShown: false,
                  drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
                }}
              />

              {/* About Screen */}
              <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{
                  drawerLabel: 'About Us',
                  drawerIcon: ({ color, size }) => <Icon name="info" color={color} size={size} />,
                }}
              />

              {/* Policy Screen */}
              <Drawer.Screen
                name="Policy"
                component={PolicyScreen}
                options={{
                  drawerLabel: 'Privacy Policy',
                  drawerIcon: ({ color, size }) => <Icon name="lock" color={color} size={size} />,
                }}
              />

              {/* Terms & Services */}
              <Drawer.Screen
                name="Terms & Services"
                component={TermsAndServices}
                options={{
                  drawerLabel: 'Terms & Services',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="description" color={color} size={size} />
                  ),
                }}
              />

              {/* Shipping Policy */}
              <Drawer.Screen
                name="Shipping Policy"
                component={ShippingPolicy}
                options={{
                  drawerLabel: 'Shipping Policy',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="local-shipping" color={color} size={size} />
                  ),
                }}
              />

              {/* Refund Policy */}
              <Drawer.Screen
                name="Refund Policy"
                component={RefundPolicy}
                options={{
                  drawerLabel: 'Refund Policy',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="attach-money" color={color} size={size} />
                  ),
                }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </SearchProvider>
      </ModalProvider>
    </Provider>
  );
}

export default App;
