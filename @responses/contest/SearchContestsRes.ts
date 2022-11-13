import { Contest } from "@types";

export default interface SearchContestsRes {
    contests: Contest[]
    message: string
}