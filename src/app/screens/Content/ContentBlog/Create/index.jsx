/* eslint-disable unused-imports/no-unused-imports */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import api from 'app/APIs/caratell-service/apiService';
import CreateBlogPost from './CreateBlogPost';

const BlogPost = () => {
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState({});

  useEffect(() => {
    if (blogId) {
      const fetchBlogPost = async () => {
        const data = await api.getSingleBlog(blogId);
        setBlogPost(data);
        setLoading(false);
      };
      fetchBlogPost();
    } else setLoading(false);
  }, [blogId]);

  if (loading) return <FuseLoading />;

  return (
    <div>
      <CreateBlogPost blogPost={blogPost} />
    </div>
  );
};

export default BlogPost;
