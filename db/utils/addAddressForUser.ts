import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const addAddressForUser = async (userId: string, addressData: any) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    const { city, country, receiverName, state, street, tel, title, zipCode } =
      addressData;

    await con.query(
      `
      INSERT INTO addresses (title,receiverName,country,city,state,street,zipCode,tel,userId) VALUES(?,?,?,?,?,?,?,?,?)
    `,
      [title, receiverName, country, city, state, street, zipCode, tel, userId]
    );
    return { status: true, msg: "Created!" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Add Address In Maria!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default addAddressForUser;
