import React, { memo, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";
import "./CreateRequest.css";
import Backdrop from "@material-ui/core/Backdrop";
import Grow from '@material-ui/core/Grow';

const CreateRequest = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setOpen(false);
    };

    return (
        <div id="createRequest">
            <div className="new_requests_btn_container">
                <button className="new_requests_btn" onClick={handleOpen}>
                    <AddIcon className = "add_icon" fontSize="large"/>
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
                    timeout: 1000,
                }}
            >
                <Grow in={open}>
                    <div className="createRequest_modal_container">
                        <div className="request_tile_field">
                            request title
                        </div>
                        <div className="request_description_field">
                            request description
                        </div>
                    </div>
                </Grow>
            </Modal>
        </div>
    );
}

export default CreateRequest;