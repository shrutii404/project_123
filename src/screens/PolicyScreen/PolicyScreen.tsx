import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const PolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>

      <Text style={styles.paragraph}>
        This Privacy Policy outlines how Hurla Paints and Plywood, hosted on www.hurlahardware.com, collects, uses, and discloses personal information about visitors and customers. Please review this policy to understand our practices regarding the collection, use, and disclosure of personal data.
      </Text>
      <Text style={styles.paragraph}>
        This policy is not legal advice. You are solely responsible for ensuring compliance with applicable laws. As privacy laws are constantly evolving, you should regularly review your privacy notice to ensure that it remains compliant with updated laws and regulations and that it accurately reflects current data handling practices. We recommend consulting a lawyer as needed.
      </Text>
      <Text style={styles.paragraph}>Last updated: 4-Sept-2024</Text>

      <Text style={styles.paragraph}>
        This Privacy Policy describes how Hurla Paints & Plywood (the ”Site”, ”we”, ”us”, or ”our”) collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from hurlahardware.com (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, ”you” and ”your” means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
      </Text>
      <Text style={styles.paragraph}>
        Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
      </Text>

      {/* Additional content added */}
      <Text style={styles.subHeader}>Changes to This Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
      </Text>

      <Text style={styles.subHeader}>How We Collect and Use Your Personal Information</Text>
      <Text style={styles.paragraph}>
        To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
      </Text>
      <Text style={styles.paragraph}>
        In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
      </Text>

      <Text style={styles.subHeader}>What Personal Information We Collect</Text>
      <Text style={styles.paragraph}>
        The types of personal information we obtain about you depend on how you interact with our Site and use our Services. When we use the term ”personal information”, we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
      </Text>

      <Text style={styles.subHeader}>Information We Collect Directly from You</Text>
      <Text style={styles.paragraph}>
        Information that you directly submit to us through our Services may include:
      </Text>
      <Text style={styles.listItem}>
        • Basic contact details including your name, address, phone number, email.
      </Text>
      <Text style={styles.listItem}>
        • Order information including your name, billing address, shipping address, payment confirmation, email address, phone number.
      </Text>
      <Text style={styles.listItem}>
        • Account information including your username, password, security questions.
      </Text>
      <Text style={styles.listItem}>
        • Shopping information including the items you view, put in your cart or add to your wishlist.
      </Text>
      <Text style={styles.listItem}>
        • Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.
      </Text>
      <Text style={styles.paragraph}>
        Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
      </Text>
      <Text style={styles.subHeader}>Information We Collect through Cookies</Text>
      <Text style={styles.paragraph}>
        We also automatically collect certain information about your interaction with the Services (”Usage Data”). To do this, we may use cookies, pixels and similar technologies (”Cookies”). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.</Text>
      <Text style={styles.subHeader}>Information We Obtain from Third Parties</Text>
      <Text style={styles.paragraph}>
        Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:
      </Text>
      <Text style={styles.listItem}>
        • Companies who support our Site and Services, such as Shopify.
      </Text>
      <Text style={styles.listItem}>
        • Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.
      </Text>
      <Text style={styles.listItem}>
        • When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.
      </Text>
      <Text style={styles.paragraph}>

        Any information we obtain from third parties will be treated in accordance with this Privacy Policy. We are not responsible or liable for the accuracy of the information provided to us by third parties and are not responsible for any third party's policies or practices. For more information, see the section below, Third Party Websites and Links.
      </Text>

      <Text style={styles.subHeader}>
        ” How We Use Your Personal Information
      </Text>
      <Text style={styles.paragraph}>Providing Products and Services. We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and to enable you to post reviews.</Text>
      <Text style={styles.paragraph}>Marketing and Advertising. We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.</Text>
      <Text style={styles.paragraph}>Security and Fraud Prevention. We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately.</Text>
      <Text style={styles.paragraph}>Communicating with you. We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you.</Text>

      <Text style={styles.subHeader}>Cookies</Text>
      <Text style={styles.paragraph}>
        Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see Shopify Cookies Policy. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.
      </Text>
      <Text style={styles.paragraph}>
        Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.
      </Text>

      <Text style={styles.subHeader}>How We Disclose Personal Information</Text>
      <Text style={styles.paragraph}>
        In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
      </Text>
      <Text style={styles.listItem}>- With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment, and shipping).</Text>
      <Text style={styles.listItem}>- With business and marketing partners, including Shopify, to provide services and advertise to you. [NOTE TO MERCHANT: INSERT THE FOLLOWING SENTENCE IF USING SHOPIFY’S AD SERVICES, SUCH AS SHOPIFY AUDIENCES] [For example, we use Shopify to support personalized advertising with third-party services].</Text>
      <Text style={styles.listItem}>- When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.</Text>
      <Text style={styles.listItem}>- With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.</Text>
      <Text style={styles.listItem}>- In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.</Text>

      <Text style={styles.paragraph}>
        We have, in the past 12 months, disclosed the following categories of personal information and sensitive personal information (denoted by *) about users for the purposes set out above in "How we Collect and Use your Personal Information" and "How we Disclose Personal Information":
      </Text>

      <Text style={styles.subHeader}>Categories of Personal Information and Recipients</Text>

      {/* Table content */}
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Category</Text>
          <Text style={styles.tableHeader}>Categories of Recipients</Text>
        </View>

        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Identifiers such as basic contact details and certain order and account information
          </Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners, and data analytics providers), business and marketing partners, affiliates
          </Text>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Commercial information such as order information, shopping information, and customer support information
          </Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, business and marketing partners, affiliates
          </Text>
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Internet or other similar network activity, such as Usage Data
          </Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, business and marketing partners, affiliates
          </Text>
        </View>
      </View>


      <Text style={styles.subHeader}>Sale and Sharing of Personal Information</Text>

      {/* Note for the merchant */}
      <Text style={styles.paragraph}>
        [NOTE TO MERCHANT: INSERT THE FOLLOWING PARAGRAPH AND CHART IF USING SHOPIFY’S AD SERVICES SUCH AS SHOPIFY AUDIENCES OR ENGAGING IN ANY OTHER ACTIVITY THAT MAY BE CONSIDERED “SELLING” OR “SHARING” PERSONAL INFORMATION OR PROCESSING PERSONAL INFORMATION FOR “TARGETED ADVERTISING”]
      </Text>

      <Text style={styles.paragraph}>
        We have “sold” and “shared” (as those terms are defined in applicable law) personal information over the preceding 12 months for the purpose of engaging in advertising and marketing activities, as follows:
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Category of Personal Information</Text>
          <Text style={styles.tableHeader}>Categories of Recipients</Text>
        </View>

        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Identifiers such as basic contact details and certain order and account information
          </Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Commercial information such as records of products or services purchased and shopping information
          </Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Internet or other similar network activity, such as Usage Data
          </Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>
      </View>

      {/* User Generated Content */}
      <Text style={styles.subHeader}>User Generated Content</Text>
      <Text style={styles.paragraph}>
        The Services may enable you to post product reviews and other user-generated content. If you choose to submit user-generated content to any public area of the Services, this content will be public and accessible by anyone.
      </Text>
      <Text style={styles.paragraph}>
        We do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure. We are not responsible for the privacy or security of any information that you make publicly available, or for the accuracy, use, or misuse of any information that you disclose or receive from third parties.
      </Text>

      {/* Third Party Websites and Links */}
      <Text style={styles.subHeader}>Third Party Websites and Links</Text>
      <Text style={styles.paragraph}>
        Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.
      </Text>
      <Text style={styles.paragraph}>
        Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
      </Text>

      {/* Children’s Data */}
      <Text style={styles.subHeader}>Children’s Data</Text>
      <Text style={styles.paragraph}>
        The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
      </Text>
      <Text style={styles.paragraph}>
        As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
      </Text>

      {/* Legal note for merchant */}
      <Text style={styles.paragraph}>
        [NOTE TO MERCHANT: PLEASE CONSULT WITH LEGAL COUNSEL IF YOUR SITE IS CHILD FOCUSSED OR DIRECTED, AS MORE SPECIFIC DISCLOSURES MAY BE REQUIRED.]
      </Text>

      {/* Security and Retention of Your Information */}
      <Text style={styles.subHeader}>Security and Retention of Your Information</Text>
      <Text style={styles.paragraph}>
        Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
      </Text>
      <Text style={styles.paragraph}>
        How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
      </Text>

      {/* Your Rights and Choices */}
      <Text style={styles.subHeader}>Your Rights and Choices</Text>
      <Text style={styles.paragraph}>
        Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
      </Text>
      <Text style={styles.listItem}>
        • Right to Access / Know. You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
      </Text>
      <Text style={styles.listItem}>
        • Right to Delete. You may have a right to request that we delete personal information we maintain about you.
      </Text>
      <Text style={styles.listItem}>
        • Right to Correct. You may have a right to request that we correct inaccurate personal information we maintain about you.
      </Text>
      <Text style={styles.listItem}>
        • Right of Portability. You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
      </Text>
      <Text style={styles.paragraph}>
        [NOTE TO MERCHANT: IF USING SHOPIFY'S AD SERVICES SUCH AS SHOPIFY AUDIENCES OR ENGAGING IN ANY OTHER ACTIVITY THAT MAY BE CONSIDERED ”SELLING” OR ”SHARING” PERSONAL INFORMATION OR PROCESSING PERSONAL INFORMATION FOR ”TARGETED ADVERTISING”, INSERT THE PARAGRAPH BELOW AND ENSURE YOU PROVIDE CUSTOMERS THE ABILITY TO ”OPT OUT” OF THIS ACTIVITY ON YOUR SITE BY USING SHOPIFY'S PRIVACY AND COMPLIANCE APP OR OTHERWISE.]
      </Text>
      <Text style={styles.listItem}>
        • Right to Opt out of Sale or Sharing or Targeted Advertising. You may have a right to direct us not to ”sell” or ”share” your personal information or to opt out of the processing of your personal information for purposes considered to be ”targeted advertising”, as defined in applicable privacy laws. Please note that if you visit our Site with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will automatically treat this as a request to opt-out of the ”sale” or ”sharing” of information for the device and browser that you use to visit the Site.
      </Text>
      <Text style={styles.paragraph}>
        [NOTE TO MERCHANT: IF YOU COLLECT INFORMATION THAT MAY BE DEEMED TO BE SENSITIVE PERSONAL INFORMATION UNDER APPLICABLE PRIVACY LAWS THERE MAY BE ADDITIONAL CONSENTS/DISCLOSURES REQUIRED. INSERT THE PARAGRAPH BELOW IF YOU COLLECT SENSITIVE PERSONAL INFORMATION AND CONSULT WITH EXTERNAL LEGAL COUNSEL TO CONFIRM YOUR RESPONSIBILITIES.]
      </Text>
      <Text style={styles.listItem}>
        • Right to Limit and/or Opt out of Use and Disclosure of Sensitive Personal Information. You may have a right to direct us to limit our use and/or disclosure of sensitive personal information to only what is necessary to perform the Services or provide the goods reasonably expected by an average individual.
      </Text>
      <Text style={styles.listItem}>
        • Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information.
      </Text>
      <Text style={styles.listItem}>
        • Withdrawal of Consent: Where we rely on consent to process your personal information, you may have the right to withdraw this consent.
      </Text>
      <Text style={styles.listItem}>
        • Appeal: You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.
      </Text>
      <Text style={styles.listItem}>
        • Managing Communication Preferences: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.
      </Text>
      <Text style={styles.paragraph}>
        You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below.
      </Text>
      <Text style={styles.paragraph}>
        We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, You may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.
      </Text>

      {/* Shopify Ad Services */}
      <Text style={styles.subHeader}>Shopify Ad Services</Text>
      <Text style={styles.paragraph}>
        We use Shopify's ad services such as Shopify Audiences to help personalize the advertising you see on third party websites. To restrict Shopify merchants that use these ad services from using your personal information for such services, visit Hurla Privacy.
      </Text>

      {/* Complaints */}
      <Text style={styles.subHeader}>Complaints</Text>
      <Text style={styles.paragraph}>
        If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.
      </Text>

      {/* International Users */}
      <Text style={styles.subHeader}>International Users</Text>
      <Text style={styles.paragraph}>
        Please note that we may transfer, store and process your personal information outside the country you live in, including the United States. Your personal information is also processed by staff and third party service providers and partners in these countries.
      </Text>
      <Text style={styles.paragraph}>
        If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
      </Text>

      {/* Contact */}
      <Text style={styles.subHeader}>Contact</Text>
      <Text style={styles.paragraph}>
        Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call 8193043808 or contact us at 190, Dharampur, Haridwar Road, Dehradun, India.
      </Text>

      {/* GDPR Information */}
      <Text style={styles.subHeader}>GDPR Information</Text>
      <Text style={styles.paragraph}>
        [NOTE TO MERCHANT: INSERT THE FOLLOWING IF YOUR SITE IS GOVERNED BY GDPR] For the purpose of applicable data protection laws, we are the data controller of your personal information. Our representative in the [EEA] [and] [the UK] is [INSERT REPRESENTATIVE DETAILS].
      </Text>

      {/* Disclaimer */}
      <Text style={styles.subHeader}>Disclaimer</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy outlines how Hurla Paints and Plywood, hosted on www.hurlahardware.com, collects, uses, and discloses personal information about visitors and customers. Please review this policy to understand our practices regarding the collection, use, and disclosure of personal data.
      </Text>
      <Text style={styles.paragraph}>
        This policy is not legal advice. We recommend that you regularly review your privacy notice to ensure compliance with updated laws and regulations and that it accurately reflects current data handling practices.
      </Text>

      {/* Last Updated */}
      <Text style={styles.subHeader}>Last Updated</Text>
      <Text style={styles.paragraph}>
        Last updated: [Date]
      </Text>

      {/* Introduction */}
      <Text style={styles.subHeader}>Introduction</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy describes how Hurla Hardware & Paints (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from hurlahardware.com (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
      </Text>
      <Text style={styles.paragraph}>
        Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
      </Text>

      {/* Changes to This Privacy Policy */}
      <Text style={styles.subHeader}>Changes to This Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date, and take any other steps required by applicable law.
      </Text>

      {/* How We Collect and Use Your Personal Information */}
      <Text style={styles.subHeader}>How We Collect and Use Your Personal Information</Text>
      <Text style={styles.paragraph}>
        To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
      </Text>
      <Text style={styles.paragraph}>
        In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
      </Text>

      {/* What Personal Information We Collect */}
      <Text style={styles.subHeader}>What Personal Information We Collect</Text>
      <Text style={styles.paragraph}>
        The types of personal information we obtain about you depend on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
      </Text>

      {/* Information We Collect Directly from You */}
      <Text style={styles.subHeader}>Information We Collect Directly from You</Text>
      <Text style={styles.paragraph}>
        Information that you directly submit to us through our Services may include:
      </Text>
      <Text style={styles.listItem}>- Basic contact details including your name, address, phone number, email.</Text>
      <Text style={styles.listItem}>- Order information including your name, billing address, shipping address, payment confirmation, email address, phone number.</Text>
      <Text style={styles.listItem}>- Account information including your username, password, security questions.</Text>
      <Text style={styles.listItem}>- Shopping information including the items you view, put in your cart or add to your wishlist.</Text>
      <Text style={styles.listItem}>- Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.</Text>
      <Text style={styles.paragraph}>
        Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
      </Text>

      {/* Cookies */}
      <Text style={styles.subHeader}>Cookies</Text>
      <Text style={styles.paragraph}>
        Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see Shopify Cookies. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.
      </Text>
      <Text style={styles.paragraph}>
        Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.
      </Text>

      {/* How We Disclose Personal Information */}
      <Text style={styles.subHeader}>How We Disclose Personal Information</Text>
      <Text style={styles.paragraph}>
        In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
      </Text>
      <Text style={styles.listItem}>- With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</Text>
      <Text style={styles.listItem}>- With business and marketing partners, including Shopify, to provide services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services. Our business and marketing partners will use your information in accordance with their own privacy notices.</Text>
      <Text style={styles.listItem}>- When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.</Text>
      <Text style={styles.listItem}>- With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.</Text>
      <Text style={styles.listItem}>- In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.</Text>


      <View style={styles.tableContainer}>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Category</Text>
          <Text style={styles.tableHeader}>Categories of Recipients</Text>
        </View>


        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Identifiers</Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners, Affiliates
          </Text>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Commercial Information</Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners
          </Text>
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Internet or other similar network activity
          </Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners
          </Text>
        </View>
      </View>


      <Text style={styles.subHeader}>Sale or Sharing of Personal Information</Text>
      <Text style={styles.paragraph}>
        We have “sold” and “shared” (as those terms are defined in applicable law) personal information over the preceding 12 months for the purpose of engaging in advertising and marketing activities, as follows.  </Text>


      <View style={styles.tableContainer}>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Category of Personal Information</Text>
          <Text style={styles.tableHeader}>Categories of Recipients</Text>
        </View>


        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Identifiers</Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Commercial Information</Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Internet or other similar network activity
          </Text>
          <Text style={styles.tableCell}>
            Business and marketing partners
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Generated Content</Text>
        <Text style={styles.sectionContent}>
          The Services may enable you to post product reviews and other user-generated content. If you choose to submit user-generated content to any public area of the Services, this content will be public and accessible by anyone.
        </Text>
        <Text style={styles.sectionContent}>
          We do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure. We are not responsible for the privacy or security of any information that you make publicly available, or for the accuracy, use or misuse of any information that you disclose or receive from third parties.
        </Text>
      </View>

      {/* Third Party Websites and Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Third Party Websites and Links</Text>
        <Text style={styles.sectionContent}>
          Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
        </Text>
      </View>

      {/* Children’s Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Children’s Data</Text>
        <Text style={styles.sectionContent}>
          The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
        </Text>
        <Text style={styles.sectionContent}>
          As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
        </Text>
      </View>

      {/* Security and Retention of Your Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security and Retention of Your Information</Text>
        <Text style={styles.sectionContent}>
          Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
        </Text>
        <Text style={styles.sectionContent}>
          How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rights and Choices</Text>
        <Text style={styles.sectionContent}>
          Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right to Access / Know:</Text> You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right to Delete:</Text> You may have a right to request that we delete personal information we maintain about you.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right to Correct:</Text> You may have a right to request that we correct inaccurate personal information we maintain about you.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right of Portability:</Text> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right to Opt-out of Sale or Sharing or Targeted Advertising:</Text> You may have a right to direct us not to ”sell” or ”share” your personal information or to opt out of the processing of your personal information for purposes considered to be ”targeted advertising”, as defined in applicable privacy laws.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Right to Limit and/or Opt-out of Use and Disclosure of Sensitive Personal Information:</Text> You may have a right to direct us to limit our use and/or disclosure of sensitive personal information to only what is necessary to perform the Services or provide the goods reasonably expected by an average individual.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Restriction of Processing:</Text> You may have the right to ask us to stop or restrict our processing of personal information.
        </Text>
        <Text style={styles.sectionContent}>
          <Text style={styles.bold}>Withdrawal of Consent:</Text> If you have provided your consent to the collection and processing of your personal information, you may have the right to withdraw such consent at any time.
        </Text>
      </View>

      {/* Contact Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionContent}>
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </Text>
        <Text style={styles.sectionContent}>Email: info@hurlahardware.com</Text>
        <Text style={styles.sectionContent}>Mailing Address: info@hurlahardware.com</Text>
      </View>

      {/* Changes to This Privacy Policy Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.sectionContent}>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on our Site with an updated effective date.
        </Text>
      </View>

      {/* How We Disclose Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How We Disclose Personal Information</Text>
        <Text style={styles.sectionContent}>
          In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
        </Text>
        <Text style={styles.sectionContent}>
          • With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
        </Text>
        <Text style={styles.sectionContent}>
          • With business and marketing partners, including Shopify, to provide services and advertise to you. [NOTE TO MERCHANT: INSERT THE FOLLOWING SENTENCE IF USING SHOPIFY’S AD SERVICES, SUCH AS SHOPIFY AUDIENCES] [For example, we use Shopify to support personalized advertising with third-party services]. Our business and marketing partners will use your information in accordance with their own privacy notices.
        </Text>
        <Text style={styles.sectionContent}>
          • When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.
        </Text>
        <Text style={styles.sectionContent}>
          • With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.
        </Text>
        <Text style={styles.sectionContent}>
          • In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
        </Text>
      </View>

      {/* Past Disclosure Information */}
      <View style={styles.section}>
        <Text style={styles.sectionContent}>
          We have, in the past 12 months, disclosed the following categories of personal information and sensitive personal information (denoted by *) about users for the purposes set out above:
        </Text>
      </View>


      <View style={styles.tableContainer}>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Category</Text>
          <Text style={styles.tableHeader}>Categories of Recipients</Text>
        </View>


        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Identifiers such as basic contact details and certain order and account information</Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners, Affiliates
          </Text>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Commercial information such as order information, shopping information and customer support information</Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners, Affiliates
          </Text>
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Internet or other similar network activity, such as Usage Data
          </Text>
          <Text style={styles.tableCell}>
            Vendors and third parties who perform services on our behalf, Business and marketing partners
          </Text>
        </View>
      </View>

      <Text style={styles.sectionContent}>
        We do not use or disclose sensitive personal information for the purposes of inferring characteristics about you. </Text>


      <View style={styles.section}>
        <Text style={styles.subHeader}>User Generated Content</Text>
        <Text style={styles.paragraph}>
          The Services may enable you to post product reviews and other user-generated content. If you choose to submit user-generated content to any public area of the Services, this content will be public and accessible by anyone.
        </Text>
        <Text style={styles.paragraph}>
          We do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure. We are not responsible for the privacy or security of any information that you make publicly available, or for the accuracy, use, or misuse of any information that you disclose or receive from third parties.
        </Text>
      </View>

      {/* Third Party Websites and Links Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Third Party Websites and Links</Text>
        <Text style={styles.paragraph}>
          Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.
        </Text>
        <Text style={styles.paragraph}>
          Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
        </Text>
      </View>

      {/* Children’s Data Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Children’s Data</Text>
        <Text style={styles.paragraph}>
          The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
        </Text>
        <Text style={styles.paragraph}>
          As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
        </Text>
      </View>

      {/* Security and Retention of Your Information Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Security and Retention of Your Information</Text>
        <Text style={styles.paragraph}>
          Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
        </Text>
        <Text style={styles.paragraph}>
          How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
        </Text>
      </View>

      {/* Extended Your Rights and Choices Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Your Rights and Choices</Text>
        <Text style={styles.paragraph}>
          Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right to Access / Know:</Text> You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right to Delete:</Text> You may have a right to request that we delete personal information we maintain about you.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right to Correct:</Text> You may have a right to request that we correct inaccurate personal information we maintain about you.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right of Portability:</Text> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right to Opt-out of Sale or Sharing or Targeted Advertising:</Text> You may have a right to direct us not to ”sell” or ”share” your personal information or to opt out of the processing of your personal information for purposes considered to be ”targeted advertising”, as defined in applicable privacy laws.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Right to Limit and/or Opt-out of Use and Disclosure of Sensitive Personal Information:</Text> You may have a right to direct us to limit our use and/or disclosure of sensitive personal information to only what is necessary to perform the Services or provide the goods reasonably expected by an average individual.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Restriction of Processing:</Text> You may have the right to ask us to stop or restrict our processing of personal information.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Withdrawal of Consent:</Text> Where we rely on consent to process your personal information, you may have the right to withdraw this consent.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Appeal:</Text> You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Managing Communication Preferences:</Text> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.
        </Text>
        <Text style={styles.paragraph}>
          You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Complaints</Text>
        <Text style={styles.paragraph}>
          If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.
        </Text>
      </View>

      {/* International Users Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>International Users</Text>
        <Text style={styles.paragraph}>
          Please note that we may transfer, store, and process your personal information outside the country you live in, including the United States. Your personal information is also processed by staff and third-party service providers and partners in these countries.
        </Text>
        <Text style={styles.paragraph}>
          If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
        </Text>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Contact</Text>
        <Text style={styles.paragraph}>
          Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call [TOLL FREE TELEPHONE NUMBER IF YOU HAVE A PHYSICAL RETAIL LOCATION] or email us at kushwahharendra2004@gmail.com or contact us at 3 Shivshakti Nagar, Bhargav Road, Kubernagar, Ahmedabad, 382340 GJ, India.
        </Text>
        <Text style={styles.paragraph}>
          [NOTE TO MERCHANT: INSERT THE FOLLOWING IF YOUR SITE IS GOVERNED BY GDPR] For the purpose of applicable data protection laws, we are the data controller of your personal information. Our representative in the [EEA] [and] [the UK] is [INSERT REPRESENTATIVE DETAILS].
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
    color: 'black'
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16,
    color: 'black'
  },
  tableContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    color: 'black',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
    color: 'black'
  },
  bold: {
    fontWeight: 'bold',
  },

});

export default PolicyScreen;
