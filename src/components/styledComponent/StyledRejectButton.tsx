import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';


interface StyledRejectButton {
  Status: string;
  onClick?: () => void;

}

const StyledRejectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.light,
  padding: '4px 12px',
  height: 'min-content',
  fontSize: "0.75rem",
  '&:hover, &.Mui-focusVisible': {
    backgroundColor: `${alpha(theme.palette.error.light, 0.7)}`
  }
}));

export default function StyledCustomization(props: StyledRejectButton) {
  return <StyledRejectButton onClick={props.onClick} >{props.Status}</StyledRejectButton>;
}
