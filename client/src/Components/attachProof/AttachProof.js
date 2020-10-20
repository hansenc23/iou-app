import React, { Fragment, memo, useState, useEffect, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AlertMessage from '../AlertMessage';
import { ImageContext } from '../../context/ImageContext';
import './AttachProof.css';
import Collapse from "@material-ui/core/Collapse";

const AttachProof = (props) => {

  const { selectedImage, setSelectedImage, uploadImage, setUploadedImageUrl } = useContext(ImageContext);
  const [successMsg, setSuccessMsg] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [proofFieldClicked, setProofFieldClicked] = useState('proof_modal_btn_unattached');
  const [openAlert, setOpenAlert] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState();

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
      setProofFieldClicked('proof_modal_btn_unattached');
    }
  });

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
      setOpenAlert(true);
      setAlertMessage('Please select an image');
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
            <div className='attach_proof_label'>Where's the Proof?</div>

            <div className='attach_proof_container'>
              <button onClick={uploadImageClick} className='upload_proof_btn_container'>
                {uploadSuccess ? (
                  successMsg
                ) : (
                  <Fragment>
                    <input hidden type='file' accept='image/*' id='upload-image-input' onChange={fileChangedHandler} />
                    <div className='upload_proof_btn'> <PhotoCameraIcon/> {imageName ? imageName : 'Upload Proof'} </div>
                  </Fragment>
                )}
              </button>
              <div className='img_preview'>
                <span className='preview_label'>
                  {imagePreview ? <img className="img_preview" src={imagePreview} alt='' /> : 'Image preview'}
                </span>
              </div>
              <div className='complete_request_alert'>
                <Collapse in={openAlert}>
                  {alertMessage && <AlertMessage severity='error'> {alertMessage} </AlertMessage>}
                </Collapse>
              </div>
            </div>

            <div className='attach_proof_buttons'>
              <button className='attach_proof_cancel_btn' onClick={handleClose}>
                {' '}
                <span> Cancel</span>
              </button>
              <button className='attach_proof_confirm_btn' onClick={handleConfirm}>
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
