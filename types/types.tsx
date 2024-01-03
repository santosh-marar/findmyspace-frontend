export type RoomsComponentTypes = {
  id: string;
  roomImages: string[];
  price: number;
  district: string;
  city: string;
  chockName: string;
  genderPreference: boolean;
  nearPopularPlaceName: string;
  descriptionOfRoom: string;
  rules: string;
};

export type ResponseMessageType = {
  success: boolean;
  message: string;
};

export interface spaceProviderTypes {
  spaceProviderAvatar: string;
  fullName: string;
  phone: string;
  email: string;
  address: {
    district: string;
    city: string;
    chockName: string;
    nearPopularPlace: string;
  };
}
