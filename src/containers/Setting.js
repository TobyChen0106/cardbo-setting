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
import SelectOneCard from '../components/SelectOneCard';
import SelectPay from '../components/SelectPay';
import SelectOnePay from '../components/SelectOnePay';
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
import { withAlert } from "react-alert";
// Liff
const liff = window.liff;
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OS: undefined,
            user: {
                lineID: "無法載入使用者",
                displayName: "無法載入使用者",
                userImage: undefined,
                phone: undefined,
                email: undefined,
                city: undefined,
                favos: [],
                ownCards: [],
                ownPays: [],
                tripleType: undefined,
                tripleCardorPayID: undefined,
            },
            bank_list: [],
            card_list: [],
            pay_list: [],
            loadingUser: true,
            loadingCard: true,
            loadingBank: true,
            loadingPay: true,
        };

    }
    componentWillMount = () => {

        liff.init({
            liffId: "1654462018-w48j1o5n"
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
            // const profile = {
            //     userId: "U879a5cb6920a17888301f36935418744",
            //     displayName: "Toby",
            //     pictureUrl: "",
            // };
            if (!profile) {
                console.log("USER PROFILE ERROR!");
                this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
            } else {
                if (profile) {

                    fetch('/api/getUserProfile', {
                        method: 'POST',
                        body: JSON.stringify({
                            lineID: profile.userId,
                            displayName: profile.displayName,
                            userImage: profile.pictureUrl,
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
                            { user: data, loadingUser: false }
                        );
                    });
                } else {
                    alert("無法取得使用者ID!");
                    this.createNotification("error", "無法取得使用者ID", "請確認網路連線狀況");
                    this.setState(
                        { loadingUser: false }
                    );
                }

                fetch('/api/getCards').catch(function (error) {
                    console.log("[Error] " + error);
                }).then(
                    res => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                            return null;
                        }
                    }
                ).then((data) => {
                    this.setState(
                        { card_list: data, loadingCard: false }
                    );
                });

                fetch('/api/getBanks').catch(function (error) {
                    console.log("[Error] " + error);
                }).then(
                    res => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                            return null;
                        }
                    }
                ).then((data) => {
                    this.setState(
                        { bank_list: data, loadingBank: false }
                    );
                });

                fetch('/api/getPays').catch(function (error) {
                    console.log("[Error] " + error);
                }).then(
                    res => {
                        if (res.ok) {
                            return res.json()
                        }
                        else {
                            this.createNotification("error", "無法載入資料", "請確認網路連線狀況");
                            return null;
                        }
                    }
                ).then((data) => {
                    this.setState(
                        { pay_list: data, loadingPay: false }
                    );
                });
            }
        })
    }
    componentDidMount() {
        // window.addEventListener("beforeunload", this.handleCloseTab);
    }

    componentWillUnmount() {
        // window.removeEventListener('beforeunload', this.handleCloseTab);
    }

    handleCloseTab(e) {
        e.preventDefault();
        console.log("close tab");
        this.handleCloseSetting();
        (e || window.event).returnValue = "close tab"; //Gecko + IE
        return "close tab";
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
        var new_user = this.state.user;
        switch (info.type) {
            case "phone":
                new_user.phone = info.data;
                break;
            case "email":
                new_user.email = info.data;
                break;
            case "city":
                new_user.city = info.data;
                break;
        }
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
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
            this.setState(
                { user: data }
            );
            console.log(data)
        });
    }

    updateUserCards = (cardID, cardName) => {
        var new_user = this.state.user;

        if (this.state.user.ownCards.find(c => c === cardID)) {
            new_user.ownCards = this.state.user.ownCards.filter(c => c !== cardID)
        } else {
            this.props.alert.success(`已綁定: ${cardName}`);
            new_user.ownCards = [cardID, ...this.state.user.ownCards]
        }
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
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
            this.setState(
                { user: data }
            );
        });
    }

    updateUserOneCard = (cardID) => {
        var new_user = this.state.user;

        if (this.state.user.ownCards.find(c => c === cardID)) {
        } else {
            new_user.ownCards = [cardID, ...this.state.user.ownCards]
        }

        new_user.tripleType = "信用卡";
        new_user.tripleCardorPayID = cardID;
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
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
            this.setState(
                { user: data }
            );
        }).then(() => {
            liff.sendMessages([
                {
                    type: 'text',
                    text: `已綁定信用卡: ${this.state.card_list.find(c => c._id === cardID).CardName}`
                }
            ]).catch((err) => {
                console.log('error', err);
            }).then(() => {
                liff.closeWindow();
            });
        });
    }

    updateUserPays = (payID) => {
        var new_user = this.state.user;
        if (this.state.user.ownPays.find(c => c === payID)) {
            new_user.ownPays = this.state.user.ownPays.filter(c => c !== payID)
        } else {
            new_user.ownPays = [payID, ...this.state.user.ownPays]
        }
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
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
            this.setState(
                { user: data }
            );
        });
    }

    updateUserOnePay = (payID) => {
        var new_user = this.state.user;
        if (this.state.user.ownPays.find(c => c === payID)) {
        } else {
            new_user.ownPays = [payID, ...this.state.user.ownPays]
        }

        new_user.tripleType = "行動支付";
        new_user.tripleCardorPayID = payID;
        fetch('/api/updateUser', {
            method: 'POST',
            body: JSON.stringify(new_user),
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
            this.setState(
                { user: data }
            );
        }).then(() => {
            liff.sendMessages([
                {
                    type: 'text',
                    text: `已綁定行動支付: ${this.state.pay_list.find(c => c._id === payID).PayName}`
                }
            ]).catch((err) => {
                alert(err);
            }).then(() => {
                liff.closeWindow();
            });
        });
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
        if (this.state.loadingUser || this.state.loadingBank || this.state.loadingCard || this.state.loadingPay) {
            return (<div className="my-loading">
                <ReactLoading type={'balls'} color={'#fff'} height={'20vh'} width={'20vw'} />
            </div>)
        }
        else {
            return (
                <div>
                    <NotificationContainer />
                    <AppTitle handleCloseSetting={this.handleCloseSetting} />
                    <Switch component={Fader}>
                        <Route exact={true} path="/"
                            render={(props) => (
                                <MainInfo
                                    handleCloseTab={this.handleCloseTab}
                                    userPhone={this.state.user.phone}
                                    userEmail={this.state.user.email}
                                    userCity={this.state.user.city}
                                    num_cards={this.state.user.ownCards.length}
                                    num_pays={this.state.user.ownPays.length}
                                    tripleType={this.state.user.tripleType}
                                    tripleCardorPayID={this.state.user.tripleCardorPayID}
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
                                    tripleType={this.state.user.tripleType}
                                    tripleCardorPayID={this.state.user.tripleCardorPayID}
                                    pay_list={this.state.pay_list} />
                            )} />
                        <Route exact={true} path="/onecard"
                            render={(props) => (
                                <SelectOneCard
                                    {...props}
                                    updateUserOneCard={this.updateUserOneCard}
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
                                    pay_list={this.state.pay_list}
                                />
                            )} />

                        <Route exact={true} path="/onepay"
                            render={(props) => (
                                <SelectOnePay
                                    {...props}
                                    updateUserOnePay={this.updateUserOnePay}
                                    ownPays={this.state.user.ownPays}
                                    pay_list={this.state.pay_list}
                                />
                            )} />

                        <Route exact={true} path="/triple" >
                            <SelectTriple
                                card_list={this.state.card_list}
                                pay_list={this.state.pay_list}
                                tripleType={this.state.user.tripleType}
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
export default withAlert()(Setting);