var API_KEY = 'AIzaSyBhd8VgU_PPyBPTZs-PndDY9qScoCxetc4';
var CLIENT_ID = '260180645409-ekm8vv6bml9kfnptjfo4jr0jtt4klj3n.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES =  'https://www.googleapis.com/auth/youtube.force-ssl';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var defaultChannel = 'googledevelopers';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    }, function(error) {
      console.log(error);
    });
  }

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        // content.style.display = 'block';
        // videoContainer.style.display = 'block';
        getChannel(defaultChannel);
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        // content.style.display = 'none';
        // videoContainer.style.display = 'none';

    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

function handleSignoutClick(event) {
   gapi.auth2.getAuthInstance().signOut();
}