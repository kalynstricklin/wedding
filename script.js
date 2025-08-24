
export const wedding_date = new Date('June 20, 2026 00:00:00').getTime();

export const updateCountDown = setInterval(function () {
    const now = new Date().getTime();
    const distance = wedding_date - now;
    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
}, 1000)

