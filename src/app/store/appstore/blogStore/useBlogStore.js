import { useDispatch, useSelector } from 'react-redux';
import { getBlogItemsSF, setBlogSearchTextSF } from './blogSlice';

const useProductMapStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.blog.searchText);
  const blogItems = useSelector(({ appstore }) => appstore.blog.blogItems);

  const getBlogItems = (payload) => {
    dispatch(getBlogItemsSF(payload));
  };

  const setBlogSearchText = (payload) => {
    dispatch(setBlogSearchTextSF(payload));
  };

  return {
    searchText,
    setBlogSearchText,
    getBlogItems,
    blogItems,
  };
};

export default useProductMapStore;
