type FilterDataType = [
  keyword: string,
  priceRange: { max: string; min: string },
  categories: string[]
];

const getFilteredBooks = async (filterData: FilterDataType) => {
  const keyword = filterData[0];
  const priceRange = filterData[1];
  const categories = filterData[2];

  const query = `
    query GetFilteredBooks($keyword:String!, $max:String!,$min:String!,$categories:[String]!){
      data:getFilteredBooks(keyword:$keyword,max:$max,min:$min,categories:$categories){
        status
        msg
        data{
          ...BOOK
        }
      }
    }

    fragment BOOK on Book{
      bookId
      name
      author
      image
      price
      category
      description
    }
  `;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        keyword,
        max: priceRange.max,
        min: priceRange.min,
        categories,
      },
    }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};

export const loaderMsg = "please wait to sort!";

export default getFilteredBooks;
