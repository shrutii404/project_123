import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import SearchLoader from '../../components/SearchLoader';
import { useSearchBox } from '../../context/SearchContext';
import ProductSearchCard from '../../components/ProductSearchCard';
import SearchBar from '../../components/SearchBar';

const SearchNotFound = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center">
        <Text className="text-xl font-bold mb-4 text-black">
          Can't Find What You're Looking For?
        </Text>
        <Text className="text-lg mb-4 text-center text-black">
          We understand that finding the perfect product can sometimes be challenging. If you're
          having trouble locating what you need, don't worry!
        </Text>
        <Text className="text-lg mb-4 text-center font-bold text-black">
          Share your product requirements with us, and let Hurla help you source it at the best
          price. We can deliver right to your doorstep, ensuring a hassle-free experience.
        </Text>
        <Text className="text-lg text-center text-black">
          For personalized assistance, please reach out to us with your details, and we'll be happy
          to help you find exactly what you're looking for.
        </Text>
      </View>
    </ScrollView>
  );
};

const SearchResultScreen = () => {
  const { loading, searchResults, searchQuery, searchVisible } = useSearchBox();
  const hasQuery = searchQuery && searchQuery.trim().length > 0;
  const renderProduct = ({ item }: { item: any }) => {
    return <ProductSearchCard key={item._id} product={item} />;
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <SearchBar searchVisible={searchVisible} />
      {loading && <SearchLoader />}
      {!loading && hasQuery && (
        <View className="h-20 items-center justify-center">
          <Text className="text-black text-2xl font-bold">{searchQuery}</Text>
        </View>
      )}
      {searchResults && searchResults.length > 0 ? (
        <FlatList
          data={searchResults.filter(
            (product) => product && product._id && typeof product === 'object'
          )}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ alignItems: 'center', width: '100%' }}
        />
      ) : (
        !loading && hasQuery && <SearchNotFound />
      )}
    </ScrollView>
  );
};

export default SearchResultScreen;
