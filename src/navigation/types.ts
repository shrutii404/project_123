export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Products: {
    data: {
      Type: string;
      category: string;
      data: any;
      imageData: any;
    };
  };
  ProductDetails: {
    route: {
      params: {
        productId: string;
      };
    };
  };
  Cart: undefined;
  SearchResults: undefined;
  Wishlist: undefined;
  ManageProfile: undefined;
  Checkout: undefined;
  ShopCart: undefined;
  Failure: undefined;
  Success: undefined;
  Policy: undefined;
  TermsAndServices: undefined;
  ShippingPolicy: undefined;
  RefundPolicy: undefined;
  About: undefined;
};
