import React, {useState} from 'react';
import "./CreateFavour.css"
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import InlineText from "../inlineText/InlineText";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//import SelectMenu from "../selectMenu/SelectMenu";

const CreateFavour = () => {

    const [storedUser, setStoredUser] = useState("@Whom?");
    const [storedValue, setStoredValue] = useState(-1);

    const handleChangeValue = (event) => {
        setStoredValue(event.target.value);
    };

    return (
        <div id="createFavour" className="">
            <div className="createFavour_card">
                <div className="createFavour_content">
                    <div className="createFavour_label"> </div>
                    <div className="createFavour_form">
                        <div className="createFavour_first_line">
                            <div className="lets_text">Let's</div>
                            <div className="type_field">Shout</div>
                        </div>
                        <div className="createFavour_second_line">
                            <InlineText className="who_field"
                                        text={storedUser}
                                        onSetText={text => setStoredUser(text)}
                            />
                        </div>
                        <div className="createFavour_third_line">
                            <div className="a_text"> a </div>
                            <div className ="what_field">
                                <Select value={storedValue}
                                        onChange={handleChangeValue}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label'}}
                                        disableUnderline={true}>
                                    <MenuItem value={-1}>
                                        <div className="menu_label"> What? </div>
                                    </MenuItem>
                                    <MenuItem value={10}>
                                        <div className="value_label"> Coffee </div>
                                    </MenuItem>
                                    <MenuItem value={20}>
                                        <div className="value_label"> Lunch </div>
                                    </MenuItem>
                                    <MenuItem value={30}>
                                        <div className="value_label"> Dinner </div>
                                    </MenuItem>
                                    <MenuItem value={40}>
                                        <div className="value_label"> Drinks </div>
                                    </MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="btn_container">
                        <button
                            className="confirm_favour_btn"> Confirm
                        </button>
                        <button
                            className="cancel_favour_btn"
                            onClick={() => {setStoredUser("@Whom?"); setStoredValue(-1);}}>
                            <CancelRoundedIcon fontSize="large"> </CancelRoundedIcon>
                        </button >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFavour;