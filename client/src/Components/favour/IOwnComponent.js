import React from 'react';
import moment from 'moment';
import axios from 'axios';
import ViewFavourProof from "../viewFavourProof/ViewFavourProof";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import "./IOwnComponent.css";

const IOwnComponent = ({ each }) => {

    const Unsettled = ({ each, setType }) => {

        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleClickDeleteFavour = (event) => {
            if (window.confirm('Are you sure you want to delete this favor?')) {
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/favors/update`,
                        {
                            id: each._id,
                            end_time: Date.now(),
                            picture_proof_id: 'null',
                        },
                        {
                            withCredentials: true,
                        }
                    )
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
            <div>
                <button className='menu_own_btn' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon/>
                </button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <button className='delete_own_btn' onClick={handleClickDeleteFavour}> Delete </button>
                    <ViewFavourProof proofId={each.picture_proof_id} />
                </Menu>
                <span className='date_own'> {moment(each.create_time).format('DD MMM')} </span>
            </div>
        )
    }

    const Settled = ({ each }) => {

        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <button className='settled_menu_own_btn' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon/>
                </button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <ViewFavourProof proofId={each.picture_proof_id} />
                </Menu>
                <span className='settled_date_own'> settled on <strong>{moment(each.end_time).format('DD MMM')}</strong></span>
            </div>

        )
    }

    return (
      <div>
          <div className='favour_card_own'>
              <div className="favour_content_own_left">
                  {!each.end_time ? <Unsettled each={each}/> : <Settled each={each}/> }
              </div>
              <div className='favour_content_own_right'>
                  <div className='user_label_own'> @{each.ower.username} </div>
                  <span className='value_label_own'> Owes <strong>@you</strong> {each.favor_detail} </span>
              </div>
          </div>
      </div>
    );
}
export default IOwnComponent
