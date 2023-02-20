import transporter from "./mailTransportation";
import dotEnv from "dotenv";

dotEnv.config();

const CoEmail = process.env.CoEmail;

const sendTfaTokenToEmail = async (email: string, token: string | number) => {
  await transporter.sendMail({
    from: CoEmail,
    to: email,
    subject: "Two Factor Authentication",
    html: `<p>${token}</p>`, // TODO write template for it
  });
};

export default sendTfaTokenToEmail;
