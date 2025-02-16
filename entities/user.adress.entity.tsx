export interface UserAddress {
  id: number;
  userId: number; // FK
  cityId: number; // FK
  districtId: number; // FK
  neighborhoodId: number; // FK
  buildingNumber: string;
}
