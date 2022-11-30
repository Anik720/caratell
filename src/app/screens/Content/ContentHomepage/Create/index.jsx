import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import api from 'app/APIs/caratell-service/apiService';
import CreateBanner from './CreateBanner';

const BlogPost = () => {
  const { bannerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [bannerDetails, setBannerDetails] = useState({});

  useEffect(() => {
    if (bannerId) {
      const fetchBanner = async () => {
        const data = await api.getSingleBanner(bannerId);
        setBannerDetails(data);
        setLoading(false);
      };
      fetchBanner();
    } else setLoading(false);
  }, [bannerId]);

  if (loading) return <FuseLoading />;

  return (
    <div>
      <CreateBanner bannerDetails={bannerDetails} />
    </div>
  );
};

export default BlogPost;
