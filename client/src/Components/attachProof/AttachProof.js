import React, { Fragment, memo, useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AlertMessage from '../AlertMessage';
import { ImageContext } from '../../context/ImageContext';
import './AttachProof.css';

const AttachProof = (props) => {

  const { selectedImage, setSelectedImage, uploadImage, setUploadedImageUrl } = useContext(ImageContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadEmpty, setUploadEmpty] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [proofFieldClicked, setProofFieldClicked] = useState('proof_modal_btn_unattached');

  // const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage('');
      }, 2000);
    }
  });

  useEffect(() => {
    if (selectedImage === null) {
      setImageName('');
      setImagePreview('');
      setProofFieldClicked('proof_modal_btn_unattached');
    }
  });

  // const showErrorMsg = () => {
  //   if (true) {
  //     return setTimeout(() => {
  //       <AlertMessage severity='error'>Please upload image</AlertMessage>;
  //     }, 3000);
  //   }
  // };

  const uploadImageClick = () => {
    document.getElementById('upload-image-input').click();
  };

  const fileChangedHandler = (e) => {
    const previewUrl = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : '';
    if(previewUrl){

      setSelectedImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      setImagePreview(previewUrl);
    }
  };

  const imageUploadHandler = () => {
    let msg = uploadImage();
    console.log(msg);
  };



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
    setProofFieldClicked('proof_modal_btn_unattached');
  };

  const handleConfirm = () => {
    if (selectedImage === null) {
      setAlertMessage(<AlertMessage severity='error'>Please select an image</AlertMessage>);
    } else {
      //close Modal
      setOpen(false);

      //set proof field to hotpink
      setProofFieldClicked('proof_modal_btn_attached');
    }
  };

  useEffect(() => {
    // if cancel button is clicked, Proof field turns darkgrey
    let cancelButtonClicked = props.cancelClicked;
    if (cancelButtonClicked === true) {
      setProofFieldClicked('proof_modal_btn_unattached');
    }
  });

  return (
    <div id='attach_proof'>
      <div className='createFavour_fourth_line'>
        <div className='here_text'> Here's </div>
        <button className={proofFieldClicked} onClick={handleOpen}>
          Proof
        </button>
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='attachProof_modal'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='up' in={open} mountOnEnter unmountOnExit>
          <div className='attachProof_modal_container'>
            <div className='attach_proof_title'>Where's the Proof?</div>
            <button onClick={uploadImageClick} className='upload_proof_btn'>
              {uploadSuccess ? (
                successMsg
              ) : (
                <Fragment>
                  <PhotoCameraIcon className='upload_proof_icon' fontSize='large' />
                  <input hidden type='file' accept='image/*' id='upload-image-input' onChange={fileChangedHandler} />
                  {imageName ? (
                    <div className='upload_proof_label_dark'> {imageName} </div>
                  ) : (
                    <div className='upload_proof_label'> Select an image </div>
                  )}
                </Fragment>
              )}
            </button>

            <div className='img_preview'>
              <span className='preview_label'>
                {imagePreview ? <img className="attach_proof_img_preview" src={imagePreview} alt='' /> : 'Image preview'}
              </span>
              {alertMessage && alertMessage}
            </div>

            <div className='buttons'>
              <button className='cancel_btn' onClick={handleClose}>
                {' '}
                <span> Cancel</span>
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
  );
};

export default AttachProof;
