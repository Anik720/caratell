import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import {
  CustomInput,
  CustomSelect,
  CIMG,
  Editor,
  EditorPreview,
  ImageUpload,
} from 'app/components';
import { useSnackbar } from 'app/hooks';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import api from 'app/APIs/caratell-service/apiService';
import {
  getLastUrlFromImageArray,
  getImageArrayFromUrl,
  valueLabelToString,
  stringToValueLabel,
} from 'app/utils';
import { blogTabItmes } from 'app/static-data/blogs';

const schema = yup.object({
  thumbnail: yup.array().required('Thumbnail is required'),
  blogTitle: yup.string().required('Title is required'),
  blogContent: yup
    .string()
    .required('Content is required')
    .max(10000, 'Blog content cannot be more than 10000 characters'),
  blogCategory: yup.object().required('Blog Category is required'),
});

function UploadBlogThumbnail({ formProps }) {
  return (
    <div className="flex w-full flex-col flex-1 p-[20px] gap-[20px] bg-light-50 rounded-xl">
      <ImageUpload
        getValues={formProps.getValues}
        setValue={formProps.setValue}
        fieldName="thumbnail"
        maxFileSize={1024 * 1024 * 2}
        subtitle1="Maximum upload file size: 2 Mb"
        subtitle2="Recommended dimensions: 450x300px"
      />
    </div>
  );
}

function BlogTitle({ formProps }) {
  return (
    <div className="flex flex-col">
      <Typography className="text-[16px] text-black font-[600] mb-[16px]">Blog Title</Typography>
      <CustomInput
        name="blogTitle"
        control={formProps.control}
        className="bg-white"
        error={!!formProps.errors.blogTitle}
        helperText={formProps.errors?.blogTitle?.message}
        type="text"
        size="small"
        variant="outlined"
      />
    </div>
  );
}

function BlogEditor({ formProps }) {
  return (
    <div className="flex w-full flex-col bg-white">
      <Editor
        name="blogContent"
        control={formProps.control}
        errors={formProps.errors?.blogContent?.message}
      />
    </div>
  );
}

function BlogCategory({ formProps }) {
  return (
    <div className="flex flex-col">
      <Typography className="text-[16px] text-black font-[600] mb-[12px]">Blog Category</Typography>
      <CustomSelect name="blogCategory" control={formProps.control} options={blogTabItmes} />
    </div>
  );
}

function BlogContent({ formProps }) {
  const [thumbnail, blogTitle, blogContent] = useWatch({
    control: formProps.control,
    name: ['thumbnail', 'blogTitle', 'blogContent'],
  });

  const thumbnailImage = thumbnail && thumbnail.length > 0 && thumbnail[thumbnail.length - 1].url;
  // today date in 08 July 2020 format
  const today = new Date();
  const date = `${today.getDate()} ${today.toLocaleString('default', {
    month: 'long',
  })} ${today.getFullYear()}`;
  return (
    <div className="flex flex-col">
      <CIMG src={thumbnailImage || 'https://picsum.photos/450/300'} w="450px" h="300px" />
      <div className="flex flex-col p-[20px] bg-white">
        <Typography className="text-[12px] text-dark-800 font-[300] mb-[10px]">{date}</Typography>
        <Typography className="text-[14px] text-dark-800 font-[600] mb-[15px]">
          {blogTitle || 'Blog Title'}
        </Typography>
        <div className="max-h-[500px] overflow-y-auto">
          <EditorPreview content={blogContent} />
        </div>
      </div>
    </div>
  );
}

/*
 * Blog Input and Output
 */
function BlogInput({ formProps }) {
  return (
    <div className="flex flex-col w-7/12">
      <div className="flex flex-col w-full gap-[24px]">
        <UploadBlogThumbnail formProps={formProps} />
        <BlogTitle formProps={formProps} />
        <BlogEditor formProps={formProps} />
      </div>
    </div>
  );
}

function BlogOutput({ formProps }) {
  return (
    <div className="flex w-5/12 flex-col flex-1 gap-[24px]">
      <BlogCategory formProps={formProps} />
      <BlogContent formProps={formProps} />
    </div>
  );
}

const CreateBlogPost = ({ blogPost }) => {
  const showSnackbar = useSnackbar();
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      blogTitle: blogPost.title || '',
      blogContent: blogPost.description || '',
      blogCategory: stringToValueLabel(blogPost.category || blogTabItmes[0]),
      thumbnail: getImageArrayFromUrl(blogPost.image || ''),
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        image: getLastUrlFromImageArray(data.thumbnail),
        title: data.blogTitle,
        description: data.blogContent,
        category: valueLabelToString(data.blogCategory),
      };
      if (blogPost.id) {
        await api.updateBlog(payload, blogPost.id);
        showSnackbar('Blog updated successfully');
      } else {
        await api.createBlog(payload);
        showSnackbar('Blog created successfully');
      }
      navigate('/content/blog');
    } catch (err) {
      showSnackbar('Something went wrong', 'e');
    }
  };

  // console.log('watching values', watch());
  // console.log('Control', control);

  return (
    <form
      name="addProductForm"
      noValidate
      className="flex flex-col justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1 p-[30px] gap-[20px] bg-grey-50">
        <section className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              {blogPost.id ? 'Edit Blog' : 'Create Blog'}
              <Tooltip title="Create Post" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row gap-[10px]">
            <Button
              component={Link}
              to="/content/blog"
              className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
              variant="contained"
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button
              className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
              variant="contained"
              aria-label="Publish"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              {blogPost.id ? 'Update' : 'Publish'}
            </Button>
          </div>
        </section>
        <section className="flex flex-row gap-[20px]">
          <BlogInput
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
          <BlogOutput
            formProps={{
              getValues,
              setValue,
              control,
              formState,
              errors,
            }}
          />
        </section>
      </div>
    </form>
  );
};

export default CreateBlogPost;
