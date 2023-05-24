import axios from 'axios';
import React, { useState } from 'react';

export default function ImagePage() {
  const [img, setImg] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const sendFile = async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      await axios
        .post('/profile/image', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => setAvatar(res.data.path));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form encType="multipart/form-data">
      {/* {avatar ? <img src={avatar} /> : <a>fff</a>} */}
      <br />
      <div className="form-group">
        <label htmlFor="exampleFormControlFile1">
          <input
            type="file"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
            className="form-control-file"
            id="exampleFormControlFile1"
          />
        </label>
      </div> 
      <br />

      <button type="submit" className="btn btn-success btn-lg" onClick={sendFile}>
        Добавить фото
      </button>
    </form>
  );
}
