import PropTypes from 'prop-types';
import { Typography, Accordion, AccordionDetails } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

const AccordionSummaryRight = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const AccordionSummaryLeft = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(0deg)',
    marginRight: '1rem',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const CustomAccordion = ({ title, index, children, align }) => {
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
      }}
    >
      {align && align === 'left' ? (
        <AccordionSummaryLeft
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{
            height: '64px',
            borderBottom: '1px solid #c7c7c7',
          }}
        >
          <Typography>{title}</Typography>
        </AccordionSummaryLeft>
      ) : (
        <AccordionSummaryRight
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{
            height: '64px',
            borderBottom: '1px solid #c7c7c7',
          }}
        >
          <Typography>{title}</Typography>
        </AccordionSummaryRight>
      )}
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

CustomAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomAccordion;
