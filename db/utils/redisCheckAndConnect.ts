import { redisClient } from "../dbController";

const redisCheckAndConnect = async () => {
  if (!redisClient.isOpen || !redisClient.isReady) {
    await redisClient.connect();
  }
  return redisClient;
};

export default redisCheckAndConnect;
