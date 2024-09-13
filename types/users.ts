interface Address {
  city: string;
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface UserInterfaceIdiom {
  address: Address;
  company: Company;
  email: string;
  id: string | number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
