import { useState } from "react";

export function useForm(initialValue) {
    const [state, setState] = useState(initialValue)
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    return [state, handleOnChange]
}