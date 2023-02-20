interface FilteredDataType {
  keyword: string;
  categories: string[];
  max: string;
  min: string;
}
const makeQueryForDb = ({
  keyword,
  categories,
  max,
  min,
}: FilteredDataType) => {
  const keywordQuery =
    keyword != null
      ? `( name LIKE "%${keyword}%" or category LIKE "%${keyword}%" or author LIKE "%${keyword}%" ) `
      : "";
  let priceQuery = "";
  if (max != "" && min != "") {
    priceQuery = `( price >= ${min} and price <= ${max} )`;
  } else if (max != "") {
    priceQuery = `( price <= ${max} )`;
  } else if (min != "") {
    priceQuery = `( price >= ${min} )`;
  } else {
    priceQuery = ``;
  }
  let categoryQuery;
  if (categories.length != 0) {
    categoryQuery = categories.map((cate) => ` category="${cate}" `);
    categoryQuery = categoryQuery.join(" or ");
    categoryQuery = `(${categoryQuery})`;
  } else {
    categoryQuery = "";
  }

  let query: any = [keywordQuery, priceQuery, categoryQuery];
  query = query.filter((s: string) => s !== "");
  query = query.join(" and ");

  return query;
};

export default makeQueryForDb;
