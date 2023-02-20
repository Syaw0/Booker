const guestRegex = /\/user/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url);
};

export default checkGuestUserAccess;
