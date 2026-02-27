const wedding_date = new Date('March 16, 2026 00:00:00').getTime();

function updateCountdown() {
    const daysElement = document.getElementById('days');
    if (!daysElement) return;

    const now = new Date().getTime();
    const distance = wedding_date - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    daysElement.innerText = days > 0 ? days : 0;
}

function setActive() {
    const navItems = document.querySelectorAll('.navbar-nav .nav-item a');
    navItems.forEach(item => item.addEventListener('click', function() {
        const isActive = document.querySelector('.navbar-nav .nav-item.active');
        if (isActive) isActive.classList.remove('active');
        this.parentElement.classList.add('active');
    }));
}

updateCountdown();
setInterval(updateCountdown, 1000);
setActive();