import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import apiService from '../services/apiSevices';
import {Eye} from 'phosphor-react-native';
import ShimmerEffect from './ShimmerEffect';

export type Order = {
  id: number;
  tranId: string;
  updatedAt: string;
  createdAt: string;
  userId: number;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURN_INITIATED'
    | 'RETURNED';
  totalAmount: number;
  paymentMethod: string;
  invoice: string[];
  items: any[];
};

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userDetails = useSelector(state => state.user.user);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      if (userDetails && userDetails.id) {
        const response = await apiService.getOrders(userDetails.id);

        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  }, [userDetails]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderTableRow = (order: Order) => (
    <View
      key={order.id}
      className="flex-row border border-t-0 border-gray-300 justify-between">
      <View className="flex-1  border-gray-300 p-2">
        <Text className="text-xs text-center text-black">{order.tranId}</Text>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <Text className="text-xs text-center text-black">{order.status}</Text>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <TouchableOpacity
          disabled={!order.invoice.length || order.status !== 'DELIVERED'}>
          <Text className="text-xs text-center text-black">
            {order.invoice.length && order.status === 'DELIVERED'
              ? 'View Invoice'
              : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <Text className="text-xs text-center text-black">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(order.totalAmount)}
        </Text>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <Text className="text-xs text-center text-black">
          {order.paymentMethod}
        </Text>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <Text className="text-xs text-center text-black">
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View className="flex-1  border-gray-300 p-2">
        <TouchableOpacity
          onPress={() => {
            /* Navigate to order details */
          }}>
          <Eye size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ShimmerEffect rows={true} />
      </View>
    );
  }

  return (
    <View className="w-full">
      <ScrollView horizontal className="w-full">
        <View className="p-4 w-full">
          {/* Table Header */}
          <View className="flex-row border border-gray-300 rounded-tl rounded-tr w-full">
            <View className="flex-row p-2 border-gray-300 px-5 justify-center  ml-5">
              <Text className="font-bold text-black text-xs text-center">
                Order Id
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300 px-5 ml-10">
              <Text className="font-bold text-black  text-xs text-center">
                Status
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300 ml-8">
              <Text className="font-bold text-black  text-xs text-center">
                Access Invoice
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300">
              <Text className="font-bold text-black  text-xs text-center">
                Total Amount
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300">
              <Text className="font-bold text-black  text-xs text-center">
                Payment Method
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300">
              <Text className="font-bold text-black  text-xs text-center">
                Order Date
              </Text>
            </View>
            <View className="flex-1 p-2 border-gray-300">
              <Text className="font-bold text-black  text-xs text-center">
                View Details
              </Text>
            </View>
          </View>
          {/* Table Rows */}
          {orders.length > 0 ? (
            orders.map(renderTableRow)
          ) : (
            <View className="flex-row border border-t-0 border-gray-300 rounded-bl rounded-br">
              <View className="flex-1 border-r border-gray-300 p-2">
                <Text>No Orders Found</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-black">{orders.length} row(s) displayed</Text>
        <View className="flex-row">
          <TouchableOpacity className="rounded p-1 px-2 border border-gray-200">
            <Text className="text-gray-500 text-xs">Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded p-1 px-2 border border-gray-200 ml-2">
            <Text className="text-gray-500 text-xs">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderTable;
