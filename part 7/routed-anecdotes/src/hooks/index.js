import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const clearField = (e) => {
    setValue('');
    e.target.value = '';
  };

  return { type, value, onChange, clearField };
};
