
const wedding_date = new Date('March 7, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = wedding_date - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('days').innerText = days > 0 ? days : 0;
}

function setActive(){
    const navItems = document.querySelectorAll('.nav-item li');
    navItems.forEach(item => item.addEventListener('click', function(){
        const isActive = document.querySelector('.nav-item li.active');
        if(isActive) isActive.classList.remove('active');

        this.parentElement.classList.add('active');
    }))
    // navItems.forEach(item => item.classList.remove('active'));
    // element.parentElement.classList.add('active');
}

updateCountdown();
setInterval(updateCountdown, 1000);


