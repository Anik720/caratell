import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { SearchBox, AllDeleteBox } from 'app/components';
import {
  deleteProducts,
  getProductsSF,
  setProductsSearchTextSF,
} from 'app/store/appstore/productStore/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { showMessage } from 'app/store/fuse/messageSlice';
import ProductTable from './ProductTable';
import ProductFilter from './ProductFilter';

function ShopProductList() {
  const [filterPoper, setfilterPoper] = useState(null);

  const dispatch = useDispatch();

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };

  const searchText = useSelector(({ appstore }) => appstore.products.searchText);
  const selected = useSelector(({ appstore }) => appstore.products.selectedProductIds);

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Product List
              <Tooltip title="Product List" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                className="rounded-none h-[40px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
                onClick={filterPoperClick}
              >
                <FilterAltIcon />
              </Button>
              <ProductFilter filterPoper={filterPoper} filterPoperClose={filterPoperClose} />
            </div>
            <div>
              <Button
                component={Link}
                to="/shop/add-product"
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-light">
            <div className="flex justify-between">
              <SearchBox
                placeholder="Search by product name"
                searchText={searchText}
                applySearch={(value) => {
                  dispatch(setProductsSearchTextSF(value));
                  dispatch(getProductsSF({ page: 0, limit: 10 }));
                }}
              />
              <AllDeleteBox
                title="Delete Selected Products"
                selected={selected}
                confimAction={() => {
                  dispatch(
                    showMessage({ message: 'Deleting selected products...', variant: 'info' })
                  );
                  dispatch(deleteProducts()).then(() => {
                    dispatch(
                      showMessage({ message: 'Products deleted successfully.', variant: 'success' })
                    );
                    dispatch(getProductsSF({ page: 0, limit: 10 }));
                  });
                }}
              />
            </div>
            <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
              <ProductTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProductList;
