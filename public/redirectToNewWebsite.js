const stageNow = 3;
const redirectPercentage = 1;
const redirectActive = true;

function saveRedirect(redirectInfo) {
  localStorage.KasselLabsRedirect = JSON.stringify(redirectInfo);
}

function isFallback() {
  return location.search.indexOf('fallback') > -1;
}

function redirectToNewWebsite(){
  location.assign('https://starwarsintrocreator.kassellabs.io/?ref=redirect'+location.hash);
}

function randomShouldRedirect() {
  // return Math.random() < redirectPercentage;
  return true;
}

$(document).ready(function() {
  var redirectInfoFromStorage =  localStorage.KasselLabsRedirect;
  redirectInfoFromStorage = redirectInfoFromStorage && JSON.parse(redirectInfoFromStorage);

  checkRedirect(redirectInfoFromStorage);
});

function checkRedirect(redirectInfo) {
  if (!redirectInfo || (redirectInfo.stage < stageNow && !redirectInfo.redirect)) {
    const shouldRedirect = randomShouldRedirect();
    var redirect = false;
    if (shouldRedirect) {
      redirect = true;
    }

    redirectInfo = {
      redirect: redirect,
      stage: stageNow,
    }
  }

  const fallback = isFallback();
  if (fallback && redirectInfo.redirect) {
    redirectInfo = {
      redirect: false,
      stage: stageNow,
    }
  }

  saveRedirect(redirectInfo);

  const redirectNow = redirectInfo.redirect;
  if (redirectNow && redirectActive) {
    redirectToNewWebsite();
  }
}