  // src/components/interfaces/FormControlInterfaces.ts
  export interface LabelProps {
      children: React.ReactNode;
      className?: string;
    }
    
    export interface HelperTextProps {
      className?: string;
    }
   

    export interface CountryOption {
      name: string;
      isoCode: string;
    }
    
    export interface StateOption {
      name: string;
      isoCode: string;
      countryCode: string;
    }
    
    export interface CityOption {
      name: string;
    }
    