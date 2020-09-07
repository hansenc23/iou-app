import React, {useState} from 'react';
import "./Favour.css";

const Favour = () => {

    const [userName, setUserName] = useState(0);
    const [favourValue, setFavourValue] = useState(0);

    return (
        <div id = "favour" className="">
            <div className= "favour_card_left">
                <div className="user_label_left">
                    @JohnDoe
                </div>
                <div className = "card_content_left">
                    <div className="value_label_left">
                        Owes you <strong> coffee </strong>
                    </div>
                    <div className="date_left">
                        30 Aug
                    </div>
                </div>
            </div>
            <div className= "favour_card_left">
                <div className="user_label_left">
                    @AliciaGreen
                </div>
                <div className = "card_content_left">
                    <div className="value_label_left">
                        Owes you <strong> lunch </strong>
                    </div>
                    <div className="date_left">
                        29 Aug
                    </div>
                </div>
            </div>
            <div className= "favour_card_right">
                <div className="user_label_right">
                    @NicoleBree
                </div>
                <div className="card_content_right">
                    <div className="date_right">
                        28 Aug
                    </div>
                    <div className="value_label_right">
                        Owe <strong> @EdwardCrawford </strong> <strong> lunch </strong>
                    </div>
                </div>
            </div>
            <div className= "favour_card_left">
                <div className="user_label_left">
                    @BobbyLee
                </div>
                <div className = "card_content_left">
                    <div className="value_label_left">
                        Owes you <strong> drinks </strong>
                    </div>
                    <div className="date_left">
                        27 Aug
                    </div>
                </div>
            </div>
            <div className= "favour_card_right">
                <div className="user_label_right">
                    @You
                </div>
                <div className="card_content_right">
                    <div className="date_right">
                        26 Aug
                    </div>
                    <div className="value_label_right">
                        Owe <strong> @JulyLawson </strong> <strong> coffee </strong>
                    </div>
                </div>
            </div>
            <div className= "favour_card_right">
                <div className="user_label_right">
                    @You
                </div>
                <div className="card_content_right">
                    <div className="date_right">
                        25 Aug
                    </div>
                    <div className="value_label_right">
                        Owe <strong> @MadisonHall </strong> <strong> drinks </strong>
                    </div>
                </div>
            </div>
            <div className= "favour_card_left">
                <div className="user_label_left">
                    @RichardDraper
                </div>
                <div className = "card_content_left">
                    <div className="value_label_left">
                        Owes you <strong> drinks </strong>
                    </div>
                    <div className="date_left">
                        25 Aug
                    </div>
                </div>
            </div>
            <div className= "favour_card_right">
                <div className="user_label_right">
                    @You
                </div>
                <div className="card_content_right">
                    <div className="date_right">
                        20 Aug
                    </div>
                    <div className="value_label_right">
                        Owe <strong> @JeanMichel </strong> <strong> coffee </strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favour;