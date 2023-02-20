import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const deleteAddressById = async (addressId: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    await con.query(`
      DELETE FROM addresses WHERE addressId="${addressId}"
    `);

    return { status: true, msg: "Successfully delete address." };
  } catch (err) {
    return {
      status: false,
      msg: "Error During Delete Address!",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default deleteAddressById;
