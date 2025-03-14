import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';

const ShippingPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shipping Policy</Text>

      <Text style={styles.paragraph}>
        Ordering at www.hurlahardware.com is easy and fun. Browse the website to make your purchase.
        You need to provide your contact details and shipping address for hassle-free delivery.
        Kindly note we are currently accepting orders only for delivery in India. We provide Cash on
        Delivery all over India.
      </Text>

      <Text style={styles.subHeader}>Order Cancellation and Shipping Costs</Text>
      <Text style={styles.paragraph}>
        For orders that are cancelled after dispatch and while in transit, or rejected (in case of
        COD orders), shipping costs will be charged for both to & fro at actuals. For pre-paid
        orders, the same will be deducted during the refund process, and in case of COD, reward
        points will be deducted from the customer account. All purchases are shipped from our
        warehouse in Kolkata by reputed courier agencies. Please allow the following number of days
        from receipt of your order.
      </Text>

      <Text style={styles.subHeader}>Delivery Time</Text>
      <Text style={styles.paragraph}>
        Domestic Delivery: 7-14 business days for domestic delivery.
      </Text>
      <Text style={styles.paragraph}>
        Delivery Time: Order deliveries will be made between 9 am - 8 pm Monday - Saturday. However,
        we do not guarantee arrival dates or times and it is dependent on the courier partner and
        location.
      </Text>

      <Text style={styles.subHeader}>Sign upon Delivery</Text>
      <Text style={styles.paragraph}>
        Goods will need to be signed for upon delivery. If you cannot be there to sign for your
        delivery, please suggest an alternative, i.e., a family member, colleague, neighbor, etc.
        Hurla Paints & Plywood takes no responsibility for goods signed by an alternative person.
        Hurla Paints & Plywood is not responsible for damage after delivery. All claims for
        shortages or damages must be reported to customer service on the day of delivery.
      </Text>

      <Text style={styles.subHeader}>Shipping Rates</Text>
      <Text style={styles.paragraph}>
        Shipping and handling rates may vary based on product, packaging, size, volume, type, and
        other considerations. The shipping and handling charges are given at the time of checkout,
        and consumers will know about this before making payments.
      </Text>

      <Text style={styles.subHeader}>Pricing & Payment Policy</Text>
      <Text style={styles.paragraph}>
        Hurla Paints & Plywood product prices listed on the website are current; however, these are
        subject to change without any prior notice. All orders are acknowledged at the current
        pricing. Our products are liable to and inclusive of GST. We take immediate orders online
        and accept payments through domestic and international credit cards issued by Banks and
        Institutions that are part of Visa / MasterCard. We also accept payments through Visa /
        Maestro Debit Cards issued by Indian Banks, Amex Cards, or Net banking payment mode of
        selected banks in India. You can also pay through Paytm Wallets and UPI interface.
      </Text>
      <Text style={styles.paragraph}>
        • We do not offer card on delivery facility; hence, only Indian Rupees are accepted. We do
        not accept any foreign currency.
      </Text>
      <Text style={styles.paragraph}>
        • We require complete details of your shipping address, including the nearby landmark.
        Please ensure that you provide the correct pin code, your contact number, and an alternative
        contact number.
      </Text>
      <Text style={styles.paragraph}>
        • The order amount has to be paid in full after receiving the package and signed for upon
        delivery. The package can be opened only after the payment is made.
      </Text>
      <Text style={styles.paragraph}>
        • If you cancel the COD orders, you will be entitled to pay the shipping costs for both to &
        fro at actuals.
      </Text>
      <Text style={styles.paragraph}>
        • If you repeatedly place orders on Cash on Delivery and keep on failing to accept the
        delivery, you may be barred from using the COD facility further.
      </Text>
      <Text style={styles.paragraph}>
        • We will verify any COD orders placed on our website before delivering the same.
      </Text>
    </ScrollView>
  );
};

export default ShippingPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
    color: 'black',
  },
});
