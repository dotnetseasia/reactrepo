import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';


interface StyledAcceptButton {
  Status: string;
  onClick?: () => void;
  }
  
const StyledAcceptButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color:  theme.palette.success.main,
  backgroundColor: theme.palette.success.light,
  padding: '4px 12px',
  height: 'min-content',
  fontSize: "0.75rem",
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: `${alpha(theme.palette.success.light, 0.7)}`
  }
  // '& .MuiSlider-thumb': {
  //   '&:hover, &.Mui-focusVisible': {
  //     boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  //   '&.Mui-active': {
  //     boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  // },
}));

export default function StyledCustomization(props:StyledAcceptButton) {
  return <StyledAcceptButton onClick={props.onClick} >{props.Status}</StyledAcceptButton>;
}
