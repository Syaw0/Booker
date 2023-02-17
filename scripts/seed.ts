import generateDbBase from "./generateDbBase";
import seedBooks from "./seedBooks";
import seedUsers from "./seedUsers";

const seed = async () => {
  await generateDbBase();
  await seedBooks();
  await seedUsers();
};

seed();
