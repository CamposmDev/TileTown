import nodemailer from 'nodemailer';


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
 * The mailer class - basically used to send emails
 */
// export class Mailer { 

//     public async sendMail(opts: MailOptions): Promise<void> {
//         transporter.sendMail({ to: opts.to, from: opts.from, subject: opts.subject, text: opts.text });
//     }

// }



