import { Dayjs } from "dayjs";

export interface CountryOption {
  name: string;
  isoCode: string;
}

export interface StateOption {
  name: string;
  isoCode: string;
}

export interface CityOption {
  name: string;
}

export interface InitialValues {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  lived_in_country?: string;
  worked_in_country?: string;
  state?: string;
  city?: string;
  address_line1?: string;
  address_line2?: string;
  zip_code?: string;
  date_of_birth?: Dayjs | null;
}
