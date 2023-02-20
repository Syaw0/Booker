import { execSync } from "child_process";

import dotenv from "dotenv";
dotenv.config();

const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
const MARIADB_USER = process.env.MARIADB_USER;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const MARIADB_CONTAINER_NAME = "Maria";
const REDIS_CONTAINER_NAME = "Redis";

// --rm flag is for test purpose

const redisContainerCmd = `docker run -d -p 3232:6379 --rm --name=${REDIS_CONTAINER_NAME} -e REDIS_PASSWORD=${REDIS_PASSWORD} public.ecr.aws/ubuntu/redis:latest`;
const mariadbContainerCmd = `docker run -d -p 3030:3306 --rm --name=${MARIADB_CONTAINER_NAME} -e MARIADB_ROOT_PASSWORD=${MARIADB_PASSWORD} public.ecr.aws/docker/library/mariadb:latest`;

const stopContainerCmd = (name: string) => {
  return `docker stop ${name} && docker rm ${name}`;
};
const killContainers = () => {
  try {
    execSync(stopContainerCmd(redisContainerCmd));
  } catch (err) {}
  try {
    execSync(stopContainerCmd(mariadbContainerCmd));
  } catch (err) {}
};

const initialDbContainer = async () => {
  console.log("start operation");
  try {
    console.log("Stop and Remove redis db container");
    execSync(stopContainerCmd(REDIS_CONTAINER_NAME));
  } catch (err) {}
  try {
    console.log("Stop and Remove mariadb db container");
    execSync(stopContainerCmd(MARIADB_CONTAINER_NAME));
  } catch (err) {}
  console.log("initial Redis Db container");

  execSync(redisContainerCmd);
  console.log("initial Maria Db container");
  execSync(mariadbContainerCmd);

  return { killContainers };
};
export default initialDbContainer;
