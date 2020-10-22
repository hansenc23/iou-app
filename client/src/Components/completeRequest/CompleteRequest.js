import React, {useState, useEffect, useContext, Fragment } from 'react';
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
import axios from 'axios';
import Spinner from '../../Components/Spinner';

const CompleteRequest = (props) => {

    const { isAuth, user} = useContext(AuthContext);

    const { selectedImage, setSelectedImage, uploadImage, setUploadedImageUrl } = useContext(ImageContext);
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [successMsg, setSuccessMsg] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [imageName, setImageName] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const uploadImageClick = () => {
        document.getElementById('upload-image-input').click();
    };

    const fileChangedHandler = (e) => {
        const previewUrl = e.target.files[0] ?  URL.createObjectURL(e.target.files[0]) : '';
        if(previewUrl){

            setSelectedImage(e.target.files[0]);
            setImageName(e.target.files[0].name);
            setImagePreview(previewUrl);
        }
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


    //check reward list if it contains a reward that a the logged in user has added
    const checkRewardList = () =>{
        for(let i = 0; i< props.requestRewards.length; i++){
            if(props.requestRewards[i].owner._id === user.id){
               return true;
            }
            
        }  
        return false;
    }

    const handleConfirm = async () => {
        
        if (selectedImage === null) {
            setOpenAlert(true);
            setAlertMessage('Please select an image');
        } else if(props.requestOwner === user.username){
            setOpenAlert(true);
            setAlertMessage('Cannot complete your own request!');
        }else if(checkRewardList() === true){
            setOpenAlert(true);
            setAlertMessage('Please remove your added reward before completing this request.');
        }else{
            setIsLoading(true);
            const resImage = await uploadImage();
            if(resImage.error){
                setIsLoading(false);
                setOpenAlert(true);
                setAlertMessage('Upload failed. Invalid file type or size is too large. (Max: 2MB)');
            }
            else{
                try{
                    //create array to store promises
                    const promises = [];
                    //create favour for each rewards in the request
                    props.requestRewards.forEach(async (rewards) => {
                        const res = axios.post(`${process.env.REACT_APP_API_URL}/favors/create`, {
                            ower: rewards.owner._id,
                            owner: user.id,
                            favor_detail: rewards.reward,
                            picture_proof_id: resImage.location,
                          });
    
                         promises.push(res);
                    })    
                    const data = await Promise.all(promises); 
                    if(data){
                        //update request status to be completed
                        const res = await axios.post(`${process.env.REACT_APP_API_URL}/request/complete`, {
                            request_id: props.requestId,
                            completer_id: user.id,
                            picture_proof_url: resImage.location,
                          });

                          if(res.status === 200){
                              setIsLoading(false);
                              alert('Request completed! Please view your newly added favours');
                              handleClose();
                              window.location.reload(false);
                          }else{
                            setIsLoading(false);
                              console.log('Failed');
                          }
                    }                  
                }catch(error){
                    setIsLoading(false);
                    setOpenAlert(true);
                    setAlertMessage('Failed');
                }
                
            }
        }
    };

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
        <div className='complete_request_modal_container'>
            <div className='complete_request_title_container'>
                <span className="complete_request_title"> Complete Request </span>
                <div className='complete_request_name'> {props.requestName} </div>
                <div className='complete_request_details_container'>
                    <span className='complete_request_owner'> requested by <strong>@{props.requestOwner}</strong>
                        <span className="complete_request_date"> on <strong>{moment(props.requestDate).format('DD MMM')}</strong></span>
                    </span>
                </div>
            </div>
            <div className='complete_request_proof_container'>
                <button className="complete_request_upload_btn" onClick={uploadImageClick}>
                    {uploadSuccess ? (
                        successMsg
                    ) : (
                        <Fragment>
                            <PhotoCameraIcon/>
                            <input hidden type='file' accept='image/*' id='upload-image-input' onChange={fileChangedHandler}/>
                            <div className='upload_proof_text'> {imageName ? imageName : 'Upload Proof'} </div>
                        </Fragment>
                    )}
                </button>
                <div className='request_proof_img_preview'>
                      <span className='preview_label'>
                        {/* <img src={imagePreview} alt='' /> */}
                          {imagePreview ? <img className='request_proof_img_preview'src={imagePreview} alt='' /> : 'Image preview'}
                      </span>
                </div>
                <div className='complete_request_alert'>
                    <Collapse in={openAlert}>
                        {alertMessage && <AlertMessage severity='error'> {alertMessage} </AlertMessage>}
                    </Collapse>

                    {isLoading ? <Spinner width='50px'/> : ''}
                    
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