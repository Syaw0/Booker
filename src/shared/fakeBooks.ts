import categories from "./allCategories";

const book1: BookCardPropsType = {
  author: "James Clear",
  bookId: "1",
  image:
    "https://user-images.githubusercontent.com/90524474/218446430-d11993ee-7d75-4411-9f9b-a174d07f67a8.jpg",
  name: "Atomic Habit",
  price: "10",
  category: categories[0],
  description:
    "James Clear, an expert on habit formation, reveals practical strategies that will teach you how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results...",
};

const book2: BookCardPropsType = {
  author: "Robert Green",
  bookId: "2",
  image:
    "https://user-images.githubusercontent.com/90524474/218446411-3ae04207-bad3-4391-9232-6b14192ba492.jpg",
  name: "War",
  price: "12",
  category: categories[0],
  description: "",
};

const book3: BookCardPropsType = {
  author: "Robert Green",
  bookId: "3",
  image:
    "https://user-images.githubusercontent.com/90524474/218446440-18823dbb-2ad3-4146-8d89-feec04975318.jpg",
  name: "Power",
  price: "11",
  category: categories[0],
  description: "",
};

const book4: BookCardPropsType = {
  author: "Irvin Yalom",
  bookId: "4",
  category: categories[0],
  image:
    "https://images.squarespace-cdn.com/content/v1/5ada91e331d4df2af37677c2/1546724290419-6SWQ266NWYX3Q0JLZX34/yalom-cover-momma.jpg?format=500w",
  name: "Momma and the meaning of life",
  price: "10",
  description:
    "Psychotherapist Irvin D. Yalom probes further into the mysteries of the therapeutic encounter in this entertaining and thoughtful follow-up to his bestselling Love's ExecutionerIn six enthralling stories ...",
};

export { book1, book2, book3, book4 };
