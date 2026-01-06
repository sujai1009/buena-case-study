export interface Property {
  id: number;
  name: string;
  type: string;
  aggrementFile: UploadFile;
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;

  houseNumber: string;
  address: Address;
  property : Property;
}

interface Address {
  street: string;
  city: string;
  code: number;
  country: string
}

interface UploadFile {
  name: string;
  originalname: string;
  path: string,
}

export interface Unit {
  id: number;
  uNo: string;
  type: string;
  createdAt: string;
  updatedAt: string;

  floor: string;
  size: string;
  entrance: string;
  buildtYear: number;
  rooms: number;
  status: number;
}