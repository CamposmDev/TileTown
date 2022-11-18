import ForumPost from "../../../../../@types/ForumPost"

export type ForumAction = 
| GetForumPostsByName
| SetCurrentForumPost
| Clear

export enum ForumActionType {
    setCurrentForumPost = 'SET_CURRENT_FORUM_POST',
    getForumPosts = 'GET_FORUM_POSTS',
    clear = 'CLEAR'
}

export type GetForumPostsByName = {
    type: ForumActionType.getForumPosts,
    payload: {
        forumPosts: ForumPost[]
    }
}

export type SetCurrentForumPost = {
    type: ForumActionType.setCurrentForumPost,
    payload: {
        currentForumPost: ForumPost
    }
}


export type Clear = {
    type: ForumActionType.clear
}

