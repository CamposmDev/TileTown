import { MailOptions } from ".";

export default interface Mailer {

    sendMail(opts: MailOptions): Promise<void>;
    
}