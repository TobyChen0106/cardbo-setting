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
import AppTitle from './AppTitle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import 實體券 from "../assets/small實體券.png";
import 信用卡 from "../assets/small信用卡.png";
import 電子票證 from "../assets/small電子票證.png";
import 行動支付 from "../assets/small行動支付.png";

const useStyles = (theme) => ({
    root: {
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    cardImageHolder: {
        width: "100%",
        marginBottom: "5%",
        display: "flex",
        justifyContent: "center"
    },
    cardImage: {
        width: "90%",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
});

class MainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
    }

    handleClickMore = (e, index) => {
        this.setState({ openMore: index, anchorEl: e.currentTarget })
    }

    handleMoreClose = () => {
        this.setState({ openMore: null })
    }

    handleDeleteCard = (e, cardID) => {
        e.preventDefault()
        this.props.updateUserCards(cardID)
    }

    render() {
        const { classes } = this.props;
        const icon = () => {
            switch (this.props.triple) {
                case "實體券":
                    return 實體券;
                case "行動支付":
                    return 行動支付;
                case "信用卡":
                    return 信用卡;
                case "悠遊卡":
                case "一卡通":
                case "有錢卡":
                case "愛金卡":
                    return 電子票證;
                default:
                    return null;
            }
        }
        const tripleInfo = (<ListItem>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Bank" className={classes.avatar} src={icon()}>
                            ?
                        </Avatar>
                    }
                    title={`123`}
                    subheader={`123`}
                />
                <div className={classes.cardImageHolder}>
                    <img className={classes.cardImage} src={``} />
                </div>
            </Card>
        </ListItem>)

        return (
            <div className={classes.root}>
                <List subheader={<ListSubheader>我的三倍券領取方式 (卡伯會依此進行優惠推薦)</ListSubheader>} className={classes.root}>
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
                        <ListItemText id={`setting-cards`}
                            primary={`更改三倍券使用方式`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {tripleInfo}
                </List>
            </div>
        )
    }
}
// 
export default withStyles(useStyles)(MainInfo)