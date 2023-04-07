import React, { useState, useEffect, useCallback, useRef } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { DebounceInput } from 'react-debounce-input'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
 
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.25),
    },

    marginLeft: 0,
 
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(2, 1, 2, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // height: '0.20em',
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            // '&:focus': {
            //     width: '24ch',
            // },
        },
    },
}));




export default function SearchAppBar(props: { setSearchTicket?: any, setSearchValue?: any, callBackFunction?: any, obj?: any,value?:any}) {
   
    const [filteredCities, setFilteredCities] = useState([])
    const handleChange = (query: string) => {
        if (props.setSearchTicket) {
            props.setSearchTicket(query);
        }
        if (props.callBackFunction) {
            if (props.obj) {
                props.callBackFunction(props.obj, query);
            }
            else {
                props.callBackFunction(query);
            }
        }
      }
     
      const removeExtraSpace = (s:any) => s.trim().split(/ +/).join(' ');

    // React.useEffect(() => {
    //     if (props.callBackFunction) {
    //         props.callBackFunction();
    //     }
    // }, []);

    return (
        <>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <DebounceInput
                    // element={StyledInputBase}
                    // style={{
                    //     padding: "16px 0px 16px 0px",
                    //     paddingLeft: "calc(1em + 20px)",
                    //     transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                    // }}
                    className={"searcg-field"}
                    placeholder="Search here..."
                    minLength={1}
                    debounceTimeout={500}
                    // onChange={event => (handleChange(removeExtraSpace(event.target.value)))}
                    onChange={
                        event=>{
                            let abc = removeExtraSpace(event.target.value)
                            handleChange(abc)
                        }
                    }
                    value={props.value}
                />
                {/* <StyledInputBase placeholder="Search" onChange={(e: any) => handleChange(e.currentTarget.value)} /> */}
            </Search>
        </>
    );
}



