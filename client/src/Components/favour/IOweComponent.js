import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LinkIcon from "@material-ui/icons/Link";
import moment from "moment";
import axios from "axios";
import { ImageContext } from "../../context/ImageContext";

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
      if (window.confirm("Are you sure you want to upload your proof?")) {
        uploadImage().then((response) => {
          if (response.error) {
            // Set error here
            console.log("There is a upload error");
            return;
          }
          axios
            .post("/favors/update", {
              id: each._id,
              end_time: Date.now(),
              proof_url: response.location,
            })
            .then((favourResponse) => {
              if (favourResponse.data.success === true) {
                // Update the favors
                setType("loading");
                setType("all");
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
    <div className="favour_card_left">
      <Grid
        container
        alignItems="center"
        style={{ flexDirection: "row-reverse" }}
      >
        <Grid
          item
          sm={4}
          className="text-right"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            id="image_proof"
            src={each.picture_proof_id}
            className="float-right"
            style={{
              userSelect: "none",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item sm={2}></Grid>
        <Grid item sm={6}>
          <div className="value_label_left">
            <div className="user_label_left">@You</div>
            <span>
              Owe <strong>@{each.owner.username}</strong> <strong>{each.favor_detail}</strong>
            </span>
            <br />
            <br />
            {!each.end_time ? (
              <UnsettleFavors
                each={each}
                setShowUploadProofOption={setShowUploadProofOption}
              />
            ) : (
              <SettledFavors each={each} />
            )}
          </div>
        </Grid>
      </Grid>
      {/* {Show Proof Here} */}
      {showUploadProofOption && (
        <div>
          <br />
          <span
            className="spanNoSelectPointer"
            onClick={() => {
              hiddenFileInput.current.click();
            }}
          >
            <b>Upload My Proof</b>
          </span>
          <input
            hidden
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleInputFileChange}
          />
          <span
            className="spanNoSelectPointer float-right"
            onClick={() => setShowUploadProofOption(false)}
          >
            <b className="iconAlignVertically">
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
      <Grid item xs={6}>
        <span className="iconAlignVertically">
          <AccessTimeIcon /> {moment(each.create_time).format("DD MMM")}
        </span>
      </Grid>
      <Grid item xs={6}>
        <span
          className="iconAlignVertically spanNoSelectPointer"
          onClick={() => setShowUploadProofOption(true)}
        >
          <DoneIcon /> Complete
        </span>
      </Grid>
    </Grid>
  );
};

const SettledFavors = ({ each }) => {
  return (
    <Grid container>
      {/* Start Time */}
      <Grid item xs={6}>
        <span>Created:</span>
      </Grid>
      <Grid item xs={6}>
        <span className="iconAlignVertically">
          <AccessTimeIcon /> {moment(each.create_time).format("DD MMM")}
        </span>
      </Grid>

      {/* End Time */}
      <Grid item xs={6}>
        <span>Completed:</span>
      </Grid>
      <Grid item xs={6}>
        <span className="iconAlignVertically">
          <AccessTimeIcon /> {moment(each.end_time).format("DD MMM")}
        </span>
      </Grid>

      {/* Link */}
      {each.proof_url && (
        <>
          <Grid item xs={6}>
            <span>Proof:</span>
          </Grid>
          <Grid item xs={6}>
            <a
              target="_blank"
              className="iconAlignVertically"
              href={each.proof_url}
              style={{ color: "gray" }}
            >
              <LinkIcon /> Link
            </a>
          </Grid>
        </>
      )}
    </Grid>
  );
};