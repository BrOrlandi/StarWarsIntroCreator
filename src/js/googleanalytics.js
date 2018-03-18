if ('production' === process.env.NODE_ENV) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-71659114-1', 'auto');
}

export const sendGAPageView = () => {
  if ('production' === process.env.NODE_ENV) {
    window.ga('send', 'pageview', {
      'page': window.location.pathname + window.location.search  + window.location.hash,
    });
  }
}