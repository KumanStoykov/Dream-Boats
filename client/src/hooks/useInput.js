import { useState } from 'react';

const useInput = (validation) => {
    const [value, setValue] = useState('');
    const [hasTouched, setHasTouched] = useState(false);

    const onChange = (e) => {
        setValue(e.target.value);        
    }
    const onBlur = () => {
        setHasTouched(true);
    };

    const reset = () => {
        setValue('');
        setHasTouched(false);
    }

    const fieldIsValid = validation(value);
    const hasError = !fieldIsValid && hasTouched;

    return{
        value,
        setValue,
        fieldIsValid,
        hasError,
        onChange,
        onBlur,
        reset
    }
}

export default useInput;