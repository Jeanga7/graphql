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
            user{
              id
              login
              attrs
            }
          }
        `
    })
  });
  const data = await response.json();
  return data.data.user;
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