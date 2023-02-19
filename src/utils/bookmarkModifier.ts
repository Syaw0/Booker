type BookMarkType = [
  userId: string,
  wishlist: string[],
  bookId: string,
  isBookMarked: boolean
];

const bookmarkModifier = async (bookmarkData: BookMarkType) => {
  const userId = `${bookmarkData[0]}`;
  const wishlist = bookmarkData[1];
  const bookId = `${bookmarkData[2]}`;
  const isBookMarked = bookmarkData[3];

  const query = `
    query HandleBookMark($userId:String!,$wishlist:[String]!,$bookId:String!,$isBookMarked:Boolean!){
      handleBookMark(userId:$userId,wishlist:$wishlist,bookId:$bookId,isBookMarked:$isBookMarked){
        status
        msg
      }
    }
  `;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userId, bookId, wishlist, isBookMarked },
    }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default bookmarkModifier;
