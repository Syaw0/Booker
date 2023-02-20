import generateDbBase from "./generateDbBase";
import seedBooks from "./seedBooks";
import seedIntroducers from "./seedIntroducers";
import seedUsers from "./seedUsers";

const seed = async () => {
  await generateDbBase();
  await seedBooks();
  await seedUsers();
  await seedIntroducers();
  process.exit();
};

seed();
