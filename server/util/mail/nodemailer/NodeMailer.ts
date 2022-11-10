import nodemailer from 'nodemailer';
import { Mailer, MailOptions } from '../interfaces';


/**
 * Nodemailers transporter object thingy used to send emails
 */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tiletown123@gmail.com",
      pass: "hwqqcfuauauvymbm"
    },
});

/**
 * The nodemailer class - used to send emails via NodeMailer
 */
export default class NodeMailer implements Mailer { 

    public async sendMail(opts: MailOptions): Promise<void> {
        transporter.sendMail({ to: opts.to, from: opts.from, subject: opts.subject, text: opts.text });
    }

}