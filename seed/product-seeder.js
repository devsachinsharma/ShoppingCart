const product = require('../models/product');

var products = [
    new product({
        imagePath: 'https://rukminim1.flixcart.com/image/832/832/jnnhua80/physical-game/d/d/m/standard-edition-marvel-s-spider-man-full-game-ps4-original-imafa9jy6xq4hhjc.jpeg?q=70',
        title: "Marvel\'s Spider-Man",
        description: "We all know of the whimsical nerd who got superpowers after being bitten by a radioactive spider. Well, this isn\'t the same friendly, neighbourhood Spider-Man whom you\'ve known before. Watch an experienced Peter Parker masterfully fight crimes in the beautiful and bustling city of New York. With improvised combat, challenging villains, and a beautiful environment, zip your way through an action-packed story in this version of Marvel\'s Spider-Man.",
        price: 3050
    }),
    new product({
        imagePath: 'https://rukminim1.flixcart.com/image/832/832/physical-game/b/h/h/uncharted-4-a-thief-s-end-ps4-original-imaermcbxp5sppnh.jpeg?q=70',
        title: "Uncharted 4 : A Thief\'s End",
        description: "Looking for a game that will keep your hooked? Then Uncharted 4: A Thief\'s End is what you need to consider. The Uncharted series returns with the protagonist, Nate, who travels in the dense forests of Madagascar to find Captain Henry Avery\'s long-lost treasure. ",
        price: 825
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/joixj0w0/physical-game/u/3/u/standard-edition-red-dead-redemption-2-full-game-ps4-original-imafayznnszyfn2h.jpeg?q=70",
        title: "Red Dead Redemption 2",
        description: "Red Dead Redemption 2 is a Western action-adventure game developed and published by Rockstar Games. It was released on October 26, 2018, for the PlayStation 4 and Xbox One consoles. The third entry in the Red Dead series, it is a prequel to the 2010 game Red Dead Redemption.",
        price: 4400
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/jh0vb0w0/physical-game/r/7/9/standard-edition-god-of-war-2018-full-game-ps4-original-imaf55yfxqhfysjd.jpeg?q=70",
        title: "God of War",
        description: "God of War is an action-adventure video game developed by Santa Monica Studio and published by Sony Interactive Entertainment. Released on April 20, 2018, for the PlayStation 4 console, it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. ",
        price: 2999
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/jmp79u80/physical-game/q/z/v/standard-edition-fifa-19-full-game-ps4-original-imaf9jgbz2rhuee4.jpeg?q=70",
        title: "Fifa 19",
        description: "FIFA 19 is a football simulation video game developed by EA Vancouver as part of Electronic Arts' FIFA series. Announced on 6 June 2018 for its E3 2018 press conference, it was released on 28 September 2018 for PlayStation 3, PlayStation 4, Xbox 360, Xbox One, Nintendo Switch, and Microsoft Windows.",
        price: 3279
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/j4d1ua80/physical-game/4/2/f/standard-edition-need-for-speed-payback-full-game-ps4-original-imaeva8vprmrzchq.jpeg?q=70",
        title: "Need for Speed Payback",
        description: "Need for Speed Payback is a racing video game developed by Ghost Games and published by Electronic Arts for Microsoft Windows, PlayStation 4 and Xbox One. It is the twenty-third installment in the Need for Speed series. The game was revealed with a trailer released on June 2, 2017.",
        price: 1750
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/jingcy80/physical-game/s/z/j/standard-edition-assassin-s-creed-odyssey-full-game-ps4-original-imaf6ehysv7g3h5b.jpeg?q=70",
        title: "Assassin's Creed Odyssey",
        description: "Assassin's Creed Odyssey is an action role-playing video game developed by Ubisoft Quebec and published by Ubisoft. It is the 11th major installment, and 21st overall, in the Assassin's Creed series and the successor to 2017's Assassin's Creed Origins. ",
        price: 2355
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/av-media/games/f/f/m/the-last-of-us-remastered-original-imady9fcv5xe4kbf.jpeg?q=70",
        title: "The Last Of Us : Remastered",
        description: "The Last of Us is an action-adventure survival horror video game developed by Naughty Dog and published by Sony Computer Entertainment. It was released for the PlayStation 3 worldwide on June 14, 2013.",
        price: 1145
    }),
    new product({
        imagePath: "https://rukminim1.flixcart.com/image/832/832/j5bceq80/physical-game/9/z/d/standard-edition-far-cry-5-full-game-ps4-original-imaewf34hpmaptgh.jpeg?q=70",
        title: "Far Cry 5",
        description: "Far Cry 5 is an action-adventure first-person shooter video game developed by Ubisoft Montreal and Ubisoft Toronto and published by Ubisoft for Microsoft Windows, PlayStation 4 and Xbox One. It is the standalone successor to the 2014 video game Far Cry 4, and the fifth main installment in the Far Cry series.",
        price: 1790
    })
];

async function empty(){
    const data = await product.find();
    if(data.length == 0){
        for(var i=0; i < products.length; i++){
            products[i].save(); // save to product collection
        }  
    }
}
empty()
module.exports = {}