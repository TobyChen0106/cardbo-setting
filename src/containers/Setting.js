import React, { Component, useHistory } from 'react';
// import './SelectCards.css'
//images
import autopass_image from '../images/autopass-logo.png';
import tick_image from '../images/tick.png';

import ReactLoading from 'react-loading';

// components
import SelectList from '../components/SelectList';
import AppTitle from '../components/AppTitle';
import MainInfo from '../components/MainInfo';
import SaveFooter from '../components/SaveFooter';

//DB
import { bank_list, card_list } from './db_for_cards';

import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';

import Divider from '@material-ui/core/Divider';
// Liff
const liff = window.liff;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profile: undefined,
            profile: {
                displayName: "Toby",
                userId: "1234"
            },
            OS: undefined,

            userCards: [],
            cards: [{
                bank: '',
                card: '',
                cardID: '',
                selectedBank: null,
                selectedCard: null,
                options: []
            }],

            bank_list: [],
            card_list: [],
            loading: true,

            select_card_height: 550 * 0.33,
            select_card_width: 550 * 0.5,
            select_card_list_width: 550 * 0.9,
            window_width: 550,
            window_height: 850,
            enable_select_index: -1
        };

    }

    componentDidMount() {
        this.handleResizeWindow();

        this.setState({
            bank_list: bank_list,
            card_list: card_list
        });

        this.setState({ loading: false });

        window.addEventListener('resize', this.handleResizeWindow);
    }
    handleResizeWindow = () => {
        this.setState({ window_width: window.innerWidth, window_height: window.innerHeight });
        if (window.innerWidth * 0.33 < 198) {
            this.setState({ select_card_height: window.innerWidth * 0.33 });
        } else {
            this.setState({ select_card_height: 198 });
        }
        if (window.innerWidth * 0.6 < 306) {
            this.setState({ select_card_width: window.innerWidth * 0.51 });
        } else {
            this.setState({ select_card_width: 306 });
        }
        if (window.innerWidth * 0.9 < window.innerHeight * 0.8) {
            this.setState({ select_card_list_width: window.innerWidth * 0.9 });
        } else {
            this.setState({ select_card_list_width: window.innerHeight * 0.8 });
        }
        // console.log( window.innerWidth, window.innerHeight);
    }
    formOnSubmit = () => {
        // if (this.state.age === 0) {
        //     window.alert('請輸入年齡!');
        // }
        // else if (!this.state.agreeCheck) {
        //     window.alert('請閱讀並同意使用者服務條款!');
        // } else {
        //     var userCards = this.state.cards.filter(card => card.card !== '' && card.bank !== '').map((i, index) => (
        //         this.state.allCards.filter(card => card.cardName === i.card && card.bankName === i.bank)[0].cardID
        //     ));
        //     // console.log(userCards)

        //     const newUser = {
        //         lineID: this.state.userId,
        //         displayName: this.state.displayName,
        //         nickName: this.state.nickName,
        //         age: this.state.age,
        //         gender: this.state.gender,
        //         cards: userCards,
        //     };
        //     fetch('/api/users', {
        //         method: 'POST',
        //         body: JSON.stringify(newUser),
        //         headers: new Headers({
        //             'Content-Type': 'application/json'
        //         })
        //     }).catch(function (error) {
        //         window.alert("[Error] " + error);
        //     }).then(() => {
        //         if (this.state.OS !== 'web') {
        //             liff.sendMessages([{
        //                 type: 'text',
        //                 text: "Done!"
        //             }]).catch(function (error) {
        //                 window.alert("Error sending message: " + error);
        //             }).then(() => {
        //                 liff.closeWindow();
        //             });
        //         }
        //     });
        // }

        // if (this.state.OS !== 'web') {
        //     liff.closeWindow();
        // }
    }

    handleBack = () => {
        // this.history.push("/");
    }

    render() {
        if (this.state.loading) {
            // if (true) {
            return (
                <div className="my-loading">
                    <ReactLoading type={'balls'} color={'#fff'} height={'20vh'} width={'20vw'} />
                </div>)
        }
        else {
            return (
                <div className="">
                    <AppTitle
                        logo={autopass_image}
                        title={`卡伯會員設定`}
                        subtitle={`${this.state.profile.displayName}，您可以在這裡選擇您擁有的卡片:`}
                    // handleBack={this.handleBack}
                    />
                    {/* <Switch> */}
                    <Switch component={Fader}>
                        <Route exact={true} path="/" >
                            <MainInfo num_cards={3} />
                        </Route>
                        <Route path="/card" >
                            <SelectList
                                bank_list={this.state.bank_list}
                                card_list={this.state.card_list}
                                select_card_list_width={this.state.select_card_list_width}
                                select_card_height={this.state.select_card_height}
                                select_card_width={this.state.select_card_width}
                                tick={tick_image}
                            />
                        </Route>
                    </Switch>
                    {/* </Switch> */}
                </div>
            );
        }
    }
}
export default App;