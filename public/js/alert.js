//ignore alerts with "stay" class
export const hideAlert = () => {
    const alerts = document.querySelectorAll('.alert');
    // console.dir(alerts);
    if(alerts)  {
        alerts.forEach(alert => {
            if(!alert.className.split(' ').includes('stay')) alert.parentElement.removeChild(alert);
        });
    } 
}

//add z-index=1080 to stay on top of bootstrap styles elements
export const showAlert = (type, msg, msecs=5000) => {
    hideAlert();

    const markUp = 
    `<div class="alert alert-${type} alert-dismissible fade show" style="z-index:1080">
        ${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    document.querySelector('.messages').insertAdjacentHTML('afterbegin', markUp);;

    window.setTimeout(hideAlert, msecs);
}

export const removeAlerts = (msecs=1000) => {
    window.setTimeout(hideAlert, msecs);
}
