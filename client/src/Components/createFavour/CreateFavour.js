import React from 'react';
import "./CreateFavour.css"
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const CreateFavour = () => {
    return (
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
                        </button >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFavour;