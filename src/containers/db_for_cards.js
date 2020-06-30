var short = require('short-uuid');
export const bank_list = ['台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
    '新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
    '王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
    '美國運通']

const card_id_list = [...Array(20).keys()];

export const card_list = bank_list.map((bankName, index) => (
    {
        bankName:bankName,
        bankTitle:'bankTitle',
        bankSubtitle:'bankSubtitle',
        bankCards:
            card_id_list.map((cardName, index) => (
                {
                    cardName:`${bankName}-card-${cardName}`,
                    cardId: short.generate(),
                    imageSrc:'images/cards/card-01.jpg'
                }
            ))
    }
));


// for(var i=0 ; i<card_list.length ; ++i){
//     console.log(card_list[i]);
// }