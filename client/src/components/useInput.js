import React, { useState } from 'react';

export const useInput =(initalState) =>{
    const[state, setState] = useState(initalState)
    const handleChange = updatedValue =>{
        setState(updatedValue)
    }
    return [state,setState,handleChange]
}