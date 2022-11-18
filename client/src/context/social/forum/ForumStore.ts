import { ForumPost } from "@types"
import axios from "axios"
import { ForumApi } from "src/api"
import { SnackStore } from "src/context/snack/SnackStore"
import { ForumAction, ForumActionType } from "./ForumAction"

export interface ForumState {
    currentForumPost: ForumPost | undefined
    forumPosts: ForumPost[]
}

export class ForumStore {
    private readonly _forum: ForumState
    private readonly _setForum: (forum: ForumState) => void

    constructor(forum: ForumState, setForum: (forum: ForumState) => void) {
        this._forum = forum
        this._setForum = setForum
    }

    public getCurrentForumPost(): ForumPost | undefined {
        return this._forum.currentForumPost
    }

    public async viewForumPost(forumPost: ForumPost, snack?: SnackStore): Promise<void> {
        ForumApi.viewForumById(forumPost.id).then(res => {
            if (res.status === 200) {
                this.handleAction({
                    type: ForumActionType.viewForumPost,
                    payload: {
                        oldForumPost: forumPost,
                        currentForumPost: res.data.forumPost
                    }
                })      
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public getForums(): ForumPost[] {
        return this._forum.forumPosts
    }

    public async getForumPostsByName(query: string, snack?: SnackStore): Promise<void> {
        let res = ForumApi.getForums(query)
        res.then(res => {
            if (res.status === 200) {
                let arr = res.data.forumPosts
                if (arr) {
                    snack?.showSuccessMessage(res.data.message)
                    this.handleAction({
                        type: ForumActionType.getForumPosts,
                        payload: {
                            forumPosts: arr
                        }
                    })
                }
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async clearCurrentForumPost(): Promise<void> {
        this.handleAction({
            type: ForumActionType.clear
        })
    }

    protected handleAction(action: ForumAction) {
        switch (action.type) {
            case ForumActionType.getForumPosts: {
                this._setForum({
                    currentForumPost: this._forum.currentForumPost,
                    forumPosts: action.payload.forumPosts
                })
                break
            }
            case ForumActionType.viewForumPost: {
                let i = this._forum.forumPosts.indexOf(action.payload.oldForumPost)
                this._forum.forumPosts.splice(i, 1, action.payload.currentForumPost)
                this._setForum({
                    currentForumPost: action.payload.currentForumPost,
                    forumPosts: this._forum.forumPosts
                })
                break
            }
            case ForumActionType.clear: {
                this._setForum({
                    currentForumPost: undefined,
                    forumPosts: this._forum.forumPosts
                })
                break
            }
        }
    }
}