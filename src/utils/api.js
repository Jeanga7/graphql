export { fetchUserData, showSlides }

const fetchUserData = async () => {
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
              auditRatio
              attrs
              events(where: {eventId: {_eq: 56}}) {
                level
              }
            }
            skills: transaction(distinct_on: [type], where: {type: {_like: "%skill%"}}) {
              amount
              type
            }
            transaction_aggregate(
              where: {transaction_type: {type: {_eq: "xp"}}, event: {path: {_eq: "/dakar/div-01"}}}
            ) {
              aggregate {
                sum {
                  amount
                }
              }
            }
          }
        `
    })
  });
  const data = await response.json();
  return data.data;
};

let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
}

/*======== Old Query ========*/
/* 
// pour diagramme xp en fonction du temps
{
  transaction(
    order_by: {createdAt: asc}
    where: {type: {_eq: "xp"}, eventId: {_eq: 56}}
  ) {
    createdAt
    amount
    path
    object{name}
  }
}

// pour diagramme projet faites par ordre
 transaction(
    order_by: {createdAt: asc}
    where: {type: {_eq: "xp"}, eventId: {_eq: 56}, _and: [{path: {_nilike: "%checkpoint%"}}, {path: {_nilike: "%piscine-js-2%"}}]}
  ) {
    createdAt
    object {
      name
    }
  }


  faire un diagramme du ratio projet faites/ projet restant
  
*/