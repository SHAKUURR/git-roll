"use strict";
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const notFound = document.querySelector(".notFound");
const card = document.querySelector(".card");
const profileImg = document.querySelector(".img");
const fullName = document.querySelector(".name");
const locations = document.querySelector(".location");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");
const repo = document.querySelector(".repo");
const body = document.querySelector(".container");
const form = document.querySelector(".form");

const profile = function (e) {
	e.preventDefault();
	const inputName = input.value;
	fetch(`https://api.github.com/users/${inputName}`)
		.then((response) => {
			if (!response.ok) throw new Error("User not found, try another! 😴😴");
			return response.json();
		})
		.then((userData) => {
			// console.log(userData);
			profileImg.style.backgroundImage = `url('${userData.avatar_url}')`;
			locations.textContent = userData.location
				? userData.location
				: "Pluto Continent";
			fullName.textContent = userData.name ? userData.name : userData.login;
			followers.textContent = userData.followers.toString().padStart(3, "0");
			following.textContent = userData.following.toString().padStart(3, "0");
			repo.textContent = userData.public_repos.toString().padStart(3, "0");
			card.style.opacity = 1;
			notFound.style.display = "none";
		})
		.catch((error) => {
			if (error.message === "Failed to fetch") {
				// Customize the error message for network issues
				notFound.textContent = "Network issue, please check your connection";
			} else {
				notFound.textContent = error.message;
			}
			// console.error(error.message);
			notFound.style.display = "block";
			card.style.opacity = 0;
		});

	input.value = "";
};

search.addEventListener("click", profile);

//download button

// downloadbtn.addEventListener("click", function () {
// 	form.style.display = "none";
// 	// Use HTML2Canvas to capture the contents of the container as a PNG image
// 	html2canvas(body, { scale: 3 }).then(function (canvas) {
// 		// Create a download link for the PNG image
// 		const link = document.createElement("a");
// 		link.download = `myprofile.png`;
// 		link.href = canvas.toDataURL("image/png");

// 		// Click the download link to initiate the download
// 		link.click();
// 	});
// });
