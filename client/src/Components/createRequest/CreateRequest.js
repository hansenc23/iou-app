import React, {memo, useState, useEffect, useContext} from "react";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import NewRequestTitle from "../newRequestTitle/NewRequestTitle";
import "./CreateRequest.css";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SubjectIcon from '@material-ui/icons/Subject';
import CardGiftcardSharpIcon from '@material-ui/icons/CardGiftcardSharp';

const rewardItems = [
    'Coffee',
    'Chocolate',
    'Pizza',
    'Cupcake',
];

const CreateRequest = () => {

    const [open, setOpen] = React.useState(false);

    const [storedTitle, setStoredTitle] = useState('New Request Title Here');
    const [storedDescription, setStoredDescription] = useState();
    const [rewardItem, setRewardItem] = React.useState([]);

    const handleChange = (event) => {
        setRewardItem(event.target.value);
    };

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setStoredTitle('New Request Title Here');
        setStoredDescription();
        setRewardItem([]);
        setOpen(false);
    };

    const handleCreateRequest = () => {
        //save new request details and close and reset the form
        handleClose();
    }

    return (
        <div id="createRequest">
            <div className="new_requests_btn_container">
                <button className="new_requests_btn" onClick={handleOpen}>
                    <AddIcon className="add_icon" fontSize="large"/>
                </button>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="createRequest_modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 100,
                }}
            >
                <Fade in={open}>
                    <div className="createRequest_modal_container">
                        <div className="create_request_tile_container">
                            <div className="create_request_title_header">
                                <FiberNewIcon className="create_request_title_icon"/>
                                <div className="create_request_title">
                                    <NewRequestTitle
                                        className=""
                                        text={storedTitle}
                                        onSetText={(text) => setStoredTitle(text)}
                                    />
                                </div>
                            </div>
                            <div className="requested_by_text">
                                Requested by <strong> @gianriyanto </strong>
                            </div>
                        </div>
                        <div className="request_description_container">
                            <div className="request_description_header">
                                <SubjectIcon className="request_description_icon"/>
                                <div className="request_description_label">
                                    Description
                                </div>
                            </div>
                            <div className="request_description_input">
                                <TextField
                                    className="request_description_textfield"
                                    placeholder="Add a more detailed description"
                                    multiline
                                    value={storedDescription}
                                    rows={5}
                                    variant="outlined"
                                    InputProps={{ style: { color: "black", fontSize: 15, fontWeight: 600, fontFamily: 'Poppins' } }}
                                />
                            </div>
                        </div>
                        <div className="request_reward_container">
                            <div className="request_reward_header">
                                <CardGiftcardSharpIcon className="request_reward_icon"/>
                                <div className="request_reward_label">
                                    Reward
                                </div>
                            </div>
                            <div className="request_reward_input">
                                <FormControl className="request_reward_form">
                                    <InputLabel id=""/>
                                    <Select
                                        variant="outlined"
                                        multiple
                                        value={rewardItem}
                                        onChange={handleChange}
                                        renderValue={(selected) => (
                                            <div className="request_reward_chips">
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} className="request_reward_chip"/>
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={{ PaperProps: { style: { maxHeight: 50, backgroundColor: '#f3f0ea'}}}}
                                    >
                                        {rewardItems.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='request_button_containers'>
                            <button className='cancel_request_btn' onClick={handleClose}>
                                {' '}
                                <span>Cancel</span>
                            </button>
                            <button className='create_request_btn' onClick={handleCreateRequest}>
                                {' '}
                                <span>Create Request</span>
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateRequest;