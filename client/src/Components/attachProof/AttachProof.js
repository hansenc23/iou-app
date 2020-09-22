import React, { memo, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Slide from '@material-ui/core/Slide';
import Backdrop from "@material-ui/core/Backdrop";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import "./AttachProof.css";

const AttachProof = (props) => {

    const [open, setOpen] = React.useState(false);
    const [proofFieldClicked, setProofFieldClicked] = useState('proof_modal_btn_unattached');

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setOpen(false);
    };

    const handleConfirm = () => {
        //close Modal
        setOpen(false);

        //set proof field to hotpink
        setProofFieldClicked("proof_modal_btn_attached")
    }

    useEffect(() => {
        // if cancel button is clicked, Proof field turns darkgrey
        let cancelButtonClicked = props.cancelClicked
        if (cancelButtonClicked === true){
            setProofFieldClicked("proof_modal_btn_unattached");
        }
    });

    return (
        <div id="attach_proof">
            <div className='createFavour_fourth_line'>
                <div className='here_text'> here's </div>
                <button className={proofFieldClicked} onClick={handleOpen}>
                    Proof
                </button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="attachProof_modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <div className="attachProof_modal_container">
                        <div className="attach_proof_title">
                            Where's the Proof?
                        </div>
                        <button className="upload_proof_btn">
                            <PhotoCameraIcon className="upload_proof_icon" fontSize="large"/>
                            <div className="upload_proof_label"> Upload proof </div>
                        </button>
                        <div className="buttons">
                            <button className='cancel_btn' onClick={handleClose}>
                                {' '}
                                <span>Cancel</span>
                            </button>
                            <button className='confirm_btn' onClick={handleConfirm}>
                                {' '}
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                </Slide>
            </Modal>
        </div>
    )

}

export default AttachProof;