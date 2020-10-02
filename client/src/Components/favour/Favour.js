import React, { useState, useEffect, useContext, useRef } from 'react';
import './Favour.css';
import axios from 'axios';

import IOweComponent from './IOweComponent';
import IOwnComponent from './IOwnComponent';

const Favour = ({ type, setType }) => {
  const [iouData, setIouData] = useState([]);

  useEffect(() => {
    if (type === 'all' || type === 'settled') {
      axios.get(`${process.env.REACT_APP_API_URL}/favors/all/ower/${localStorage.getItem('id')}/${type === 'all' ? 'false' : 'true'}`)
          .then((owe) => {
        if (owe.data.success) {
          axios.get(`${process.env.REACT_APP_API_URL}/favors/all/owner/${localStorage.getItem('id')}/${type === 'all' ? 'false' : 'true'}`)
            .then((owner) => {
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
        type === 'owe'
          ? `${process.env.REACT_APP_API_URL}/favors/all/ower/${localStorage.getItem('id')}/false`
          : `${process.env.REACT_APP_API_URL}/favors/all/owner/${localStorage.getItem('id')}/false`;

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
          if (each.ower._id === localStorage.getItem('id')) {
            // The favours that people owe to the current user
            return <IOweComponent each={each} key={i} setType={setType} />;
          } else {
            return <IOwnComponent each={each} key={i} setType={setType} />;
          }
        })}
    </div>
  );
};

export default Favour;
