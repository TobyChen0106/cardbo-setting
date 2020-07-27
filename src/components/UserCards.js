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
const useStyles = (theme) => ({
    root: {
        width: "100%",
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    cardImageHolder: {
        width: "100%",
        height: 'auto',
    },
    cardImage: {
        width: "90%",
        padding: "5%",
        borderRadius: "2.5vw",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
});

class MainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMore: null,
            anchorEl: null
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
        console.log("delete")
        e.preventDefault()
        this.props.updateUserCards(cardID)
    }
    render() {
        // if(this.props.ownCards.length === 0){
        //     return <Redirect to='/card/select' />;
        // }
        const { classes } = this.props;
        const list = this.props.ownCards.map((i, index) => {
            const card = this.props.card_list.find(c => c._id === i);
            const bank = this.props.bank_list.find(b => b._id === card.BankID);

            return (
                <ListItem>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar variant="square" aria-label="Bank" className={classes.avatar} src={bank.BankImage}>
                                    B
                                </Avatar>
                            }
                            action={
                                <div>
                                    <IconButton aria-label="settings" onClick={(e) => this.handleClickMore(e, i)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={this.state.anchorEl}
                                        keepMounted
                                        open={this.state.openMore === i}
                                        onClose={this.handleMoreClose}
                                        PaperProps={{
                                            style: {
                                                width: '30vw',
                                                marginRight: "10vw"
                                            },
                                        }}
                                    >
                                        <Button onClick={(e)=>this.handleDeleteCard(e, i)}>
                                            刪除卡片
                                        </Button>
                                    </Menu>
                                </div>
                            }
                            title={`${card.CardName}`}
                            subheader={card.BankName}
                        />
                        <div className={classes.cardImageHolder}>
                            <img className={classes.cardImage} src={card.CardImage} />
                        </div>
                        {/* <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`發卡商：`}
                            </Typography>
                        </CardContent> */}
                    </Card>
                </ListItem>
            )
        });
        return (
            <div className={classes.root}>
                <List subheader={<ListSubheader>我的信用卡 (卡伯會依此進行優惠推薦)</ListSubheader>} className={classes.root}>
                    <ListItem style={{ color: "#000" }} component={Link} to="/card/select">
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
                        <ListItemText 
                        id={`setting-cards`}
                            primary={`新增信用卡`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" component={Link} to="/card/select">
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {list}
                </List>
            </div>
        )
    }
}
export default withStyles(useStyles)(MainInfo)