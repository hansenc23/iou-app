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
    const [storedType, setStoredType] = useState("Shout");
    const [otherStoredType, setOtherStoredType] = useState("Owe");

    const handleChangeValue = (event) => {
        setStoredValue(event.target.value);
    };

    const handleChangeType = (current) => {
        if (storedType === "Shout") {
            setStoredType("Owe");
        }
        else if (storedType === "Owe"){
            setStoredType("Shout");
        }
    }

    const handleChangeOtherType = (current) => {
        if (otherStoredType === "Shout") {
            setOtherStoredType("Owe");
        }
        else if (otherStoredType === "Owe"){
            setOtherStoredType("Shout");
        }
    }

    return (
        <div id="createFavour" className="">
            <div className="createFavour_card">
                <div className="createFavour_content">
                    <div className="createFavour_label"> </div>
                    <div className="createFavour_form">
                        <div className="createFavour_first_line">
                            <div className="lets_text">Let's</div>
                            <button className="type_field" type="type_field"
                                    data-hover={otherStoredType}
                                    data-active={storedType}
                                    onClick={() => {handleChangeType(); handleChangeOtherType();}}>
                                <span className="">{storedType}</span>
                            </button>
                        </div>
                        <div className="createFavour_second_line">
                            <div className="at_text"> </div>
                            <InlineText className="who_field"
                                        text={storedUser}
                                        onSetText={text => setStoredUser(text)}
                            />
                        </div>
                        <div className="createFavour_third_line">
                            <div className="a_text"> a </div>
                            <div className ="what_field">
                                <Select value={storedValue}
                                        className=""
                                        style={{height:0}}
                                        onChange={handleChangeValue}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label'}}
                                        disableUnderline={true}
                                        MenuProps={{
                                            getContentAnchorEl: null,
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }
                                        }}
                                >
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
                            className="confirm_favour_btn"> <span>Confirm</span>
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