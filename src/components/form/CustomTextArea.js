import React from 'react';
import { useField } from 'formik';
import { Label, FormField } from 'semantic-ui-react';

const CustomTextArea = ({label, ...rest}) => {
  const [field, meta] = useField(rest);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...rest} />
      { (meta.touched && meta.error) ? <Label basic color="red" content={meta.error} /> : null }
    </FormField>
  )
}

export default CustomTextArea
