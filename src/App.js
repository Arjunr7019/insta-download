import './App.css';
import fetch from 'node-fetch';
import React, { useState } from 'react';

function App() {

  // const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultPhoto, setResultPhoto] = useState(null);
  const [url, setUrl] = useState(null);
  const [instagramUrl, setInstagramUrl] = useState(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [contentCheck, setContentCheck] = useState(true);
  const [title, setTitle] = useState('');
  // const [outputString, setOutputString] = useState('');

  // useEffect(() => {
  //   const downloadInstagramContent = async () => {
  //     const apiKey = 'b1916b2007mshe852f91a8b5e62ep10c549jsn162899bed348';
  //     const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(instagramUrl)}`;

  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': apiKey,
  //         'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
  //         'Content-Type': 'application/json',
  //       },
  //     };

  //     try {
  //       const response = await fetch(apiUrl, options);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const result = await response.json();
  //       setInstagramData(result);
  //       setResultPhoto(result[0].url);

  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   downloadInstagramContent();
  // }, []); // Empty dependency array means this effect runs once when the component mounts

  function fetchValue() {
    let getUrl = document.getElementById("inputUrl").value;
    setInstagramUrl(getUrl);
    downloadInstagramContent();
    setLoading(true);
    setError(null);

  }
  function setUrlValue() {
    let getUrl = document.getElementById("inputUrl").value;
    setUrl(getUrl);
  }
  async function downloadInstagramContent() {
    const apiKey = 'b1916b2007mshe852f91a8b5e62ep10c549jsn162899bed348';
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/?url=${encodeURIComponent(instagramUrl)}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResultPhoto(result[0].url);
      setLoading(result[0].url === "null" ? true : false);
      setLoadingContent(result[0].url === "null" ? true : false);
      setContentCheck(result[0].type === "photo" ? true : false);
      setTitle(result[0].title);

    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    }
  }

  return (
    <div className='main'>
      <div className='contentCard width-80 d-flex flex-column justify-content-center align-items-center'>
        <h1 className='mb-4'>Reels Downloader</h1>
        <input onChange={setUrlValue} className='mb-3' id='inputUrl' type="url" value={url} />
        <button className='button' onClick={fetchValue}>Get Reel</button>
        {loading ? <p>Loading...</p> : <p></p>}
        {error && <p>Error: {error}</p>}
        {loadingContent ? <div></div> : <div className='width-80 d-flex flex-row justify-content-around align-items-center'>
          <div className='resultContent mb-3 width-100'>
            {contentCheck ? <img className='contentWidth' src={resultPhoto} alt="content" /> :
              <video className='videoContent' controls >
                <source className='contentWidth' src={resultPhoto} type="video/mp4" />
              </video>}
          </div>
          <div className='resultContent flex-column width-100'>
            <div className='width-80 resultContent'>
              <p>{title}</p>
            </div>
            <button className='button' onClick={() => window.open(resultPhoto)}>Download</button>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default App;
