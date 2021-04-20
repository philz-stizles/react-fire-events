import React from 'react';
import { useField } from 'formik';
import { Label, FormField, Select } from 'semantic-ui-react';

const CustomSelectInput = ({label, ...rest}) => {
  const [field, meta, helpers] = useField(rest);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...rest} />
      { 
        (meta.touched && meta.error) 
        ? <Label basic color="red" content={meta.error} /> 
        : null 
      }
    </FormField>
  )
}

export default CustomSelectInput
