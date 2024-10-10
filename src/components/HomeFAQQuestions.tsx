import {View} from 'react-native';
import React, {useState} from 'react';
import HomeAccordian from './HomeAccordian';

const faqData = [
  {
    question: '1. What are the shipping options?',
    answer:
      'Our store offers several shipping options, including standard, expedited, and international shipping. Shipping costs and delivery times vary based on your location and the selected shipping method',
  },
  {
    question: '2. How do I track my order?',
    answer:
      "Once your order has shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery through our website or the courier's tracking service.",
  },
  {
    question: '3. What payment methods are available?',
    answer:
      'We accept various payment methods, including credit/debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. You can select your preferred payment option during checkout.',
  },
  {
    question: '4. Can I return or exchange an item?',
    answer:
      "Yes, we have a hassle-free return and exchange policy. If you're not satisfied with your purchase, you can return it within [number] days for a full refund or exchange.",
  },
  {
    question: '5. How do I cancel my order?',
    answer:
      'You can cancel your order before it has been shipped. Please contact our customer support team with your order number, and we will assist you in canceling your order and issuing a refund if applicable.',
  },
  {
    question: '6. Are my personal details secure?',
    answer:
      'We take data security seriously. Your personal information is encrypted and securely stored. We do not share your details with third parties except as necessary to fulfill your order.',
  },
  {
    question: '7. How can I contact customer support?',
    answer:
      'Our customer support team is available [hours] days a week via email, phone, or live chat. Please visit our Contact Us page for more details on how to reach us.',
  },
  {
    question: '8. Do you offer gift wrapping services?',
    answer:
      'Yes, we offer gift wrapping options for your convenience. During checkout, you can select gift wrapping and add a personalized message for the recipient.',
  },
];

const HomeFAQQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View>
      {faqData.map((faq, index) => (
        <HomeAccordian
          key={`FAQQuestion+${index}`}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </View>
  );
};

export default HomeFAQQuestions;
