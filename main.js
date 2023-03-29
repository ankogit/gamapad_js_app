import './style.css';

import { toAnimate, animate } from './particles.js';

// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';
// import gamepad from './gamepad.js';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector('#counter'));

const haveEvents = 'ongamepadconnected' in window;
const hud = document.getElementById('hud');
const cat = document.getElementById('cat');
let catTop = cat.style.top;
let catLeft = cat.style.left;

const rainbow = document.getElementById('rainbow');
let rainbowTop = rainbow.style.top + 40;
let rainbowLeft = rainbow.style.left - 1400;

const controllers = [];

function connecthandler(e) {
	addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
	controllers[gamepad.index] = gamepad;

	const d = document.createElement('div');
	d.setAttribute('id', `controller${gamepad.index}`);

	const b = document.createElement('div');
	b.className = 'buttons';
	gamepad.buttons.forEach((button, i) => {
		const e = document.createElement('kbd');
		e.className = 'button';
		e.textContent = i;
		b.appendChild(e);
	});

	d.appendChild(b);
	hud.appendChild(d);

	// const a = document.createElement('div');
	// a.className = 'axes';

	// gamepad.axes.forEach((axis, i) => {
	// 	const p = document.createElement('progress');
	// 	p.className = 'hud-buttons';
	// 	p.setAttribute('max', '2');
	// 	p.setAttribute('value', '1');
	// 	p.textContent = i;
	// 	a.appendChild(p);
	// });

	// d.appendChild(a);

	// See https://github.com/luser/gamepadtest/blob/master/index.html
	const start = document.getElementById('start');
	if (start) {
		start.style.display = 'none';
	}

	document.body.appendChild(d);
	requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
	removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
	const d = document.getElementById(`controller${gamepad.index}`);
	document.body.removeChild(d);
	delete controllers[gamepad.index];
}

function updateStatus() {
	if (!haveEvents) {
		scangamepads();
	}

	controllers.forEach((controller, i) => {
		const d = document.getElementById(`controller${i}`);
		const buttons = d.getElementsByClassName('button');

		controller.buttons.forEach((button, i) => {
			const b = buttons[i];
			let pressed = button === 1.0;
			let val = button;

			if (typeof button === 'object') {
				pressed = val.pressed;
				val = val.value;
			}

			const pct = `${Math.round(val * 100 + 10)}%`;
			b.style.opacity = `${pct}`;
			b.className = pressed ? 'button button-pressed' : 'button';
			if (pressed) {
				controller.vibrationActuator.playEffect('dual-rumble', {
					startDelay: 0,
					duration: 10,
					weakMagnitude: 0,
					strongMagnitude: 0.1,
				});
				if (i == 0) {
					toAnimate.forEach(animate);
				}
			}
		});

		const output = document.getElementById('hud');
		output.innerHTML = ''; // clear the output
		controller.axes.forEach((axis, i) => {
			//       const a = axesClasses[i];
			//       console.log(controller)

			//       a.textContent = `${i}: ${controller.axes.toFixed(4)}`;
			//       a.setAttribute("value", controller.axes + 1);
			// output.insertAdjacentHTML(
			// 	'beforeend',
			// 	`<label>${i}
			//        <progress value=${axis * 0.5 + 0.5}></progress>
			//      </label>`
			// );
			if (i === 0) {
				if (axis > 0.4) {
					catLeft++;
					cat.style.left = `${catLeft}px`;

					rainbowLeft++;
					rainbow.style.left = `${rainbowLeft}px`;
				}
				if (axis < -0.4) {
					catLeft--;
					cat.style.left = `${catLeft}px`;

					rainbowLeft--;
					rainbow.style.left = `${rainbowLeft}px`;
				}
			}

			if (i === 1) {
				if (axis > 0.4) {
					catTop++;
					cat.style.top = `${catTop}px`;

					rainbowTop++;
					rainbow.style.top = `${rainbowTop}px`;
				}
				if (axis < -0.4) {
					catTop--;
					cat.style.top = `${catTop}px`;

					rainbowTop--;
					rainbow.style.top = `${rainbowTop}px`;
				}
				// cat.style.top = `${axis * 20}px`;
			}
			// ball.style.left = `${a * 2}px`;
			//   ball.style.top = `${b * 2}px`;
		});
		// for (const [index, axis] of gamepad.axes.entries()) {

		//   }
	});

	requestAnimationFrame(updateStatus);
}

function scangamepads() {
	const gamepads = navigator.getGamepads();
	for (const gamepad of gamepads) {
		if (gamepad) {
			// Can be null if disconnected during the session
			if (gamepad.index in controllers) {
				controllers[gamepad.index] = gamepad;
			} else {
				addgamepad(gamepad);
			}
		}
	}
}

window.addEventListener('gamepadconnected', connecthandler);
window.addEventListener('gamepaddisconnected', disconnecthandler);

if (!haveEvents) {
	setInterval(scangamepads, 500);
}
