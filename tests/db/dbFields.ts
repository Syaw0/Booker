const userFields = {
  email: {
    Field: "email",
    Type: "varchar(300)",
    Null: "NO",
    Key: "UNI",
    Default: null,
    Extra: "",
  },
  password: {
    Field: "password",
    Type: "char(64)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  profileUrl: {
    Field: "profileUrl",
    Type: "varchar(200)",
    Null: "NO",
    Key: "",
    Default: "/prof/default",
    Extra: "",
  },
  userId: {
    Field: "userId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
  orders: {
    Field: "orders",
    Type: "varchar(2000)",
    Null: "NO",
    Key: "",
    Default: "[]",
    Extra: "",
  },
  addresses: {
    Field: "addresses",
    Type: "varchar(2000)",
    Null: "NO",
    Key: "",
    Default: "[]",
    Extra: "",
  },
  cart: {
    Field: "cart",
    Type: "varchar(2000)",
    Null: "NO",
    Key: "",
    Default: "[]",
    Extra: "",
  },
};

const bookFields = {
  name: {
    Field: "name",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  author: {
    Field: "author",
    Type: "varchar(300)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  image: {
    Field: "image",
    Type: "varchar(500)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  bookId: {
    Field: "bookId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
  price: {
    Field: "price",
    Type: "int(11)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  category: {
    Field: "category",
    Type: "varchar(400)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  description: {
    Field: "description",
    Type: "varchar(500)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
};

const addressesFields = {
  title: {
    Field: "title",
    Type: "varchar(300)",
    Null: "NO",
    Key: "UNI",
    Default: null,
    Extra: "",
  },
  receiverName: {
    Field: "receiverName",
    Type: "varchar(200)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  country: {
    Field: "country",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  street: {
    Field: "street",
    Type: "varchar(300)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  state: {
    Field: "state",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  zipCode: {
    Field: "zipCode",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  tel: {
    Field: "tel",
    Type: "varchar(200)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  addressId: {
    Field: "addressId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
};

const ordersFields = {
  date: {
    Field: "date",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },
  state: {
    Field: "state",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: "step1",
    Extra: "",
  },
  priceSummary: {
    Field: "priceSummary",
    Type: "varchar(1000)",
    Null: "NO",
    Key: "",
    Default: '{"shipping": "","subTotal": "","tax": "","total": ""}',
    Extra: "",
  },

  address: {
    Field: "address",
    Type: "varchar(1000)",
    Null: "NO",
    Key: "",
    Default:
      '{"title": "","receiverName": "","state": "","city": "","street": "","tel": "","zipCode": "","country": ""}',
    Extra: "",
  },
  books: {
    Field: "books",
    Type: "varchar(1000)",
    Null: "NO",
    Key: "",
    Default: "[]",
    Extra: "",
  },

  orderId: {
    Field: "orderId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
};

const introducersField = {
  name: {
    Field: "name",
    Type: "varchar(100)",
    Null: "NO",
    Key: "",
    Default: null,
    Extra: "",
  },

  books: {
    Field: "books",
    Type: "varchar(1000)",
    Null: "NO",
    Key: "",
    Default: "[]",
    Extra: "",
  },

  introducerId: {
    Field: "introducerId",
    Type: "int(11)",
    Null: "NO",
    Key: "PRI",
    Default: null,
    Extra: "auto_increment",
  },
};

export {
  userFields,
  bookFields,
  addressesFields,
  ordersFields,
  introducersField,
};
