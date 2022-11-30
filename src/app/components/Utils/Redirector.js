
import { Link, useNavigate } from 'react-router-dom';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Redirector() {
    const isLoggedIn = useSelector(({ appstore }) => appstore.auth.isLoggedIn);
    const redirectFlag = useSelector(({ appstore }) => appstore.auth.redirect.redirectFlag);
    const redirectTo = useSelector(({ appstore }) => appstore.auth.redirect.redirectTo);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        if(redirectFlag){
            navigate(redirectTo);
        }
    }, [redirectTo]);

    return (
        <>
        </>
    );
}

export default Redirector;
