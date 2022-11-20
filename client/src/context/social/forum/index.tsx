import { createContext, useState } from "react";
import ForumPostViewerModal from "src/components/modals/ForumPostViewerModal";
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
            <ForumPostViewerModal/>
        </ForumContext.Provider>
    )
}

export { ForumContext, ForumContextProvider }