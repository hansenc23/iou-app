import React, { Fragment, memo, useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import './CompleteRequest.css';

const CompleteRequest = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setOpen(false);
    }

    return (
        <div id="complete_request">

            <div className="complete_request_btn_container">
                <button className='complete_request_detail_btn' onClick={handleOpen}>
                    <span><CheckCircleIcon fontSize ="small" style={{marginTop: "4px", marginRight:"10px"}}/></span>
                    <span>Complete Request</span>
                </button>
            </div>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className='complete_request_modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Slide direction='up' in={open} mountOnEnter unmountOnExit>
                    <div className='complete_request_modal_container'>

                    </div>
                </Slide>
            </Modal>
        </div>
    )
}

export default CompleteRequest;