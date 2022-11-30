import PropTypes from 'prop-types';
import { Accordion, AccordionDetails } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

const AccordionSummaryRight = styled((props) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row',
  '.MuiAccordion-rounded.Mui-expanded': {
    margin: '1px 0 !important',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(270deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0)',
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

const CustomAccordionV2 = ({ title, index, children, sx, shadow, expanded, align }) => {
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        margin: '0 !important',
        ...sx,
      }}
    >
      {align && align === 'left' ? (
        <AccordionSummaryLeft
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{
            borderBottom: '1px solid #c7c7c7',
          }}
        >
          {title}
        </AccordionSummaryLeft>
      ) : (
        <AccordionSummaryRight
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{
            borderBottom: shadow ? 'none' : '1px solid #c7c7c7',
            boxShadow: shadow ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
          }}
        >
          {title}
        </AccordionSummaryRight>
      )}
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

CustomAccordionV2.propTypes = {
  title: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  shadow: PropTypes.bool,
};

export default CustomAccordionV2;
