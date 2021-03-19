let imgDark = document.querySelector('.img-dark'),
	imglight = document.querySelector('.img-light'),
	sun = document.querySelector('.sun'),
	moon = document.querySelector('.moon'),
	modalBack = document.querySelector('.modal-back'),
	light = document.querySelector('.light'),
	dark = document.querySelector('.dark'),
	newTodo = document.querySelector('#new-todo'), 
  input = document.querySelector('input'),
	gr = document.querySelector('.gr-new'),
	typing = document.querySelector('.typing'),
	ul = document.querySelector('ul'), 
	active = document.querySelector('#active'),
	all= document.querySelector('#all'),
	compl = document.querySelector('#compl'),
  clear = document.querySelector('#clear'),
	items = document.querySelector('.items'),
  allItems = document.querySelector('.all-items'),
	activeItems = document.querySelector('.active-items'),
	complItems = document.querySelector('.compl-items'),
	dropElem = document.querySelector('.end'),
	dragElem = document.querySelector('.drag');

let countAll = 0, li, todo, section, div, button, list, check, countLeft, countCompl;

document.querySelector('link[href="light.css"]').href = 'dark.css';

function toggleDark() { 
	modalBack.classList.toggle('mod-back');
}
function toggleLight() { 
	modalBack.classList.toggle('mod-back');
	document.querySelector('link[href="dark.css"]').href = 'light.css';
	imgDark.classList.add('h');
	imglight.classList.remove('h');
	sun.classList.add('h');
	moon.classList.remove('h');
}

function toLocal() {
	list = ul.innerHTML;
	localStorage.setItem('list', list);
	localStorage.setItem('cl', countLeft);
	localStorage.setItem('cc', countCompl);
} 
toggleDark();
dark.addEventListener('click', toggleDark); 
light.addEventListener('click', toggleLight);		

if (localStorage.getItem('list')) {
	ul.innerHTML = localStorage.getItem('list');
	countLeft = Number(localStorage.getItem('cl', countLeft));
	countCompl = Number(localStorage.getItem('cc', countCompl));
}	else {
	countLeft = 0;
	countCompl = 0;
}	
if (countLeft) {items.innerHTML = countLeft}

newTodo.addEventListener('click',function() {
	newTodo.classList.toggle('circle-todo');
	gr.classList.toggle('h');
	typing.classList.toggle('h');
	input.focus();
});

input.addEventListener('keypress',function(event) {
	if (event.keyCode === 13) {
		countLeft++;
		if (countLeft) {
			items.innerHTML = countLeft;
		}
		allItems.innerHTML = '';
		complItems.innerHTML = '';
		activeItems.innerHTML = '';
		newTodo.classList.toggle('circle-todo');
		gr.classList.toggle('h');
		typing.classList.toggle('h');
		li = document.createElement('li');
		todo = document.createElement('input');
		todo.type = 'button';
		div = document.createElement('div');
		section = document.createElement('section');
		button = document.createElement('button');
		li.classList.add('block-bb');
		div.classList.add('circle');
		section.classList.add('d-flex');
		todo.classList.add('pad','bright');
		todo.value = this.value;
		section.append(div, todo);
		button.classList.add('g-button', 'h');
		button.innerHTML = '\u00d7';
		this.value = '';
		this.blur();
		ul.appendChild(li).append(section, button);
	}
});

ul.addEventListener('click', function func(event) {
	
	if (event.target.tagName === 'DIV') {	
		event.target.classList.add('border-blue');
		active.classList.add('bright');
		activeItems.innerHTML = '';
		if (!event.target.classList.contains('check-back')) {
			event.target.parentElement.nextElementSibling.classList.remove('h');        
		}

	} else if (event.target.tagName === 'INPUT') {
		event.target.classList.remove('bright');
		event.target.classList.add('to-compl');
		compl.classList.add('bright');
		clear.classList.add('bright');
		event.target.disabled = true;
		event.target.parentElement.nextElementSibling.classList.add('h');
    check = document.createElement('img');
    check.src = './images/icon-check.svg';
    check.classList.add('check');
    event.target.previousElementSibling.appendChild(check);
    event.target.previousElementSibling.classList.add('check-back');
		countLeft--;
		countCompl++;
		if(countLeft) {
			items.innerHTML = countLeft;
		} else {
			items.innerHTML = '';
		}
		complItems.innerHTML = '';
		activeItems.innerHTML = '';
		allItems.innerHTML = '';

	} else if (event.target.tagName === 'BUTTON') {
		event.target.parentNode.remove();
		if (!event.target.parentElement.firstElementChild.firstElementChild.classList.contains('check-back')) {
			countLeft--;
			if(countLeft) {
				items.innerHTML = countLeft;
			} else {
				items.innerHTML = '';
			}
		}
		activeItems.innerHTML = '';	
	}
})

all.addEventListener('click', function() {
	countAll = countLeft + countCompl;
	if(countAll) {
		allItems.innerHTML = countAll;
		} else {
		allItems.innerHTML = '';
	}
})



active.addEventListener('click', function() {
	let elems = document.querySelectorAll('.border-blue');
	let i = elems.length;
	let j = 0;
	if (i) {
		for (let elem of elems) {
			if(!elem.classList.contains('check-back')) j++
		}
		if (j) {
			activeItems.innerHTML = j;
		} else {
			activeItems.innerHTML = '';
			active.classList.remove('bright');
		}	
	} else {
		active.classList.remove('bright');
		activeItems.innerHTML = '';
	}	
})

compl.addEventListener('click', function () {
	if(countCompl) {
		complItems.innerHTML = countCompl;
		} else {
		complItems.innerHTML = '';
	}
})

clear.addEventListener('click', function () {
	let elems = document.querySelectorAll('.to-compl');
	for (let elem of elems) {
		elem.parentNode.parentNode.remove();
	}	
	compl.classList.remove('bright');
	clear.classList.remove('bright');
	countCompl = 0;
	complItems.innerHTML = '';
	allItems.innerHTML = '';
})

dropElem.addEventListener('dragover', function(event) {
	event.preventDefault();
})
dropElem.addEventListener('drop', toLocal); 



