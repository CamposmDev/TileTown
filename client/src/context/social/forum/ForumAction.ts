import ForumPost from "../../../../../@types/ForumPost"

export type ForumAction = 
| GetForumPostsByName
| ViewForumPost
| Clear

export enum ForumActionType {
    getForumPosts = 'GET_FORUM_POSTS',
    viewForumPost = 'VIEW_FORUM_POST',
    clear = 'CLEAR'
}

export type GetForumPostsByName = {
    type: ForumActionType.getForumPosts,
    payload: {
        forumPosts: ForumPost[]
    }
}

export type ViewForumPost = {
    type: ForumActionType.viewForumPost,
    payload: {
        oldForumPost: ForumPost
        currentForumPost: ForumPost
    }
}


export type Clear = {
    type: ForumActionType.clear
}

