declare module 'country-state-city' {
    export const Country: {
      getAllCountries: () => Array<{ isoCode: string; name: string; phonecode: string; flag: string; currency: string; latitude: string; longitude: string; }>
    };
  
    export const State: {
      getStatesOfCountry: (countryCode: string) => Array<{ isoCode: string; name: string; countryCode: string; }>
    };
  
    export const City: {
      getCitiesOfState: (countryCode: string, stateCode: string) => Array<{ name: string; stateCode: string; countryCode: string; }>
    };
  }
  