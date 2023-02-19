import { pool } from "../../db/dbController";

const updatingAddress = async (addressData: any) => {
  let con;
  try {
    con = await pool.getConnection();
    const {
      city,
      country,
      receiverName,
      state,
      street,
      tel,
      title,
      zipCode,
      addressId,
    } = addressData;

    await con.query(
      `
      UPDATE addresses SET title="${title}" , city="${city}" , country="${country}" , receiverName="${receiverName}" , state="${state}" , zipCode="${zipCode}" , street="${street}" , tel="${tel}"  WHERE addressId="${addressId}" 
    `
    );
    return { status: true, msg: "Updated!" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Add Address In Maria!" };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default updatingAddress;
