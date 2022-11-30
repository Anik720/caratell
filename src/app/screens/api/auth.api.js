import axios from 'axios';

const signin = async ({ email, password }) => {
  try {
    let response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTwilioToken = async ({ email }) => {
  try {
    let response = await fetch('http://localhost:5000/auth/twilioToken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTwilioTokenVideo = async ({ identity, room }) => {
  //http://localhost:3000/live-stream/upcoming
  console.log('form api', identity, room);
  try {
    // let response = await axios
    //   .post('http://localhost:5000/liveVideoTwilioToken', {
    //     identity,
    //     room,
    //   })
    //   .then(async function (response) {
    //     console.log(response);
    //     return await response.json();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    let response = await fetch('http://localhost:5000/liveVideoTwilioToken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({identity, room })
    })
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, getTwilioToken, getTwilioTokenVideo };
