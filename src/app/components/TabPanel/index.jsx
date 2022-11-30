import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import TabItem from './TabItem';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { tabItems, childProps, textColor, indicatorColor, ariaLabel } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          textColor={textColor || 'secondary'}
          indicatorColor={indicatorColor || 'secondary'}
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel || 'Tab panel'}
        >
          {tabItems.map((header, index) => (
            <Tab key={index} label={header.header} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {tabItems.map((item, index) => (
        <TabItem key={index} value={value} index={index}>
          {item.component(childProps)}
        </TabItem>
      ))}
    </Box>
  );
}

TabPanel.propTypes = {
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      component: PropTypes.func,
    })
  ).isRequired,
  childProps: PropTypes.object,
  textColor: PropTypes.string,
  indicatorColor: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default TabPanel;
