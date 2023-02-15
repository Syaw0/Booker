import { book1, book2, book3, book4 } from "./fakeBooks";

const fakeOrder1: Order = {
  books: [
    { ...book1, num: 2 },
    { ...book2, num: 3 },
  ],
  date: "2022-02-01",
  orderId: "2",
  state: "delivered",
  totalPrice: "103",
};

const fakeOrder2: Order = {
  books: [
    { ...book2, num: 2 },
    { ...book3, num: 3 },
  ],
  date: "2022-02-01",
  orderId: "3",
  state: "delivered",
  totalPrice: "23",
};

const fakeOrder3: Order = {
  books: [{ ...book4, num: 2 }],
  date: "2022-02-01",
  orderId: "4",
  state: "delivered",
  totalPrice: "444",
};

export { fakeOrder1, fakeOrder2, fakeOrder3 };
