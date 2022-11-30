const ActionButton = (props) => {
  return (
    <div className="w-full flex items-center">
      <button
        type="button"
        className="w-full h-full bg-transparent text-blue-500 font-medium py-2 px-4"
      >
        Edit
      </button>

      <button
        type="button"
        className="w-full h-full bg-transparent text-red-500 font-medium py-2 px-4"
      >
        Delete
      </button>
    </div>
  );
};

const ProductImage = (props) => {
  return (
    <>
      <img
        src="https://picsum.photos/300/300"
        alt={props.row.name}
        style={{ width: '75px', height: '75px' }}
      />
    </>
  );
};

const ProductColumns = [
  {
    Header: 'Product Image',
    accessor: 'imageUrl',
    Cell: ProductImage,
    isSortable: false,
  },
  {
    Header: 'Product Name',
    accessor: 'name',
    type: String,
    isSortable: true,
    width: '450px',
  },
  {
    Header: 'Product SKU',
    accessor: 'sku',
    type: String,
    isSortable: true,
  },
  {
    Header: 'No. of Tags',
    accessor: 'numberOfTags',
    type: Number,
    isSortable: true,
    width: '145px',
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
