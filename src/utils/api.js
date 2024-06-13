export const fetchUserData = async () => {
    const jwt = localStorage.getItem('jwt');
    const response = await fetch('https://((DOMAIN))/api/graphql-engine/v1/graphql', {
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
              // add other fields as needed
            }
          }
        `
      })
    });
    const data = await response.json();
    return data.data.user;
  };
  