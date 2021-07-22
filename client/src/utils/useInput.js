import {useCallback, useState} from 'react';

function useInput(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    let {target: {name}} = e;
    const {target: {value}} = e;
    if (name.includes('-')) {
      name = name.replace('-', '_');
    }

    setForm((form) => ({...form, [name]: value}));
  }, []);

  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  return [form, onChange, reset];
}

export default useInput;
