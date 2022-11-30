import { Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { CustomInput, CustomSelect } from 'app/components';
import { collectionModeOptions } from 'app/static-data/orders';

const OrderHeader = ({ getValues, setValue, control, errors }) => {
  return (
    <div className="flex flex-col p-[24px] w-full bg-white rounded-2">
      <div className="flex flex-row justify-between">
        <div>
          <img
            src="assets/images/logos/CaratellLogoBlack.png"
            className="h-[80px] max-w-full mb-[21px]"
            alt="logo"
          />
          <Typography
            variant="body1"
            color="inherit"
            className="mb-16 text-[16px] leading-[24px] text-grey"
          >
            23, Orchard Road, #12-34 <br />
            Singapur, 888888 <br />
            (65) 888888888 <br />
            admin@caratell.com
          </Typography>
        </div>
        <div className="flex flex-col items-end gap-[15px]">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <p className="text-[16px] text-dark-800">Invoice Number</p>
              <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
              <p className="text-[16px] text-dark-800">:</p>
            </div>
            <div className="w-[220px] ml-[5px]">
              <CustomInput
                name="invoiceNumber"
                control={control}
                error={!!errors.invoiceNumber}
                helperText={errors?.invoiceNumber?.message}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <p className="text-[16px] text-dark-800">Order Date</p>
              <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
              <p className="text-[16px] text-dark-800">:</p>
            </div>
            <div className="w-[220px] ml-[5px]">
              <CustomInput
                name="orderDate"
                type="date"
                control={control}
                error={!!errors.orderDate}
                helperText={errors?.orderDate?.message}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <p className="text-[16px] text-dark-800">Due Date</p>
              <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
              <p className="text-[16px] text-dark-800">:</p>
            </div>
            <div className="w-[220px] ml-[5px]">
              <CustomInput
                name="dueDate"
                type="date"
                control={control}
                error={!!errors.dueDate}
                helperText={errors?.dueDate?.message}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <p className="text-[16px] text-dark-800">Collection Mode</p>
              <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
              <p className="text-[16px] text-dark-800">:</p>
            </div>
            <div className="w-[220px] ml-[5px]">
              <CustomSelect
                name="collectionMode"
                control={control}
                options={collectionModeOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
