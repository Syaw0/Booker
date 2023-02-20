const loggedUserRegex = /\/auth/;

const checkLoggedUserAccess = (url: string) => {
  return loggedUserRegex.test(url);
};

export default checkLoggedUserAccess;
