// const gamepads = {};

// function gamepadHandler(event, connecting) {
//   const gamepad = event.gamepad;
//   // Note:
//   // gamepad === navigator.getGamepads()[gamepad.index]

//   if (connecting) {
//     console.log("connecting")
//     gamepads[gamepad.index] = gamepad;
//   } else {
//     console.log("disconnecting")
//     delete gamepads[gamepad.index];
//   }
// }

// window.addEventListener(
//   "gamepadconnected",
//   (e) => {
//     gamepadHandler(e, true);
//   },
//   false
// );
// window.addEventListener(
//   "gamepaddisconnected",
//   (e) => {
//     gamepadHandler(e, false);
//   },
//   false
// );

// let gamepadIndex;
// window.addEventListener('gamepadconnected', (event) => {
// 	gamepadIndex = event.gamepad.index;
// });

// setInterval(() => {
// 	if(gamepadIndex !== undefined) {
// 		// a gamepad is connected and has an index
// 		const myGamepad = navigator.getGamepads()[gamepadIndex];
// 		document.body.innerHTML = ""; // reset page
// 		myGamepad.buttons.map(e => e.pressed).forEach((isPressed, buttonIndex) => {
// 			if(isPressed) {
// 				// button is pressed; indicate this on the page
// 				document.body.innerHTML += `<h1>Button ${buttonIndex} is pressed</h1>`;
// 			}
// 		})

//     myGamepad.axes.map(e => (e != 0)).forEach((a, axesIndex) => {
// 				// button is pressed; indicate this on the page

//         console.log(a, axesIndex );
// 	// console.log(`Right stick at (${myGamepad.axes[2]}, ${myGamepad.axes[3]})` );
// 				// document.body.innerHTML += `<h1>Button ${buttonIndex} is pressed</h1>`;
// 		})

// 	}
// }, 100)

// const gamepadInfo = document.getElementById("gamepad-info");
// const ball = document.getElementById("ball");
// let start;
// let a = 0;
// let b = 0;

// function buttonPressed(b) {
//   if (typeof b === "object") {
//     console.log("pressed");
//     return b.pressed;
//   }
//   return b === 1.0;
// }

// function gameLoop() {
//   const gamepads = navigator.getGamepads();
//   if (!gamepads) {
//     return;
//   }

//   const gp = gamepads[0];
//   if (buttonPressed(gp.buttons[12])) {
//     b--;
//   } else if (buttonPressed(gp.buttons[13])) {
//     b++;
//   }
//   if (buttonPressed(gp.buttons[15])) {
//     a++;
//   } else if (buttonPressed(gp.buttons[14])) {
//     a--;
//   }

//   ball.style.left = `${a * 2}px`;
//   ball.style.top = `${b * 2}px`;

//   start = requestAnimationFrame(gameLoop);
// }

// window.addEventListener("gamepadconnected", (e) => {
//   const gp = navigator.getGamepads()[e.gamepad.index];
//   gamepadInfo.textContent = `Gamepad connected at index ${gp.index}: ${gp.id}. It has ${gp.buttons.length} buttons and ${gp.axes.length} axes.`;

//   gameLoop();
// });
