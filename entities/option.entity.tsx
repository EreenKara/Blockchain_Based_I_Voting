export interface Option {
  id: number;
  optionId: number; // FK  - parentId
  name: string;
  description: string;
}
