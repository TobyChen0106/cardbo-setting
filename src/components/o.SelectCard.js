
import React, { Component } from 'react';
import './SelectList.css'
// material-UI
import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//images
import e_sun_image from '../images/banks/e.sun-bank.jpg'
import card_01 from '../images/cards/card-01.jpg'
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
});

class SelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            enable_select_index: -1,
            enable_card_select_index: -1
        };
    }
    handleSelectBank = (e, bankName, index) => {
        // console.log(bankName);
        // e.preventDefault();
        if (index === this.state.enable_select_index) {
            this.setState({ enable_select_index: -1 });
        } else {
            this.setState({ enable_select_index: index });
        }
    }
    handleSelectCard = (e, card, index) => {
        const idIndex = this.state.cards.indexOf(card.cardId);
        if (idIndex > -1) {
            var neww_cards = [...this.state.cards];
            neww_cards.splice(idIndex, 1)
            this.setState({ cards: neww_cards });
        } else {
            this.setState(prevState => ({ cards: [...prevState.cards, card.cardId] }));
        }
        console.log(this.state.cards);
    }
    render() {
        const { classes } = this.props;

        const Row = (bank, index, style) => (
            <div style={style} className="card-image-card-holder" onClick={(e) => this.handleSelectCard(e, bank.bankCards[index], index)}>
                <div className="card-image-card" >
                    <img className="card-image card-selected" src={bank.bankCards[index].imageSrc} style={selectCardImageStyle(bank.bankCards[index].cardId)} />
                    <div className="selected-tick chinese-font" style={selectCardTickStyle(bank.bankCards[index].cardId)}>
                        <img className="tick-image" src={this.props.tick} />
                        <div className="chinese-font tick-text">{`已選擇`}</div>
                    </div>
                    <div className="chinese-font tick-bank-and-card-name" style={selectCardNameStyle(bank.bankCards[index].cardId)}>{bank.bankCards[index].cardName}</div>
                </div>
            </div >
        );

        const selectBankHeightStyle = (index) => (
            //   visibility: visible;
            //   opacity: 1;
            {
                // visibility: this.state.enable_select_index == index ? 'visible' : 'hidden',
                // opacity: this.state.enable_select_index == index ? '1' : '0'
            }
        );

        const selectBankStyle = (index) => (
            {
                // display: this.state.enable_select_index == index ? 'flex' : 'none',
                height: this.state.enable_select_index == index ? `${this.props.select_card_height}px` : '0px',

            }
        );

        const selectCardImageStyle = (id) => (
            // { opacity: this.state.enable_select_index == index ? '0.25' : '1' }
            { opacity: this.state.cards.find(element => element == id) ? '0.25' : '1' }
        );

        const selectCardTickStyle = (id) => (
            // { display: this.state.enable_select_index == index ? 'flex' : 'none' }
            { display: this.state.cards.find(element => element == id) ? 'flex' : 'none', }
        );

        const selectCardNameStyle = (id) => (
            // { display: this.state.enable_select_index == index ? 'block' : 'none' }
            { display: this.state.cards.find(element => element == id) ? 'block' : 'none' }
        );
        return (
            <div className="row bank-select-card-list-contaniner">
                {this.props.card_list.map((bank, index) => (
                    // <div className="bank-select-card-container">
                    <>
                        {/* <div className="bank-select-card" key={`bank-select-card-${index}`} > */}
                        {/* <div className="bank-select-info" onClick={(e) => this.handleSelectBank(e, bank.bankName, index)} style={selectBankHeightStyle(index)}>
                                <div className="bank-select-image"><img className="bank-select-image-src" src={e_sun_image} /></div>
                                <div className="bank-select-bank-info chinese-font">
                                    <div className="bank-select-bankName chinese-font">{bank.bankName}</div>
                                    <div className="bank-select-info-title chinese-font">{bank.bankTitle}</div>
                                    <div className="bank-select-info-subtitle chinese-font">{bank.bankSubtitle}</div>
                                </div>
                            </div> */}
                        <div className="bank-select-card" key={`bank-select-card-${index}`} >
                            <ListItem alignItems="flex-start" onClick={(e) => this.handleSelectBank(e, bank.bankName, index)} style={selectBankHeightStyle(index)}>
                                <ListItemAvatar>
                                    <Badge
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        color="secondary"
                                        badgeContent={3}>
                                        <Avatar variant="rounded" alt={`${bank.bankName}`} src={e_sun_image} size="large" />
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${bank.bankName}`}
                                    secondary={`${bank.bankTitle}`}
                                />
                                <IconButton>
                                    <ExpandMoreIcon />
                                </IconButton>
                            </ListItem>
                            <div className="card-selet-container" style={selectBankStyle(index)}>
                                <FixedSizeList
                                    height={this.props.select_card_height}
                                    itemCount={bank.bankCards.length}
                                    itemSize={this.props.select_card_width}
                                    layout="horizontal"
                                    width={this.props.select_card_list_width}>
                                    {({ index, style }) => Row(bank, index, style)}
                                </FixedSizeList>
                            </div>
                        </div>
                        <Divider variant='fullWidth' />
                    </>
                ))}

            </div>
        );
    }
}
export default withStyles(useStyles)(SelectList);