import React, { Component, useHistory } from 'react';
// import './SelectCards.css'
//images
import autopass_image from '../images/autopass-logo.png';
import tick_image from '../images/tick.png';
import { withStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';

// components

import AppTitle from '../components/AppTitle';
import MainInfo from '../components/MainInfo';
import SelectCard from '../components/SelectCard';
import SelectPay from '../components/SelectPay';
import SelectTriple from '../components/SelectTriple';
import SetSimpleInfo from '../components/SetSimpleInfo';
import UserCards from '../components/UserCards';

//DB
import { banks, cards, pays } from './db_for_cards';

import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Divider from '@material-ui/core/Divider';
// Liff
const liff = window.liff;

const useStyles = (theme) => ({
    root: {
        width: "100vw",
        minHeight: "100vh",
    },

});

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OS: undefined,
            user: undefined,

            bank_list: [],
            card_list: [],
            pay_list: [],
            loading: true,

            select_card_height: 550 * 0.33,
            select_card_width: 550 * 0.5,
            select_card_list_width: 550 * 0.9,
            window_width: 550,
            window_height: 850,
            enable_select_index: -1
        };

    }
    componentWillMount = () => {

        liff.init({
            liffId: "1654394004-qwePlx6E"
        }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: ("https://setting.cardbo.info/") });
            }
        }).catch(function (error) {
            console.log("[Error] " + error);
        }).then(
            () => liff.getProfile()
        ).catch(function (error) {
            console.log("[Error] " + error);
        }).then((profile) => {
            if (!profile) {
                console.log("USER PROFILE ERROR!");
                // this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
            } else {
                if (profile) {
                    fetch('/api/getUserProfile', {
                        method: 'POST',
                        body: JSON.stringify({
                            lineID: profile.lineID,
                            displayName: profile.displayName,
                            userImage: profile.userImage,
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).catch(function (error) {
                        console.log("[Error] " + error);
                    }).then(
                        res => {
                            if (res.ok) {
                                console.log("ok")
                                return res.json()
                            }
                            else {
                                this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                                return null;
                            }
                        }
                    ).then((data) => {
                        console.log(data)
                        this.setState(
                            { loading: false }
                        );
                    });
                } else {
                    alert("無法取得使用者ID!");
                    this.createNotification("error", "無法取得使用者ID", "請確認網路連線狀況");
                    this.setState(
                        { loading: false }
                    );
                }
            }
        })
    }
    componentDidMount() {
        console.log(this.props.location)

        const profile = {
            userId: "123456",
            displayName: "Toby",
            userImage: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        }

        const user = {
            _id: profile.userId,
            displayName: profile.displayName,
            userImage: profile.userImage,
            phone: undefined,
            email: undefined,
            city: undefined,
            favos: ["offer1", "offer2"],
            ownCards: ["card1", "card2"],
            ownPays: ["pay1", "pay2"],

            triple: "實體券", //
            tripleCardorPayID: "card14",
        }

        this.setState({
            user: user,
        });
        this.setState({
            bank_list: banks,
            card_list: cards,
            pay_list: pays,
        });
        this.setState({ loading: false });
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

    createNotification = (type, title, message) => {
        switch (type) {
            case 'info':
                NotificationManager.info(message, title, 2000);
                break;
            case 'success':
                NotificationManager.success(message, title, 2000);
                break;
            case 'warning':
                NotificationManager.warning(message, title, 200000);
                break;
            case 'error':
                NotificationManager.error(message, title, 2000);
                break;
        }
    }

    updateInfo = (info) => {
        switch (info.type) {
            case "phone":
                this.setState(pre => {
                    pre.user.phone = info.data;
                    return { user: pre.user }
                });
                break;
            case "email":
                this.setState(pre => {
                    pre.user.email = info.data;
                    return { user: pre.user }
                });
                break;
            case "city":
                this.setState(pre => {
                    pre.user.city = info.data;
                    return { user: pre.user }
                });
                break;
        }
    }

    updateUserCards = (cardID) => {
        if (this.state.user.ownCards.find(c => c === cardID)) {
            var new_user = this.state.user;
            new_user.ownCards = this.state.user.ownCards.filter(c => c !== cardID)
            this.setState({
                new_user: new_user
            });
        } else {
            var new_user = this.state.user;
            new_user.ownCards = [cardID, ...this.state.user.ownCards]
            this.setState({
                user: new_user
            });
        }
    }

    updateUserPays = (payID) => {
        if (this.state.user.ownPays.find(c => c === payID)) {
            var new_user = this.state.user;
            new_user.ownPays = this.state.user.ownPays.filter(c => c !== payID)
            this.setState({
                new_user: new_user
            });
            console.log((new_user.ownPays))
        } else {
            var new_user = this.state.user;
            new_user.ownPays = [payID, ...this.state.user.ownPays]
            this.setState({
                user: new_user
            });
            console.log((new_user.ownPays))
        }
    }

    handleSetTriple = () => {
        liff.sendMessages([
            {
                type: 'text',
                text: '設定三倍券'
            }
        ]).catch((err) => {
            console.log('error', err);
        }).then(() => {
            liff.closeWindow();
        });
    }
    handleCloseSetting = () => {
        liff.sendMessages([
            {
                type: 'text',
                text: '設定完成!'
            }
        ]).catch((err) => {
            console.log('error', err);
        }).then(() => {
            liff.closeWindow();
        });
    }
    render() {
        const { classes } = this.props;
        if (this.state.loading) {
            return (<div className="my-loading">
                <ReactLoading type={'balls'} color={'#fff'} height={'20vh'} width={'20vw'} />
            </div>)
        }
        else {
            return (
                <div className={classes.root}>
                    <NotificationContainer />
                    <AppTitle handleCloseSetting={this.handleCloseSetting} />
                    <Switch component={Fader}>
                        <Route exact={true} path="/"
                            render={(props) => (
                                <MainInfo
                                    userPhone={this.state.user.phone}
                                    userEmail={this.state.user.email}
                                    userCity={this.state.user.city}
                                    num_cards={this.state.user.ownCards.length}
                                    num_pays={this.state.user.ownPays.length}
                                    triple={this.state.user.triple}
                                    tripleCard={this.state.user.tripleCard}
                                    displayName={this.state.user.displayName}
                                    userAvatar={this.state.user.userImage}
                                    handleSetTriple={this.handleSetTriple}
                                />
                            )} />

                        <Route exact={true} path="/card"
                            render={(props) => (
                                <UserCards
                                    {...props}
                                    updateUserCards={this.updateUserCards}
                                    bank_list={this.state.bank_list}
                                    card_list={this.state.card_list}
                                    ownCards={this.state.user.ownCards} />
                            )} />
                        <Route exact={true} path="/card/select"
                            render={(props) => (
                                <SelectCard
                                    {...props}
                                    updateUserCards={this.updateUserCards}
                                    bank_list={this.state.bank_list}
                                    card_list={this.state.card_list}
                                    ownCards={this.state.user.ownCards}
                                    pay_list={this.state.pay_list} />
                            )} />
                        <Route exact={true} path="/pay"
                            render={(props) => (
                                <SelectPay
                                    {...props}
                                    updateUserPays={this.updateUserPays}
                                    ownPays={this.state.user.ownPays}
                                    pay_list={this.state.pay_list} />
                            )} />
                        <Route exact={true} path="/triple" >
                            <SelectTriple
                                card_list={this.state.card_list}
                                pay_list={this.state.pay_list}
                                triple={this.state.user.triple}
                                tripleCardorPayID={this.state.user.tripleCardorPayID}
                                handleSetTriple={this.handleSetTriple}
                            />
                        </Route>
                        <Route exact={true} path="/info"
                            render={(props) => (
                                <SetSimpleInfo {...props} updateInfo={this.updateInfo} />
                            )} />
                    </Switch>
                </div >
            );
        }
    }
}
export default withStyles(useStyles)(Setting);