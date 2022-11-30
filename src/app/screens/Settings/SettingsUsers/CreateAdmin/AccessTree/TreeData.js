export const treeData = {
  id: 'root',
  name: 'Access Rights',
  children: [
    {
      id: 'product',
      name: 'Product',
      children: [
        {
          id: 'inventory',
          name: 'Inventory',
        },
        {
          id: 'product_mapping',
          name: 'Product Mapping',
          children: [
            {
              id: 'tags_and_group_tag',
              name: 'Tags and Group Tag',
            },
            {
              id: 'product_menu',
              name: 'Product Menu',
            },
            {
              id: 'collections',
              name: 'Collections',
            },
            {
              id: 'p_expert_kyc',
              name: 'Expert KYC',
            },
          ],
        },
        {
          id: 'collection',
          name: 'Collection',
        },
        {
          id: 'policies',
          name: 'Policies',
        },
      ],
    },
    {
      id: 'blog',
      name: 'Blog',
    },
    {
      id: 'orders',
      name: 'Orders',
    },
    {
      id: 'live_chat',
      name: 'Live Chat',
    },
    {
      id: 'live_stream',
      name: 'Live Stream',
    },
    {
      id: 'calendar',
      name: 'Calendar',
      children: [
        {
          id: 'bookings',
          name: 'Bookings',
        },
        {
          id: 'operating_hours',
          name: 'Operating Hours',
        },
        {
          id: 'off_days',
          name: 'Off Days',
        },
      ],
    },
    {
      id: 'customers',
      name: 'Customers',
      children: [
        {
          id: 'customer_list',
          name: 'Customer List',
        },
        {
          id: 'c_expert_kyc',
          name: 'Expert KYC',
        },
      ],
    },
    {
      id: 'manage_accounts',
      name: 'Manage Accounts',
    },
  ],
};
