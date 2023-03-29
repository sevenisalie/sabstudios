import React, { useRef, useEffect, useState } from 'react'

function useEventListener(type: string, handler: (e: any) => void, el = window) {
    const savedHandler: React.MutableRefObject<any> = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (e: any) => savedHandler.current(e);

        el.addEventListener(type, listener);

        return () => {
            el.removeEventListener(type, listener);
        };
    }, [type, el]);
}

export default useEventListener