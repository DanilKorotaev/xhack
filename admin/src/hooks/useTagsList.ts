import {getTagsList} from "../http/tags/getTagsList.request";
import useLoader from "./useLoader";

const useTagsList = () =>  {
    const {
        data: tagsList,
        setData: setTagsList,
        reload: reloadTagsList,
        isLoading: isTagsListLoading,
        isLoadingError: isTagsListLoadingError,
    } = useLoader( {
        api: () => getTagsList(),
        deps: [],
    })

    return {tagsList, setTagsList, reloadTagsList, isTagsListLoading, isTagsListLoadingError};
}

export default useTagsList;