import React, { useState, useEffect, useContext, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { ImageContext } from '../../context/ImageContext';
import ViewFavourProof from "../viewFavourProof/ViewFavourProof";
import "./IOweComponent.css";
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const IOweComponent = ({ each, setType }) => {

    const Unsettled = ({ each }) => {

        const [imageUploaded, setImageUploaded] = useState(false);
        const { setSelectedImage, uploadImage } = useContext(ImageContext);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const hiddenFileInput = useRef(null);

        const handleInputFileChange = (event) => {
            const fileUploaded = event.target.files[0];
            setSelectedImage(fileUploaded);
            setImageUploaded(true);
        };

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
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
                            .post(
                                `${process.env.REACT_APP_API_URL}/favors/update`,
                                {
                                    id: each._id,
                                    end_time: Date.now(),
                                    picture_proof_id: response.location,
                                },
                                {
                                    withCredentials: true,
                                }
                            )
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

        return(
            <div>
                <button className='menu_owe_btn' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon/>
                </button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <button className='complete_owe_btn' onClick={() => {hiddenFileInput.current.click();}}>
                        Complete <input hidden type='file' accept='image/*' ref={hiddenFileInput} onChange={handleInputFileChange} />
                    </button>
                    <ViewFavourProof proofId={each.picture_proof_id} />
                </Menu>
                <span className='date_owe'> {moment(each.create_time).format('DD MMM')} </span>
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

        return(
            <div>
                <button className='settled_menu_owe_btn' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon/>
                </button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <ViewFavourProof proofId={each.picture_proof_id} />
                </Menu>
                <span className='settled_date_owe'> settled on <strong>{moment(each.end_time).format('DD MMM')}</strong></span>
            </div>
        )
    }

    return (
        <div>
            <div className='favour_card_owe'>
                <div className='favour_content_owe_left'>
                    <div className='user_label_owe'> @you </div>
                    <span className='value_label_owe'> Owe <strong>@{each.owner.username}</strong> {each.favor_detail} </span>
                </div>
                <div className="favour_content_owe_right">
                    {!each.end_time ? <Unsettled each={each}/> : <Settled each={each}/> }
                </div>
            </div>
        </div>
    );
}

export default IOweComponent;



