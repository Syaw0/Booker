import { writeFileSync } from "fs";
import fetch from "node-fetch";
import path from "path";
import { pool } from "./dbConnectors";

const subjects = [
  "Architecture",
  "Art_Instruction",
  "Art_History",
  "Dance",
  "Design",
  "Fashion",
  "Film",
  "Graphic_Design",
  "Music",
  "Music_Theory",
  "Painting",
  "Photography",
  "Bears",
  "Cats",
  "Kittens",
  "Dogs",
  "Puppies",
  "Fantasy",
  "Historical_Fiction",
  "Horror",
  "Humor",
  "Literature",
  "Magic",
  "Mystery_and_detective_stories",
  "Plays",
  "Poetry",
  "Romance",
  "Science_Fiction",
  "Short_Stories",
  "Thriller",
  "Young_Adult",
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Programming",
  "Management",
  "Entrepreneurship",
  "Business_Economics",
  "Business_Success",
  "Finance",
  "Kids_Books",
  "Stories_in_Rhyme",
  "Baby_Books",
  "Bedtime_Books",
  "Picture_Books",
  "Ancient_Civilization",
  "Archaeology",
  "Anthropology",
  "Cooking",
  "Cookbooks",
  "Mental_Health",
  "Exercise",
  "Nutrition",
  "Self-help",
  "biography",
];

const getData = async () => {
  let books = [];
  for await (let subject of subjects) {
    console.log("getting data of ", subject);
    const resp = await fetch(
      `https://openlibrary.org/subjects/${subject.toLocaleLowerCase()}.json`
    );
    const data = await resp.json();
    for await (let work of data.works) {
      books.push({
        name: work.title,
        image: `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
        category: subject,
        author: work.authors[0].name,
        price: 0,
        description: "",
        bookId: work.key.split("/")[2].replace(/[a-z]/gi, ""),
      });
    }
  }
  return books;
};

const seedBooks = async () => {
  const books = await getData();
  const con = await pool.getConnection();
  let promisedArrayBook = books.map(async (b: any, i: number) => {
    // const re = await fetch(b.image);
    // // const blob: any = await re.blob();
    // // const buffer = Buffer.from(await blob.arrayBuffer());
    // // const savePath = path.join(
    // //   process.cwd(),
    // //   `/public/bookCover/${b.bookId}.png`
    // // );
    // // writeFileSync(savePath, buffer);
    let newItem = b;
    newItem.image = `/cover/${b.bookId}`;

    return Object.values(newItem);
  });
  let arrayBook = await Promise.all(promisedArrayBook);
  await con.batch(
    `INSERT IGNORE INTO booker.books (name,image,category,author,price,description,bookId) VALUES (?,?,?,?,?,?,?)`,
    arrayBook
  );
  console.log("insert to db completely done!");
  await con.end();
  process.exit();
};

export default seedBooks;
