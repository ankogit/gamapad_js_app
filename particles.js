import anime from 'animejs/lib/anime.es.js';

let maxElements = 10;
let duration = 2500;
export let toAnimate = [];
let radius =
	window.innerWidth < window.innerHeight
		? window.innerWidth
		: window.innerHeight;
let distance = radius / 4 <= 150 ? 150 : radius / 4;

function removeAnimation(animation) {
	let index = animations.indexOf(animation);
	if (index > -1) animations.splice(index, 1);
}

let createElements = (function () {
	let fragment = document.createDocumentFragment();
	for (let i = 0; i < maxElements; i++) {
		let el = document.createElement('div');
		el.classList.add('particule');
		//el.style.color = colors[anime.random(0, 3)];
		toAnimate.push(el);
		fragment.appendChild(el);
	}
	document.getElementsByClassName('cat')[0].appendChild(fragment);
})();

export let animate = function (el, i) {
	let angle = Math.random() * Math.PI * 2;
	anime({
		targets: el,
		translateX: [0, Math.cos(angle) * distance],
		translateY: [0, Math.sin(angle) * distance],
		scale: [
			{ value: [0, 1], duration: 400, easing: 'easeOutBack' },
			{
				value: 0,
				duration: 400,
				delay: duration - 800,
				easing: 'easeInBack',
			},
		],
		offset: (duration / maxElements) * i,
		duration: duration,
		easing: 'easeOutSine',
		loop: 1,
	});
};

// module.exports = toAnimate;
