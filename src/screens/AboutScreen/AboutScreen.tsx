import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const AboutScreen = () => {
  const clients = [
    'Jaypee Residency, Mussoorie',
    'Wynberg Allen School, Mussoorie',
    'Asian School, Dehradun',
    'Siddhartha Group',
    'Residence of Umesh Sharma Kaau Pradhan Ji',
    'Ganesh Joshi Ji',
  ];
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/about.jpg')} // Update with the correct path to your image
        style={styles.image}
      />
      <Text style={styles.title}>
        We redefine the art of home enhancement through hardware, paints, plywood, and essential
        accessories.
      </Text>
      <Text style={styles.paragraph}>
        Established 40 years ago in 1984 as a small business by our grandfather Sri Chatar Das Hurla
        ji, we have advanced the legacy by serving you in a big 4-storied new generation showroom.
        Catering to all your modern building requirements under one roof, we are renowned in
        Uttarakhand and beyond for our unmatched service, established brands, and very reasonable
        pricing in hardware, paints, plywood, and essential accessories.
      </Text>

      <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>Designed For You</Text>

      <View style={styles.section}>
        <Image
          source={require('../../assets/about-icon1.jpg')} // Update with the correct path to your icon
          style={styles.icon}
        />
        <Text style={styles.title}>Home Enhancement</Text>
        <Text style={styles.paragraph}>
          Enhancing your living spaces with hardware, paints, plywood, and essential accessories is
          our specialty. We are dedicated to helping you find the perfect products that meet your
          home improvement needs. From choosing the right colors and textures to providing expert
          advice, we ensure your home reflects your style and comfort.
        </Text>
      </View>

      <View style={styles.section}>
        <Image
          source={require('../../assets/about-icon2.jpg')} // Update with the correct path to your icon
          style={styles.icon}
        />
        <Text style={styles.title}>Wide Selection</Text>
        <Text style={styles.paragraph}>
          Explore our vast and diverse selection of hardware, paints, plywood, and essential
          accessories, curated to meet all your interior design requirements. Whether you seek
          vibrant hues or durable plywood, our collection caters to your personal taste, lifestyle,
          and the essence of your home.
        </Text>
      </View>

      <View style={styles.title}>
        <Image
          source={require('../../assets/about-icon3.jpg')} // Update with the correct path to your icon
          style={styles.icon}
        />
        <Text style={styles.title}>Effortless Experience</Text>
        <Text style={styles.paragraph}>
          No matter where you are, our seamless service ensures effortless access to premium
          hardware, paints, plywood, and essential accessories. Whether it’s a large order or a
          small purchase, expect prompt and precise delivery right on schedule.
        </Text>
      </View>

      <View style={styles.title}>
        <Image source={require('../../assets/about-icon4.jpg')} style={styles.icon} />
        <Text style={styles.title}>Value Assurance</Text>
        <Text style={styles.paragraph}>
          Your satisfaction is our priority. If our products don’t meet your expectations, we’ll
          work closely with you to make it right. We offer competitive pricing that fits within your
          budget, ensuring exceptional value, top-notch quality, and hassle-free shipping.
        </Text>
      </View>

      <Image
        source={require('../../assets/About_Banner.jpg')}
        style={[styles.image, { marginTop: 25 }]}
      />
      <View style={styles.section}>
        <Text style={styles.title}>Our Journey</Text>
        <Text style={styles.paragraph}>
          Our company’s journey began with a vision to offer exceptional products that blend quality
          and convenience. We wanted to make home enhancement effortless for everyone. After facing
          numerous challenges with the quality and pricing of available products, we decided to
          establish <Text style={{ fontWeight: 'bold' }}>Hurla Hardware & Paints</Text>
          to provide a one-stop solution for hardware, paints, plywood, and essential accessories.
        </Text>
        <Text style={styles.paragraph}>
          Since our founding, we have continuously evolved to meet the changing needs of our
          customers. Our commitment to delivering top-quality products, combined with our dedication
          to excellent service, has earned us a reputation as a trusted name in home enhancement. We
          are proud to be a part of countless home transformations and look forward to continuing to
          serve our customers with the best products and services.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>
          Message from the Owner
        </Text>
        <Text style={styles.paragraph}>
          OUR MOTTO is to stand each moment ahead of the vision and perception of our predecessors
          and new generation aspirations in — Satisfactory Customer Service, Incompatible low
          Pricing, Renowned Brands & Uncompromising goods quality, After-sale Assistance &
          Satisfaction Expectations of our Clients.
        </Text>
        <Text style={styles.paragraph}>
          "Hurla Paints & Plywood — <Text style={{ fontWeight: 'bold' }}>Decor Your World.</Text>"
        </Text>
      </View>
      <Text style={[styles.title, { marginTop: 20, marginBottom: 10 }]}>Our Esteemed Clients</Text>
      <View style={styles.clientList}>
        {clients.map((client, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.clientText}>{client}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.title, { marginTop: 20 }]}>Contact Us</Text>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>For Inquiries, Reach Us At:</Text>
          <Text style={styles.number}>Mobile: 9927888882</Text>
          <Text style={styles.number}>Mobile: 8171508888</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#373f50',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
    color: '#4b566b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  icon: {
    width: 70, // Adjust icon size as needed
    height: 70,
    alignSelf: 'center',
    marginBottom: 10,
  },
  clientList: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2, // shadow effect for Android
    alignItems: 'center',
  },
  clientText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#373f50',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2, // shadow effect for Android
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: '#4b566b',
    fontWeight: '700',
  },
  number: {
    fontSize: 18,
    color: '#4b566b',
  },
});
