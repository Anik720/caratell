import { Controller } from 'react-hook-form';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import PropTypes from 'prop-types';

const Editor = ({ control, name, errors }) => {
  return (
    <>
      <Controller
        render={({ field }) => <WYSIWYGEditor errors={errors} {...field} />}
        name={name}
        control={control}
      />
    </>
  );
};

Editor.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.string,
};

export default Editor;
