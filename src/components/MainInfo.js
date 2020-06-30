import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Badge from '@material-ui/core/Badge';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DoneIcon from '@material-ui/icons/Done';
const useStyles = (theme) => ({
    root: {
        width: '100vw',
    },
    avatarHolder: {
        paddingTop: "1rem",
        paddingBottom: "3rem",
        display: "flex",
        justifyContent: "center",
        background: "rgb(37,151,226)",
        background: "linear-gradient(0deg, rgba(37,151,226,1) 0%, rgba(53,152,218,1) 10%, rgba(9,122,197,1) 49%, rgba(9,122,197,1) 100%)",
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    customBadge: {
        backgroundColor: "#2fc4b2",
        color: "white"
    }
});

class MainInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <div className={classes.avatarHolder}>
                    <Avatar alt="Cardbo User" src={this.props.userAvatar} className={classes.avatar} />
                </div>
                <List subheader={<ListSubheader>支付工具</ListSubheader>} className={classes.root}>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={this.props.num_cards}>
                                <CreditCardIcon />
                            </Badge>

                        </ListItemIcon>
                        <ListItemText id={`setting-cards`} primary={`常用信用卡設定`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/card">
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Badge
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={this.props.num_cards}>
                                <PhonelinkRingIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id={`setting-pay`} primary={`常用行動支付設定`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Badge
                                classes={{ badge: classes.customBadge }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={<DoneIcon style={{ fontSize: 10 }}/>}>
                                <PhonelinkRingIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id={`setting-pay`} primary={`三倍券綁定`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List subheader={<ListSubheader>個人資訊</ListSubheader>} className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth" primary={`手機`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth" primary={`Emai`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth" primary={`城市`} secondary={`未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List subheader={<ListSubheader>主題</ListSubheader>} className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <ColorLensIcon />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth" primary={`暗色主題 (研發中)`} style={{ color: "#ccc" }} />
                        <ListItemSecondaryAction>
                            <Switch
                                disabled
                                edge="end"
                                inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </>
        )
    }
}
export default withStyles(useStyles)(MainInfo)