import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function BasicDatePicker({
  label,
  value,
  setValue,
  shouldStatic,
  disablePast,
  today,
  ...rest
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {shouldStatic ? (
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          onChange={(newValue) => setValue(newValue)}
          value={dayjs(value)}
          renderInput={(params) => <TextField {...params} />}
          disableOpenPicker
          disablePast={!!disablePast}
          {...rest}
        />
      ) : (
        <DatePicker
          label={label || 'Select Date'}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          disablePast={!!disablePast}
          {...rest}
        />
      )}
    </LocalizationProvider>
  );
}
