/* eslint-disable unused-imports/no-unused-imports */
import _ from 'lodash';
import clsx from 'clsx';
import { Typography, Tooltip, Button, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getBlogItemsSF,
  setBlogSearchTextSF,
  setBlogTab,
} from 'app/store/appstore/blogStore/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from 'app/components';
import { blogTabItmes } from 'app/static-data/blogs';
import BlogTable from './BlogTable';

function CustomerList() {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.blog.searchText);
  const blogTab = useSelector(({ appstore }) => appstore.blog.blogTab);

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Blog
              <Tooltip title="Blog" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                component={Link}
                to="/content/blog/create"
                className="rounded-none h-[40px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
              >
                Create Post
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row border-b-1 border-b-[#F0F0F0]">
          {blogTabItmes.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                dispatch(setBlogTab(item.value));
                dispatch(setBlogSearchTextSF(''));
                dispatch(getBlogItemsSF({ page: 0, limit: 10 }));
              }}
              sx={{
                borderBottom: '30px solid white',
                borderRight: '15px solid transparent',
                height: 0,
                padding: '0 10px',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <div
                className={clsx(
                  'py-[6px] px-[8px] text-[13px] font-medium',
                  blogTab == item.value ? 'text-blue font-bold' : 'text-grey'
                )}
              >
                {_.startCase(item.label)}
              </div>
            </Box>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-light">
            <SearchBox
              searchText={searchText}
              applySearch={(value) => {
                dispatch(setBlogSearchTextSF(value));
                dispatch(getBlogItemsSF({ page: 0, limit: 10 }));
              }}
            />
            <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
              <BlogTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
