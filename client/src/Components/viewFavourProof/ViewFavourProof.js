import React, { useState } from "react";
import "./ViewFavourProof.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from "@material-ui/core/Backdrop";
import Slide from '@material-ui/core/Slide';

const ViewFavourProof = ({proofId}) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <button className='view_proof_btn' onClick={handleOpen}>
                View Proof
            </button>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className='view_proof_modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Slide direction='up' in={open} mountOnEnter unmountOnExit>
                    <div className="view_proof_modal_container">
                        <span className='view_proof_label'> Here's Proof </span>
                        { proofId === 'null' ?
                            <div className='no_proof'> This favour does not have a proof </div> :
                            <img
                                id='image_proof'
                                src={proofId}
                                className='float-right'
                                style={{
                                    userSelect: 'none',
                                    objectFit: 'cover',
                                }}
                            />
                        }
                    </div>
                </Slide>
            </Modal>
        </div>
    )

}
export default ViewFavourProof