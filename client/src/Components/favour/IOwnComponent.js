import React, { useState, useEffect, useContext, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LinkIcon from '@material-ui/icons/Link';
import moment from 'moment';

import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';

export default function IOwncomponent({ each, setType }) {
  const handleClickDeleteFavour = (event) => {
    if (window.confirm('Are you sure you want to delete this favor?')) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/favors/update`, {
          id: each._id,
          end_time: Date.now(),
          picture_proof_id: 'null',
        })
        .then((response) => {
          if (response.data.success === true) {
            // Update the favors
            setType('loading');
            setType('all');
          }
        });
    } else {
      return;
    }
  };

  return (
    <div className='favour_card_right'>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          className='text-left'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {each.picture_proof_id === 'null' ? (
            ''
          ) : (
            <img id='image_proof' src={each.picture_proof_id} style={{ userSelect: 'none', height: '100%', objectFit: 'cover' }} />
          )}
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item xs={12} sm={6}>
          <div className='value_label_right'>
            <div className='user_label_right'>@{each.ower.username}</div>
            <span>
              Owes <strong>@You</strong> {each.favor_detail}
            </span>
            <br />
            <br />
            {!each.end_time ? <UnsettleFavors each={each} handleClickDeleteFavour={handleClickDeleteFavour} /> : <SettledFavors each={each} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const UnsettleFavors = ({ each, handleClickDeleteFavour }) => {
  return (
    <Grid justify='flex-end' container>
      <Grid item xs={4}>
        <span onClick={handleClickDeleteFavour} className='iconAlignVertically_right spanNoSelectPointer' style={{ justifyContent: 'flex-end' }}>
          <CloseIcon fontSize='small' style={{ marginRight: '5px' }} />
          <span className='textAlignVertically_right'> Delete </span>
        </span>
      </Grid>
      <Grid item xs={4}>
        <span className='iconAlignVertically_right' style={{ justifyContent: 'flex-end' }}>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} />
          <span className='textAlignVertically_right'> {moment(each.create_time).format('DD MMM')} </span>
        </span>
      </Grid>
    </Grid>
  );
};

const SettledFavors = ({ each }) => {
  return (
    <Grid justify='flex-end' container>
      {/* Start Time */}
      <Grid item xs={5}>
        <span className='settledTextFields'>Created:</span>
      </Grid>
      <Grid item xs={4}>
        <span className='iconAlignVertically_right' style={{ justifyContent: 'flex-end' }}>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} />
          <span className='textAlignVertically_right'> {moment(each.create_time).format('DD MMM')} </span>
        </span>
      </Grid>

      {/* End Time */}

      <Grid item xs={5}>
        <span className='settledTextFields'>Completed:</span>
      </Grid>
      <Grid item xs={4}>
        <span className='iconAlignVertically_right' style={{ justifyContent: 'flex-end' }}>
          <AccessTimeIcon fontSize='small' style={{ marginRight: '5px' }} />
          <span className='textAlignVertically_right'>{moment(each.end_time).format('DD MMM')} </span>
        </span>
      </Grid>

      {/* Link */}

      {each.picture_proof_id === 'null' ? (
        ''
      ) : (
        <>
          <Grid item xs={5}>
            <span className='settledTextFields'>Proof:</span>
          </Grid>
          <Grid item xs={4}>
            <a
              className='iconAlignVertically_right'
              style={{ justifyContent: 'flex-end', color: 'gray' }}
              target='_blank'
              href={each.picture_proof_id}
            >
              <LinkIcon fontSize='small' style={{ marginRight: '5px' }} /> Link
            </a>
          </Grid>
        </>
      )}
    </Grid>
  );
};
