import React, { useState, useEffect, Fragment } from 'react';
import './Favour.css';
import axios from 'axios';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Zoom from '@material-ui/core/Zoom';

const Favour = ({ type }) => {
  const [iouData, setIouData] = useState([]);
  const [openProofModal, setOpenProofModal] = React.useState(false);
  const [img_url, setImgUrl] = useState('');

  const handleOpenProofModal = () => {
    //open Modal
    setOpenProofModal(true);
  };

  const handleCloseProofModal = () => {
    //close Modal
    setOpenProofModal(false);
  };

  useEffect(() => {
    if (type === 'all' || type === 'settled') {
      axios.get(`/favors/all/ower/${localStorage.getItem('id')}/${type === 'all' ? 'false' : 'true'}`).then((owe) => {
        if (owe.data.success) {
          axios.get(`/favors/all/owner/${localStorage.getItem('id')}/${type === 'all' ? 'false' : 'true'}`).then((owner) => {
            if (owner.data.success) {
              setIouData(sortIouData([...owe.data.data, ...owner.data.data]));
            }
          });
        }
      });
    } else if (type === 'isLoading') {
      setIouData([]);
    } else {
      const apiUrl =
        type === 'owe' ? `/favors/all/ower/${localStorage.getItem('id')}/false` : `/favors/all/owner/${localStorage.getItem('id')}/false`;

      axios.get(apiUrl).then((response) => {
        setIouData(sortIouData(response.data.data));
      });
    }
  }, [type]);

  function sortIouData(data) {
    let copyArray = [...data];

    copyArray.sort(function (a, b) {
      return Date.parse(b.create_time) - Date.parse(a.create_time);
    });

    return copyArray;
  }
  return (
    <div id='favour' className=''>
      {iouData.length !== 0 &&
        iouData.map((each, i) => {
          // User owe the other person
          if (each.ower._id === localStorage.getItem('id')) {
            return (
              <div className='favour_card_right' key={i} onClick={handleOpenProofModal}>
                <div className='user_label_right'>@You</div>
                <div className='card_content_right'>
                  <img id='image_proof' src={each.picture_proof_id} alt='' />

                  <div className='value_label_right'>
                    Owe <strong> @{each.owner.username} </strong> <strong> {each.favor_detail} </strong>
                  </div>
                </div>
                <div className='date_right'>{moment(each.create_time).format('DD MMM')}</div>
              </div>
            );
          } else {
            return (
              <div className='favour_card_left' key={i} onClick={handleOpenProofModal}>
                <div className='user_label_left'>@{each.ower.username}</div>
                <div className='card_content_left'>
                  <div className='value_label_left'>
                    Owes you <strong> {each.favor_detail} </strong>
                  </div>

                  <img id='image_proof' src={each.picture_proof_id} alt='' />
                </div>
                <div className='date_left'>{moment(each.create_time).format('DD MMM')}</div>
              </div>
            );
          }
        })}

      {/* 
        idk why, if use modal it shows the same picture for all favor card
        
      {iouData.map((each, i) => {
        return (
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className='view_favour_proof'
            open={openProofModal}
            onClose={handleCloseProofModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 1000,
            }}
            key={i}
          >
            <Zoom in={openProofModal}>
              <div className='view_favour_proof_container'>
                <div className='view_proof_header'>Here's Proof</div>
                <div className='view_proof_preview'>
                  <span className='proof_preview_label'>
                    <img src={each.picture_proof_id} alt='' />
                  </span>
                </div>
              </div>
            </Zoom>
          </Modal>
        );
      })} */}
    </div>
  );
};

export default Favour;
