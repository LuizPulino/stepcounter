let stepCount = 0;
let isCounting = false;
let watchId;

const stepCountElement = document.getElementById('stepCount');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', toggleStepCounter);

function toggleStepCounter() {
    isCounting = !isCounting;
    toggleButton.textContent = isCounting ? 'Stop Counting' : 'Start Counting';
    if (isCounting) {
        startCounting();
    } else {
        stopCounting();
    }
}

function startCounting() {
    if (window.DeviceMotionEvent) {
        watchId = window.addEventListener('devicemotion', handleMotionEvent, true);
    } else {
        alert('Device Motion API not supported');
    }
}

function stopCounting() {
    window.removeEventListener('devicemotion', handleMotionEvent, true);
}

function handleMotionEvent(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (acceleration) {
        const totalAcceleration = Math.sqrt(
            acceleration.x * acceleration.x +
            acceleration.y * acceleration.y +
            acceleration.z * acceleration.z
        );
        if (totalAcceleration > 15) { // Threshold for detecting a step
            stepCount++;
            stepCountElement.textContent = stepCount;
        }
    }
}
