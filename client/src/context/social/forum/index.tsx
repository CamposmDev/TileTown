import { createContext, useState } from "react";
import ForumPostModal from "src/components/modals/ForumPostModal";
import { ForumState, ForumStore } from "./ForumStore";

const ForumContext = createContext<ForumStore>(new ForumStore({
    currentForumPost: undefined,
    forumPosts: []
}, () => {}))

function ForumContextProvider(props: Record<string, any>) {
    const [forum, setForum] = useState<ForumState>({
        currentForumPost: undefined,
        forumPosts: []
    })
    const Forum = new ForumStore(forum, setForum)
    return (
        <ForumContext.Provider value={Forum}>
            {props.children}
            <ForumPostModal/>
        </ForumContext.Provider>
    )
}

export { ForumContext, ForumContextProvider }