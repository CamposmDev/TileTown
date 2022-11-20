import ForumPost from "../../../../../@types/ForumPost"

export type ForumAction = 
| GetForumPostsByName
| ViewForumPost
| LikeForumPost
| DislikeForumPost
| CommentForumPost
| UpdateForumPost
| Clear

export enum ForumActionType {
    getForumPosts = 'GET_FORUM_POSTS',
    viewForumPost = 'VIEW_FORUM_POST',
    likeForumPost = 'LIKE_FORUM_POST',
    dislikeForumPost = 'DISLIKE_FORUM_POST',
    commentForumPost = 'COMMENT_FORUM_POST',
    updateForumPost = 'UPDATE_FORUM_POST',
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

export type LikeForumPost = {
    type: ForumActionType.likeForumPost,
    payload: {
        oldForumPost: ForumPost | undefined
        currentForumPost: ForumPost
    }
}

export type DislikeForumPost = {
    type: ForumActionType.dislikeForumPost,
    payload: {
        oldForumPost: ForumPost | undefined
        currentForumPost: ForumPost
    }
}

export type CommentForumPost = {
    type: ForumActionType.commentForumPost,
    payload: {
        oldForumPost: ForumPost | undefined
        currentForumPost: ForumPost
    }
}

export type UpdateForumPost = {
    type: ForumActionType.updateForumPost,
    payload: {
        oldForumPost: ForumPost | undefined
        currentForumPost: ForumPost
    }
}

export type Clear = {
    type: ForumActionType.clear
}

