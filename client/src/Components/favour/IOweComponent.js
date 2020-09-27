import React, { useState, useEffect, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LinkIcon from "@material-ui/icons/Link";
import moment from "moment";

import axios from "axios";

export default function IOwncomponent({ each, setType }) {
  const handleClickDeleteFavour = (event) => {
    if (window.confirm("Are you sure you want to delete this favor?")) {
      axios
        .post("/favors/update", {
          id: each._id,
          end_time: Date.now(),
          proof_url: null,
        })
        .then((response) => {
          if (response.data.success === true) {
            // Update the favors
            setType("loading");
            setType("all");
          }
        });
    } else {
      return;
    }
  };

  return (
    <div className="favour_card_right">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          className="text-left"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            id="image_proof"
            src={each.picture_proof_id}
            style={{ userSelect: "none", height: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item sm={2}></Grid>
        <Grid item xs={12} sm={6}>
          <div className="value_label_right">
            <div className="user_label_right">@You</div>
            <span>
              Owe <strong>@{each.owner.username}</strong>{" "}
              <strong>{each.favor_detail}</strong>
            </span>
            <br />
            <br />
            {!each.end_time ? (
              <UnsettleFavors
                each={each}
                handleClickDeleteFavour={handleClickDeleteFavour}
              />
            ) : (
              <SettledFavors each={each} />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const UnsettleFavors = ({ each, handleClickDeleteFavour }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <span
          onClick={handleClickDeleteFavour}
          className="iconAlignVertically spanNoSelectPointer"
          style={{ justifyContent: "flex-end" }}
        >
          <CloseIcon /> Delete
        </span>
      </Grid>
      <Grid item xs={6}>
        <span
          className="iconAlignVertically"
          style={{ justifyContent: "flex-end" }}
        >
          <AccessTimeIcon /> {moment(each.create_time).format("DD MMM")}
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
        <span
          className="iconAlignVertically"
          style={{ justifyContent: "flex-end" }}
        >
          <AccessTimeIcon /> {moment(each.create_time).format("DD MMM")}
        </span>
      </Grid>

      {/* End Time */}

      <Grid item xs={6}>
        <span>Completed:</span>
      </Grid>
      <Grid item xs={6}>
        <span
          className="iconAlignVertically"
          style={{ justifyContent: "flex-end" }}
        >
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
              className="iconAlignVertically"
              style={{ justifyContent: "flex-end", color: "gray" }}
              target="_blank"
              href={each.proof_url}
            >
              <LinkIcon /> Link
            </a>
          </Grid>
        </>
      )}
    </Grid>
  );
};
