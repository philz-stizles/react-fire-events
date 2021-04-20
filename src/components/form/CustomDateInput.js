import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Label, FormField } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomSelectInput = ({label, ...rest}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(rest);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...rest}
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => setFieldValue(field.name, value)}
      />
      { 
        (meta.touched && meta.error) 
        ? <Label basic color="red" content={meta.error} /> 
        : null 
      }
    </FormField>
  )
}

export default CustomSelectInput
