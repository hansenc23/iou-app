import React, {useContext, useEffect, useState} from "react";
import "./EditRewards.css";
import CompleteRequest from "../completeRequest/CompleteRequest";
import axios from "axios";
import moment from "moment";
import Modal from '@material-ui/core/Modal';
import {AuthContext} from "../../context/AuthContext";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import AlertMessage from "../AlertMessage";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";

const rewardItems = ['Coffee', 'Chocolate', 'Pizza', 'Cupcake', 'Mint'];

const EditRewards = (  ) => {

    const { isAuth, user} = useContext(AuthContext);

    const [storedReward, setStoredReward] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [alertMessage, setAlertMessage] = useState(null);

    const handleChangeRewards = (event) => {
        setStoredReward(event.target.value);
    };

    const handleConfirm = () => {
        //close Modal
        setOpen(false);
    }

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setOpen(false);
    }

    useEffect(() => {
        if (alertMessage) {
            setTimeout(() => {
                setOpenAlert(false);
            }, 4000);
        }
    });

    const guestModal = (
        <div className="guest_modal_container">
            <div className="guest_login_container">
                <CloseIcon className='close_guest_completerequest' fontSize="large" onClick={handleClose}/>
                <Link to='/login'>
                    <button className="guest_login_link"> Login</button>
                </Link>
            </div>
            <div className="guest_signup_container">
                <Link to='/signup'>
                    <button className="guest_signup_link"> Sign up </button>
                </Link>
            </div>
        </div>
    );

    const authModal = (
        <div className="edit_rewards_modal_container">
            <div className="edit_rewards_title">
                Edit Rewards
            </div>
            <div className="add_rewards_container">
                           <span className="add_rewards_header">
                               Add Rewards
                           </span>
                <div className='request_reward_input'>
                    <FormControl className='add_request_reward_form'>
                        <InputLabel id='' htmlFor='name' />
                        <Select
                            variant='outlined'
                            multiple
                            value={storedReward}
                            onChange={handleChangeRewards}
                            renderValue={(selected) => (
                                <div className=''>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className='request_reward_chip' />
                                    ))}
                                </div>
                            )}
                            MenuProps={{ PaperProps: { style: { maxHeight: 50, backgroundColor: '#f3f0ea' } } }}
                        >
                            {rewardItems.map((item) => (
                                <MenuItem className='menu_test' key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="rewards_from_you_container">
               <span className="rewards_from_you_header">
                   Rewards from You
               </span>
                <div className="rewards_from_you_content">
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong> Coffee </strong> from JimmyStewart
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                05 Oct
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong> Coffee </strong> from JimmyStewart
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                05 Oct
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong> Coffee </strong> from JimmyStewart
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                05 Oct
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong> Coffee </strong> from JimmyStewart
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                05 Oct
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='edit_rewards_confirm_btn_container'>
                <button className='cancel_edit_rewards_btn' onClick={handleClose}>
                    {' '}
                    <span>Cancel</span>
                </button>
                <button className='confirm_edit_rewards_btn' onClick={handleConfirm}>
                    {' '}
                    <span>Save</span>
                </button>
            </div>
        </div>
    )

    return (
        <div id="EditRewards">
            <button className = "edit_reward_item_btn" onClick={handleOpen}>
                Edit Rewards
            </button>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className='edit_rewards_modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Slide direction='up' in={open} mountOnEnter unmountOnExit>
                    {isAuth ? authModal : guestModal}
                </Slide>
            </Modal>
        </div>
    );

}
export default EditRewards;
