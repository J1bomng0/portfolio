// ==============================
// Social Bar Positioning
// ==============================

const bar = document.querySelector('#social-bar');
const start = document.querySelector('#bar-start');
const dock = document.querySelector('#bar-dock');

const gap = 24;

function positionBar() {
    const initial = start.getBoundingClientRect();
    const target = dock.getBoundingClientRect();

    const floatingTop = window.innerHeight - gap - bar.offsetHeight;

    // Move the same DOM element, never clone it.
    if (
        target.top <= floatingTop ||
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
    ) {
        if (bar.parentElement !== dock) {
            dock.append(bar);
        }

        bar.className = 'social-bar docked';

    } else {
        if (bar.parentElement !== start) {
            start.append(bar);
        }

        bar.className = initial.top <= floatingTop
            ? 'social-bar floating'
            : 'social-bar';
    }
}

let pending = false;

function schedulePosition() {
    if (pending) {
        return;
    }

    pending = true;

    requestAnimationFrame(() => {
        positionBar();
        pending = false;
    });
}

window.addEventListener('scroll', schedulePosition, { passive: true });
window.addEventListener('resize', schedulePosition);
window.addEventListener('load', positionBar);

positionBar();


// ==============================
// Project Tabs
// ==============================

const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(tab) {
    tabs.forEach(t => {
        const selected = t === tab;

        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;

        document.getElementById(
            t.getAttribute('aria-controls')
        ).hidden = !selected;
    });

    schedulePosition();
}

tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        activateTab(tab);
    });

    tab.addEventListener('keydown', e => {
        let next;

        if (e.key === 'ArrowRight') {
            next = (i + 1) % tabs.length;

        } else if (e.key === 'ArrowLeft') {
            next = (i - 1 + tabs.length) % tabs.length;

        } else if (e.key === 'Home') {
            next = 0;

        } else if (e.key === 'End') {
            next = tabs.length - 1;

        } else {
            return;
        }

        e.preventDefault();

        activateTab(tabs[next]);
        tabs[next].focus();
    });
});


// ==============================
// Clock and Date
// ==============================

function updateClock() {
    const now = new Date();

    document.querySelector('#clock').textContent =
        now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });

    document.querySelector('#date').textContent =
        now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        }).replaceAll(' ', '-');
}

updateClock();

setInterval(updateClock, 1000);