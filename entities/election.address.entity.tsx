export interface ElectionAddress {
  id: number;
  electionId: number; // FK
  cityId: number; // FK
  districtId: number; // FK
  neighborhoodId: number; // FK
}
