import React, { useState, useEffect, useContext, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LinkIcon from '@material-ui/icons/Link';
import moment from 'moment';
import axios from 'axios';
import { ImageContext } from '../../context/ImageContext';

export default function IOweComponent({ each, setType }) {
  const { setSelectedImage, uploadImage } = useContext(ImageContext);

  const hiddenFileInput = useRef(null);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [showUploadProofOption, setShowUploadProofOption] = useState(false);

  const handleInputFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedImage(fileUploaded);
    setImageUploaded(true);
  };

  // Listen to if imageUploaded is true
  useEffect(() => {
    if (imageUploaded) {
      if (window.confirm('Are you sure you want to upload your proof?')) {
        uploadImage().then((response) => {
          if (response.error) {
            // Set error here
            alert('Invalid file type or size is too large. (Max: 2MB)');
            return;
          }
          axios
            .post(`${process.env.REACT_APP_API_URL}/favors/update`, {
              id: each._id,
              end_time: Date.now(),
              picture_proof_id: response.location,
            })
            .then((favourResponse) => {
              if (favourResponse.data.success === true) {
                // Update the favors
                setType('loading');
                setType('all');
              }
            });
        });
        setImageUploaded(false);
        setSelectedImage(null);
      }
      setImageUploaded(false);
      setSelectedImage(null);
    }
  }, [imageUploaded]);

  return (
    <div className='favour_card_left'>
      <Grid container alignItems='center' style={{ flexDirection: 'row-reverse' }}>
        <Grid
          item
          sm={4}
          className='text-right'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {each.picture_proof_id === 'null' ? (
            ''
          ) : (
            <img
              id='image_proof'
              src={each.picture_proof_id}
              className='float-right'
              style={{
                userSelect: 'none',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Grid>
        <Grid item sm={2}></Grid>
        <Grid item sm={6}>
          <div className='value_label_left'>
            <div className='user_label_left'>@You</div>
            <span>
              Owe <strong>@{each.owner.username}</strong> {each.favor_detail}
            </span>
            <br />
            <br />
            {!each.end_time ? <UnsettleFavors each={each} setShowUploadProofOption={setShowUploadProofOption} /> : <SettledFavors each={each} />}
          </div>
        </Grid>
      </Grid>
      {/* {Show Proof Here} */}
      {showUploadProofOption && (
        <div>
          <br />
          <span
            className='spanNoSelectPointer'
            onClick={() => {
              hiddenFileInput.current.click();
            }}
          >
            <b>Upload My Proof</b>
          </span>
          <input hidden type='file' accept='image/*' ref={hiddenFileInput} onChange={handleInputFileChange} />
          <span className='spanNoSelectPointer float-right' onClick={() => setShowUploadProofOption(false)}>
            <b className='iconAlignVertically_left'>
              <CloseIcon /> Close
            </b>
          </span>
        </div>
      )}
    </div>
  );
}

const UnsettleFavors = ({ each, setShowUploadProofOption }) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <span className='iconAlignVertically_left'>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} /> {moment(each.create_time).format('DD MMM')}
        </span>
      </Grid>
      <Grid item xs={3}>
        <span className='iconAlignVertically_left spanNoSelectPointer' onClick={() => setShowUploadProofOption(true)}>
          <DoneIcon fontSize='small' style={{ marginRight: '5px' }} /> Complete
        </span>
      </Grid>
    </Grid>
  );
};

const SettledFavors = ({ each }) => {
  return (
    <Grid container>
      {/* Start Time */}
      <Grid item xs={4}>
        <span className='settledTextFields'>Created:</span>
      </Grid>
      <Grid item xs={5}>
        <span className='iconAlignVertically_left'>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} /> {moment(each.create_time).format('DD MMM')}
        </span>
      </Grid>

      {/* End Time */}
      <Grid item xs={4}>
        <span className='settledTextFields'>Completed:</span>
      </Grid>
      <Grid item xs={5}>
        <span className='iconAlignVertically_left'>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} /> {moment(each.end_time).format('DD MMM')}
        </span>
      </Grid>

      {/* Link */}
      {each.picture_proof_id && (
        <>
          <Grid item xs={4}>
            <span className='settledTextFields'>Proof:</span>
          </Grid>
          <Grid item xs={5}>
            <a target='_blank' className='iconAlignVertically_left' href={each.picture_proof_id} style={{ color: 'gray' }}>
              <LinkIcon fontSize='small' style={{ marginRight: '5px' }} /> Link
            </a>
          </Grid>
        </>
      )}
    </Grid>
  );
};
