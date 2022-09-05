import { useState } from "react";
export function useTheme(initialValue){
    const [mode, setMode] = useState(initialValue)
    function themeToggler() { mode === 'l' ? setMode('d') : setMode('l') }
    return [mode, themeToggler]
}