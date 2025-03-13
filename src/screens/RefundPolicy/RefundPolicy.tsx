import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const RefundPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Refund Policy</Text>

      <Text style={styles.subHeader}>Return Policy</Text>
      <Text style={styles.paragraph}>
        We have a 30-day return policy, which means you have 30 days after receiving your item to
        request a return.
      </Text>
      <Text style={styles.paragraph}>
        To be eligible for a return, your item must be in the same condition that you received it,
        unworn or unused, with tags, and in its original packaging. You'll also need the receipt or
        proof of purchase.
      </Text>
      <Text style={styles.paragraph}>
        To start a return, you can contact us at info@hurlahardware.com. Please note that returns
        will need to be sent to the following address:
        <Text style={styles.boldText}> 190, Dharampur, Haridwar Road, Dehradun - 248001.</Text>
      </Text>
      <Text style={styles.paragraph}>
        If your return is accepted, we'll send you a return shipping label, as well as instructions
        on how and where to send your package. Items sent back to us without first requesting a
        return will not be accepted.
      </Text>
      <Text style={styles.paragraph}>
        You can always contact us for any return question at info@hurlahardware.com.
      </Text>

      <Text style={styles.subHeader}>Damages and Issues</Text>
      <Text style={styles.paragraph}>
        Please inspect your order upon reception and contact us immediately if the item is
        defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and
        make it right.
      </Text>

      <Text style={styles.subHeader}>Exceptions / Non-Returnable Items</Text>
      <Text style={styles.paragraph}>
        Certain types of items cannot be returned, like perishable goods (such as food, flowers, or
        plants), custom products (such as special orders or personalized items), and personal care
        goods (such as beauty products). We also do not accept returns for hazardous materials,
        flammable liquids, or gases. Please get in touch if you have questions or concerns about
        your specific item.
      </Text>
      <Text style={styles.paragraph}>
        Unfortunately, we cannot accept returns on sale items or gift cards.
      </Text>

      <Text style={styles.subHeader}>Exchanges</Text>
      <Text style={styles.paragraph}>
        The fastest way to ensure you get what you want is to return the item you have, and once the
        return is accepted, make a separate purchase for the new item.
      </Text>

      <Text style={styles.subHeader}>European Union 14 Day Cooling-Off Period</Text>
      <Text style={styles.paragraph}>
        Notwithstanding the above, if the merchandise is being shipped into the European Union, you
        have the right to cancel or return your order within 14 days, for any reason and without a
        justification. As above, your item must be in the same condition that you received it,
        unworn or unused, with tags, and in its original packaging. You'll also need the receipt or
        proof of purchase.
      </Text>

      <Text style={styles.subHeader}>Refunds</Text>
      <Text style={styles.paragraph}>
        We will notify you once we've received and inspected your return, and let you know if the
        refund was approved or not. If approved, you'll be automatically refunded on your original
        payment method within 10 business days. Please remember it can take some time for your bank
        or credit card company to process and post the refund too.
      </Text>
      <Text style={styles.paragraph}>
        If more than 15 business days have passed since we've approved your return, please contact
        us at hurlahardware@gmail.com.
      </Text>
    </ScrollView>
  );
};

export default RefundPolicy;

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
  boldText: {
    fontWeight: 'bold',
  },
});
