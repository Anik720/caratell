import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton, Tooltip } from '@mui/material';

export default function NavNotificationBell(props) {
    return (
        <Tooltip title="Notifications" placement="bottom">
            <IconButton
                onClick={() => { }}
                className={props.className}
                size="large"
            >
                <NotificationsNoneIcon />
            </IconButton>
        </Tooltip>
    )
}
