import bcrypt from 'bcrypt';

const ROUNDS = 10

export default class HashingUtils {

    static async hash(key: string): Promise<string> {
        let salt = await bcrypt.genSalt(ROUNDS)
        let hash = await bcrypt.hash(key, salt);
        return hash;
    }

    static async compare(key: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(key, hash);
    }
}