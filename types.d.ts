type CountryDetail = {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  tld: [string];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    USD: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    eng: string;
  };
  translations: {
    ara: {
      official: string;
      common: string;
    };
    bre: {
      official: string;
      common: string;
    };
  };
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: Record<string>;
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
};

type Country = {
  id: string;
  cflag: string;
  name: string;
  key: string;
};

type FormInputProps = {
  name: string;
  label: string;
  control: Control;
  helperText: string;
  required: boolean;
};

type SelectOption = { value: string; label: string }[];

type FormSelectInputProps = {
  name: string;
  label: string;
  control: Control;
  helperText: string;
  required: boolean;
  options: SelectOption;
};
