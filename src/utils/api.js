export const fetchUserData = async () => {
    const jwt = localStorage.getItem('jwt');
    const response = await fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            user {
              id
              login
            }
          }
        `
      })
    });
    const data = await response.json();
    return data.data.user;
  };
  