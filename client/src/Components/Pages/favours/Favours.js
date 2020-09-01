import React, { useState, useEffect } from 'react';
import "./Favours.css";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

function Favours() {

    const [] = useState(0);

    useEffect(() => {});

    return (
        <div id="Favours" className="">
            <div className="all_favours_area">
                <div className="favours_title"> Favours</div>
                <span className="filter_btn">
                    <button type="button" className="all_btn">All</button>
                    <button type="button" className="owe_btn"> Owe </button>
                    <button type="button" className="owing_btn"> Owing </button>
                    <button type="button" className="settled_btn"> Settled </button>
                </span>
                <div className="favours_cards">
                    <div className= "favour_card_left">
                        <div className="user_label_left">
                            @PabloPicasso
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
                            @MarkRothko
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
                            @You
                        </div>
                        <div className="card_content_right">
                            <div className="date_right">
                                28 Aug
                            </div>
                            <div className="value_label_right">
                                Owe <strong> @EdwardHopper </strong> <strong> lunch </strong>
                            </div>
                        </div>
                    </div>
                    <div className= "favour_card_left">
                        <div className="user_label_left">
                            @HenriMatisse
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
                                Owe <strong> @MarkRothko </strong> <strong> coffee </strong>
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
                                Owe <strong> @HernanBas </strong> <strong> drinks </strong>
                            </div>
                        </div>
                    </div>
                    <div className= "favour_card_left">
                        <div className="user_label_left">
                            @PabloPicasso
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
                    <div className= "favour_card_left">
                        <div className="user_label_left">
                            @JacksonPollock
                        </div>
                        <div className = "card_content_left">
                            <div className="value_label_left">
                                Owes you <strong> coffee </strong>
                            </div>
                            <div className="date_left">
                                23 Aug
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
            </div>
            <div className="create_favours_area">
                <div className="create_favours_card">
                    <div className="create_favour_content">
                        <div className="create_favour_label"> </div>
                        <div className="create_favour_form">
                            <div className="create_favour_first_line">
                                <div className="lets_label">Let's</div>
                                <div className="favour_type_field">Shout</div>
                            </div>
                            <div className="create_favour_second_line">
                                <div className="Who_field"> @Gianriyanto </div>
                            </div>
                            <div className="create_favour_third_line">
                                <div className="a_label"> a </div>
                                <div className="value_field"> Coffee </div>
                            </div>
                        </div>
                        <div className="btn_container">
                            <button type="submit" className="create_favour_btn">  Confirm  </button>
                            <button type="button" className="cancel_favour_btn">
                               <CancelRoundedIcon fontSize="large">  </CancelRoundedIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favours;