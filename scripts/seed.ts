import initialDbContainer from "./initialDbContainer";
import seedBooks from "./seedBooks";
import seedUsers from "./seedUsers";

const seed = async () => {
  await initialDbContainer();
  await seedBooks();
  await seedUsers();
};

seed();
