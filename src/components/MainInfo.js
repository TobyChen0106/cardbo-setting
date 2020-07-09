import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(37,151,226)",
        background: "linear-gradient(0deg, rgba(37,151,226,1) 0%, rgba(53,152,218,1) 10%, rgba(9,122,197,1) 49%, rgba(9,122,197,1) 100%)",
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    displayName: {
        color: "#fff",
        fontSize: "1.2rem",
        marginTop: "0.5rem"
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
                    <Avatar alt="User Avatar" src={this.props.userAvatar} className={classes.avatar} />
                    <div className={classes.displayName}>
                        {this.props.displayName}
                    </div>
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
                        <ListItemText id={`setting-cards`}
                            primary={`常用信用卡設定`}
                            secondary={this.props.num_cards ? `${this.props.num_cards} 張信用卡` : `未設定`} F />
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
                                badgeContent={this.props.num_pays}>
                                <PhonelinkRingIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id={`setting-pay`}
                            primary={`常用行動支付設定`}
                            secondary={this.props.num_pays ? `${this.props.num_pays} 種行動支付` : `未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/pay">
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
                                badgeContent={this.props.triple ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                                <PhonelinkRingIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id={`setting-pay`} primary={`三倍券綁定`}
                            secondary={this.props.triple ? `已設定` : `未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/tripple">
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List subheader={<ListSubheader>個人資訊</ListSubheader>} className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <Badge
                                classes={{ badge: classes.customBadge }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                color="secondary"
                                badgeContent={this.props.userPhone ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                                <PhoneIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary={`手機`}
                            secondary={this.props.userPhone ? this.props.userPhone : `未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/info?type=phone" >
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
                                badgeContent={this.props.userEmail ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                                <MailIcon />
                            </Badge>

                        </ListItemIcon>
                        <ListItemText primary={`Emai`}
                            secondary={this.props.userEmail ? this.props.userEmail : `未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/info?type=email">
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
                                badgeContent={this.props.userCity ? <DoneIcon style={{ fontSize: 10 }} /> : null}>
                                <LocationOnIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-bluetooth"
                            primary={`城市`}
                            secondary={this.props.userCity ? this.props.userCity : `未設定`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/info?type=city">
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
                        <ListItemText id="switch-list-label-bluetooth" primary={`暗色主題 (開發中)`} style={{ color: "#ccc" }} />
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