export{
    setNationality,
    getCurrentDateFormatted,
    setGender,
    formatAmount,
    setCurrentRank,
}

function setCurrentRank(level) {
    let currentRank;
    if (level >= 50) {
        currentRank = 'Junior developer';
    } else if (level >= 40) {
        currentRank = 'Basic developer';
    } else if (level >= 30) {
        currentRank = 'Assistant developer';
    } else if (level >= 20) {
        currentRank = 'Apprentice developer';
    } else if (level >= 10) {
        currentRank = 'Beginner developer';
    } else {
        currentRank = 'Aspiring developer';
    }
    return currentRank;
}

function formatAmount(amount) {
    let amountInKB = amount / 1000;
    let displayAmount = amountInKB;
    let displayUnit = 'KB';

    if (amountInKB > 1000) {
        displayAmount = amountInKB / 1000;
        displayUnit = 'MB';
        displayAmount = Math.floor(displayAmount * 100) / 100;
    }

    return `${displayAmount.toFixed(displayUnit === 'MB' ? 2 : 0)} ${displayUnit}`;
}


function setGender(gender) {
    if (gender === "Féminin") {
        document
            .getElementById("photo-user-hearder")
            .classList.add("profile-feminin");
        document.getElementById("photo-profile").classList.add("profile-feminin2");
    } else {
        document
            .getElementById("photo-user-hearder")
            .classList.add("profile-masculin");
        document.getElementById("photo-profile").classList.add("profile-masculin2");
    }
}

function getCurrentDateFormatted() {
    const currentDate = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    const formattedDate = currentDate.toLocaleDateString("en-GB", options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

function setNationality(nationality) {
    switch (nationality) {
        case "senegal":
            document.getElementById("user-drapeau").classList.add("drapeau-sn");
            break;
        case "mali":
            document.getElementById("user-drapeau").classList.add("drapeau-mali");
            break;
        case "guinea":
            document.getElementById("user-drapeau").classList.add("drapeau-guinee");
            break;
        case "guinea bissau":
            document.getElementById("user-drapeau").classList.add("drapeau-guinee-bissau");
            break;
        case "congo":
            document.getElementById("user-drapeau").classList.add("drapeau-congo");
            break;
        case "benin":
            document.getElementById("user-drapeau").classList.add("drapeau-benin");
            break;
        default:
            document.getElementById("user-drapeau").classList.add("drapeau-internationale");
            break;
    }
}
