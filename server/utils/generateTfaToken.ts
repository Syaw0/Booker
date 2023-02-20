const generateTfToken = () => {
  const token = Math.floor(100000 + Math.random() * (999999 - 100000));
  return token;
};

export default generateTfToken;
