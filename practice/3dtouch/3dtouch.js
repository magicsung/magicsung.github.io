var element = document.getElementById('forceMe');
var forceValueOutput = document.getElementById('forceValue');
var hiddenText = document.getElementById('hidden-text');
var touch = null;

addForceTouchToElement(element);

function onTouchStart(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchMove(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  touch = null;
}

function checkForce(e) {
  touch = e.touches[0];
  setTimeout(refreshForceValue.bind(touch), 10);
}

function checkMacForce(e) {
  // max value for trackpad is 3.0 compare to 1.0 on iOS
  renderElement(e.webkitForce/3);
}

function refreshForceValue() {
  var touchEvent = this;
  var forceValue = 0;
  if(touchEvent) {
    forceValue = touchEvent.force || 0;
    setTimeout(refreshForceValue.bind(touch), 10);
  }else{
    forceValue = 0;
  }

  renderElement(forceValue);
}

function renderElement(forceValue) {
  element.style.webkitTransform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue * 1) + ')';
  forceValueOutput.innerHTML = forceValue.toFixed(4) * 100 + '%';
  if (forceValue.toFixed(4) > 0.5) {
    hiddenText.style.opacity = 1;
  } else {
    hiddenText.style.opacity = 0;
  }
}

function addForceTouchToElement(elem) {
  elem.addEventListener('touchstart', onTouchStart, false);
  elem.addEventListener('touchmove', onTouchMove, false);
  elem.addEventListener('touchend', onTouchEnd, false);
  elem.addEventListener('webkitmouseforcewillbegin', checkMacForce, false);
  elem.addEventListener('webkitmouseforcechanged', checkMacForce, false);
}
