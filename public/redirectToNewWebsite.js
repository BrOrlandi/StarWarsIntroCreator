const stageNow = 1;
const redirectPercentage = 0.2;
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
  return Math.random() < redirectPercentage;
}

$(document).ready(function() {
  var redirectInfo =  localStorage.KasselLabsRedirect;
  redirectInfo = redirectInfo && JSON.parse(redirectInfo);

  checkRedirect(redirectInfo);
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

  const redirect = redirectInfo.redirect;
  if (redirect && redirectActive) {
    redirectToNewWebsite();
  }
}