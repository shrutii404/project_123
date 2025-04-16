import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ErrorBoundary } from './src/core/error-handling/ErrorBoundary';
import { Image, TouchableOpacity, View } from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';

import MenuIcon from './src/icons/MenuIcon';
import { Provider } from 'react-redux';
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

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { ProductProvider } from './src/context/ProductContext';
import { ProductVariationProvider } from './src/context/ProductVariation';
import { CategoryProvider } from './src/context/CategoryContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  const { state} = useAuth();
  const user = state.user;

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
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ModalProvider>
            <SearchProvider>
              <CartProvider>
                <WishlistProvider>
                  <ProductProvider>
                    <ProductVariationProvider>
                      <CategoryProvider>
                        <NavigationContainer>
                          <Drawer.Navigator
                            initialRouteName="HomeStack"
                            screenOptions={{
                              drawerStyle: {
                                backgroundColor: '#f4f4f4',
                                width: 240,
                              },
                              drawerActiveTintColor: '#6200EE',
                              drawerInactiveTintColor: '#555',
                              drawerLabelStyle: {
                                fontSize: 16,
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
                                drawerIcon: ({ color, size }) => (
                                  <FontAwesome name="home" color={color} size={size} />
                                ),
                              }}
                            />

                            {/* About Screen */}
                            <Drawer.Screen
                              name="About"
                              component={AboutScreen}
                              options={{
                                drawerLabel: 'About Us',
                                drawerIcon: ({ color, size }) => (
                                  <FontAwesome name="info-circle" color={color} size={size} />
                                ),
                              }}
                            />

                            {/* Policy Screen */}
                            <Drawer.Screen
                              name="Policy"
                              component={PolicyScreen}
                              options={{
                                drawerLabel: 'Privacy Policy',
                                drawerIcon: ({ color, size }) => (
                                  <FontAwesome name="lock" color={color} size={size} />
                                ),
                              }}
                            />

                            {/* Terms & Services */}
                            <Drawer.Screen
                              name="Terms & Services"
                              component={TermsAndServices}
                              options={{
                                drawerLabel: 'Terms & Services',
                                drawerIcon: ({ color, size }) => (
                                  <FontAwesome name="file-text" color={color} size={size} />
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
                                  <FontAwesome name="truck" color={color} size={size} />
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
                                  <FontAwesome name="money" color={color} size={size} />
                                ),
                              }}
                            />
                          </Drawer.Navigator>
                        </NavigationContainer>
                      </CategoryProvider>
                    </ProductVariationProvider>
                  </ProductProvider>
                </WishlistProvider>
              </CartProvider>
            </SearchProvider>
          </ModalProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
