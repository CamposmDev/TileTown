import Response from "../Response";
import { User } from '@types';

export default interface LoginRes extends Response {
    user?: User
}