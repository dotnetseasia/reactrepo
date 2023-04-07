import theme from '../../theme/theme';


export default ({ palette, spacing }:any) => {
    const radius = theme.spacing(2.5);
    const size = theme.spacing(4);
    const rightBgColor = theme.palette.primary.main;
    // if you want the same as facebook messenger, use this color '#09f'
    return {
      avatar: {
        width: size,
        height: size,
      },
      leftRow: {
        textAlign: 'left',
      },
      rightRow: {
        textAlign: 'right',
      },
      msg: {
        padding: spacing(1, 2),
        borderRadius: 4,
        marginBottom: 4,
        display: 'inline-block',
        wordBreak: 'break-word',     
        fontSize: '14px',
      },
      left: {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        backgroundColor: theme.palette.primary.light,
      },
      right: {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        backgroundColor: rightBgColor,
        color: palette.common.white,
      },
      leftFirst: {
        borderTopLeftRadius: radius,
      },
      leftLast: {
        borderBottomLeftRadius: radius,
      },
      rightFirst: {
        borderTopRightRadius: radius,
      },
      rightLast: {
        borderBottomRightRadius: radius,
      },
    };
  };