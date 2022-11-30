import { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Paper, Popover, Typography } from '@mui/material';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import { useSnackbar } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { setProductsSearchTextSF } from 'app/store/appstore/productStore/productsSlice';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';

import productPageData from './productPageData';

function ProductFilter(props) {
  const { filterPoper, filterPoperClose } = props;
  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();

  const { setProductFilters, getProducts, resetProductFilters } = useProductStore();

  const [productTypeChecked, setProductTypeChecked] = useState([]);

  useEffect(() => {
    setProductTypeChecked(productPageData.productFilterTypeIdsOnly);
  }, []);

  const handleProductTypeChecked = (event, productType) => {
    const currentIndex = productTypeChecked.indexOf(productType.value);
    const newChecked = [...productTypeChecked];

    if (currentIndex === -1) {
      newChecked.push(productType.value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setProductTypeChecked(newChecked);
  };

  const [minPrice, setminPrice] = useState('');
  const [maxPrice, setmaxPrice] = useState('');

  const applyFilters = () => {
    if (maxPrice && minPrice && Number(maxPrice) < Number(minPrice)) {
      showSnackbar('Max price should be greater than min price', 'e');
      return;
    }
    setProductFilters({
      productTypes: productTypeChecked,
      minPrice,
      maxPrice,
    });
    dispatch(setProductsSearchTextSF(''));
    getProducts({ page: 0, limit: 10 });
    filterPoperClose();
  };

  const resetFilters = () => {
    resetProductFilters();
  };

  return (
    <Popover
      open={Boolean(filterPoper)}
      anchorEl={filterPoper}
      onClose={filterPoperClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      classes={{
        paper: 'py-8',
      }}
      className="ml-[-140px] max-w-[470px] w-full"
    >
      <div className="flex flex-col p-[15px]">
        <div>
          <Typography className="text-[14px] font-bold">Filter Products</Typography>
          <div className="flex flex-row flex-wrap flex-grow-[1]">
            {productPageData.productFilterTypes.map((option, index) => (
              <div key={index} className="flex flex-row basis-[33.333333%]">
                <div>
                  <Checkbox
                    checked={!!productTypeChecked.includes(option.value)}
                    onChange={(event) => {
                      handleProductTypeChecked(event, option);
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
                <div>
                  <Typography className="text-[12px] mt-[12px]">{option.label}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Typography className="text-[14px] font-bold mb-16">Product Price</Typography>
          <div className="flex flex-row justify-between">
            <div>
              <Paper className="flex items-center  w-[180px] h-[40px] max-w-512 rounded-4 px-8 shadow-0 border-2">
                <Input
                  placeholder="Minumum"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  value={minPrice}
                  inputProps={{
                    'aria-label': 'Minumum',
                  }}
                  onChange={(ev) => setminPrice(ev.target.value)}
                />
              </Paper>
            </div>
            <div className="flex items-center text-center justify-center w-[30px]">
              <RemoveTwoToneIcon />
            </div>
            <div>
              <Paper className="flex items-center  w-[180px] h-[40px] max-w-512 rounded-4 px-8 shadow-0 border-2">
                <Input
                  placeholder="Maximum"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  value={maxPrice}
                  inputProps={{
                    'aria-label': 'Maximum',
                  }}
                  onChange={(ev) => {
                    setmaxPrice(ev.target.value);
                  }}
                />
              </Paper>
            </div>
          </div>
        </div>

        <div className="w-full mt-[30px]">
          <Button
            className="rounded-none w-full h-[30px] bg-primary-blue hover:bg-primary-blue-300"
            variant="contained"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
        <div className="w-full mt-[10px]">
          <Button
            className="rounded-none w-full h-[30px] bg-black hover:bg-black-50"
            variant="contained"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </Popover>
  );
}

export default ProductFilter;
