/* IN APP NOTIFICATIONS:
 ************************/

//Display notifications for 10s
function showNotifications(message) {
  $("#notification").css({ visibility: "visible" });
  $("#notification").html(message);
  resetMessage = "";
  setTimeout(function () {
    $("#notification").css({ visibility: "hidden" }).html(resetMessage);
  }, 10000);
}

// Display "loading" notification while waiting
function pendingNotification() {
  const msg = `<div class="spinner-border spinner-border-sm text-dark" role="status"></div>
            <span> Loading...</span>   
        <div>`;
  showNotifications(msg);
}

// Display error message if any
function errorNotification(error) {
  if (error.message === undefined) {
    showNotifications(error);
    console.error(error);
  } else {
    showNotifications(error.message);
  }
}
