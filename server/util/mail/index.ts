import { Mailer } from "./interfaces";
import { NodeMailer } from "./nodemailer";

const mailer: Mailer = new NodeMailer();

export { mailer as Mailer };
