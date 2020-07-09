import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from "react-router-dom";
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
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginRight: theme.spacing(2),
        borderRadius: "10%"
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
        this.state = {
            selectedPays: []
        }
    }
    hadleSelectPay = (e, i) => {
        e.preventDefault();
        const index = this.state.selectedPays.findIndex(f => f === i);
        
        if (index === -1) {
            this.setState(pre => {
                return { selectedPays: [i, ...pre.selectedPays] }
            })
            console.log(index)
        } else {
            const this.state.selectedPays.splice(index, 1)
            this.setState( { selectedPays: pre.selectedPays.splice(index, 1) })
            console.log(index)
        }
        console.log(this.state.selectedPays)
    }
    render() {
        const { classes } = this.props;

        const list = this.props.pay_list.map((i, index) => {
            const selected = this.state.selectedPays.findIndex(f => f === index) === -1 ? null:
                (<ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" component={Link} to="/card">
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </ListItemSecondaryAction>);
            // console.log(this.state.selectedPays)
            return (
                <>
                    <ListItem onClick={(e) => this.hadleSelectPay(e, index)}>
                        <ListItemIcon>
                            <Avatar className={classes.avatar} alt="Pay" src={i.payImage} />
                        </ListItemIcon>
                        <ListItemText id={`setting-cards`}
                            primary={i.payName}
                            secondary={null} />
                        {selected}
                    </ListItem>
                    <Divider />
                </>
            )
        })
        return (
            <List subheader={<ListSubheader>綁定行動支付</ListSubheader>} className={classes.root}>
                <Divider />
                {list}
            </List>
        )
    }
}
export default withStyles(useStyles)(MainInfo)