import React, {useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from '@material-ui/icons/Close';
import './CompleteRequest.css';
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import AlertMessage from "../AlertMessage";
import {ImageContext} from "../../context/ImageContext";
import Collapse from "@material-ui/core/Collapse";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import moment from "moment";

const CompleteRequest = (props) => {

    const { isAuth, user} = useContext(AuthContext);

    const { selectedImage, setSelectedImage, uploadImage, setUploadedImageUrl } = useContext(ImageContext);

    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [successMsg, setSuccessMsg] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [imageName, setImageName] = useState('');
    const [imagePreview, setImagePreview] = useState();

    const uploadImageClick = () => {
        document.getElementById('upload-image-input').click();
    };

    const fileChangedHandler = () => {
        console.log("file change handler")
    }

    const handleOpen = () => {
        //open Modal
        setOpen(true);
    };

    const handleClose = () => {
        //close Modal
        setOpen(false);
        setSelectedImage(null);
        setImageName('');
        setImagePreview('');
    }

    const handleConfirm = () => {
        if (selectedImage === null) {
            setOpenAlert(true);
            setAlertMessage('Please select an image');
        } else {
            //close Modal
            setOpen(false);
        }
    };

    useEffect(() => {
        if (alertMessage) {
            setTimeout(() => {
                setOpenAlert(false);
            }, 2000);
        }
    });

    useEffect(() => {
        if (selectedImage === null) {
            setImageName('');
            setImagePreview('');
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
        <div className='complete_request_modal_container'>
            <div className='complete_request_title_container'>
                <span className="complete_request_title"> Complete Request </span>
                <div className='complete_request_name'> {props.requestName} </div>
                <div className='complete_request_details_container'>
                    <span className='complete_request_owner'> requested by <strong>{props.requestOwner}</strong>
                        <span className="complete_request_date"> on <strong>{moment(props.requestDate).format('DD MMM')}</strong></span>
                    </span>
                </div>
            </div>
            <div className='complete_request_proof_container'>
                <button className="complete_request_upload_btn" onClick={uploadImageClick}>
                    {uploadSuccess ? (
                        successMsg
                    ) : (
                        <fragment className="complete_request_upload_btn" >
                            <PhotoCameraIcon/>
                            <input hidden type='file' accept='image/*' id='upload-image-input' onChange={fileChangedHandler}/>
                            {imageName ? (
                                <div className='upload_proof_text'> {imageName} </div>
                            ) : (
                                <div className='upload_proof_text'> Upload Proof </div>
                            )}
                        </fragment>
                    )}
                </button>
                <div className='request_proof_img_preview'>
                              <span className='preview_label'>
                                {/* <img src={imagePreview} alt='' /> */}
                                  {imagePreview ? <img src={imagePreview} alt='' /> : 'Image preview'}
                              </span>
                </div>
                <div className='complete_request_alert'>
                    <Collapse in={openAlert}>
                        {alertMessage && <AlertMessage severity='error'> {alertMessage} </AlertMessage>}
                    </Collapse>
                </div>
            </div>
            <div className='complete_request_confirm_btn_container'>
                <button className='cancel_complete_request_btn' onClick={handleClose}>
                    {' '}
                    <span>Cancel</span>
                </button>
                <button className='confirm_complete_request_btn' onClick={handleConfirm}>
                    {' '}
                    <span>Confirm</span>
                </button>
            </div>
        </div>
    );

    const fromRequestDetail = (
        <div className="complete_request_btn_container">
            <button className='complete_request_detail_btn' onClick={handleOpen}>
                <span><CheckCircleIcon fontSize ="small" style={{marginTop: "4px", marginRight:"10px"}}/></span>
                <span>Complete Request</span>
            </button>
        </div>
    );

    const fromRequestCard = (
        <button className = "complete_request_btn" onClick={handleOpen}>
            <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
            Complete Request
        </button>
    );

    return (
        <div id="CompleteRequest">
            {(props.buttonSource === 'fromRequestDetail') ? fromRequestDetail : fromRequestCard}
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
                    {isAuth ? authModal : guestModal}
                </Slide>
            </Modal>
        </div>
    )
}

export default CompleteRequest;