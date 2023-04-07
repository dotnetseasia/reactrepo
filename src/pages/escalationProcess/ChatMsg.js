import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@mui/material/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import defaultChatMsgStyles from './defaultChatMsg.styles';
import theme from '../../theme/theme';

const ChatMsg = withStyles(defaultChatMsgStyles, { name: 'ChatMsg' })(props => {
    const {
        classes,
        avatar,
        messages,
        date,
        side,
        GridContainerProps,
        GridItemProps,
        AvatarProps,
        getTypographyProps,
    } = props;
    const attachClass = index => {
        if (index === 0) {
            return classes[`${side}First`];
        }
        if (index === messages.length - 1) {
            return classes[`${side}Last`];
        }
        return '';
    };
    return (
        <Grid
            container
            spacing={2}
            justifyContent={side === 'right' ? 'flex-start' : 'flex-start'}
            direction={side === 'right' ? 'row-reverse' : 'row'}
            {...GridContainerProps}
        >
            {side === 'left' && (
                <Grid item {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={cx(classes.avatar, AvatarProps.className)}
                    />
                </Grid>
            )}
            {side === 'right' && (
                <Grid item {...GridItemProps}>
                    <Avatar
                        src={avatar}
                        {...AvatarProps}
                        className={cx(classes.avatar, AvatarProps.className)}
                    />
                </Grid>
            )}
            <Grid item xs={8}>
                {messages.map((msg, i) => {
                    const TypographyProps = getTypographyProps(msg, i, props);
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={msg.id || i} className={classes[`${side}Row`]}>
                            <Typography
                                align={'left'}
                                {...TypographyProps}
                                className={cx(
                                    classes.msg,
                                    classes[side],
                                    attachClass(i),
                                    TypographyProps.className
                                )}
                            >
                                {msg}
                                <Typography variant='subtitle2 ' component="div" align="right" sx={{ mt: 0.5, fontSize: '12px'}}>{date}</Typography>
                            </Typography>
                           
                        </div>
                    );
                })}
            </Grid>
        </Grid>
    );
});

ChatMsg.propTypes = {
    avatar: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.string),
    side: PropTypes.oneOf(['left', 'right']),
    GridContainerProps: PropTypes.shape({}),
    GridItemProps: PropTypes.shape({}),
    AvatarProps: PropTypes.shape({}),
    getTypographyProps: PropTypes.func,
};
ChatMsg.defaultProps = {
    avatar: '',
    messages: [],
    side: 'left',
    GridContainerProps: {},
    GridItemProps: {},
    AvatarProps: {},
    getTypographyProps: () => ({}),
};

export default ChatMsg;