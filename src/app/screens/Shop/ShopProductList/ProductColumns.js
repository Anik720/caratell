import { Button } from '@mui/material';
import { Link as Rlink } from 'react-router-dom';

const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center">
      <Button
        component={Rlink}
        to={`/shop/edit-product/${props.row.original.id}`}
        variant="text"
        className="w-full h-full bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        Edit
      </Button>

      <Button
        className="w-full h-full bg-transparent text-red-500 font-medium py-2 px-4"
        onClick={() => props.deleteProducts(props.row.original.id)}
      >
        Delete
      </Button>
    </div>
  );
};

const ProductImage = ({ value }) => {
  const productImg =
    value && value.length > 0 && value.filter((img) => img.type == 'primary')[0].url;
  return (
    <>
      <img
        src={productImg || 'https://picsum.photos/300/300'}
        alt="productImg"
        style={{ width: '75px', height: '75px' }}
      />
    </>
  );
};

const ProductColumns = [
  {
    Header: 'Product Image',
    accessor: 'images',
    Cell: ProductImage,
    isSortable: false,
  },
  {
    Header: 'Product Name',
    accessor: 'name',
    type: Date,
    isSortable: true,
    width: '255px',
  },
  {
    Header: 'Product SKU',
    accessor: 'sku',
    type: Number,
    isSortable: true,
  },
  {
    Header: 'Product Type',
    accessor: 'productType',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Product Price',
    accessor: 'price',
    type: String,
    isSortable: true,
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ActionButton,
    isSortable: false,
    align: 'center',
  },
];

export default ProductColumns;
