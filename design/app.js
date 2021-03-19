let bg = document.querySelector('.bg')
    imgDark = bg.querySelector('.img-dark')
    imgLight = bg.querySelector('.img-light')
    sun = document.querySelector('.sun')
    moon = document.querySelector('.moon')

    newTodo = document.querySelector('#new-todo') 
	input = document.querySelector('input')
	gr = document.querySelector('.gr-new')
	typing = document.querySelector('.typing')
	ul = document.querySelector('ul') 
    left = document.querySelector('#left')
    all = document.querySelector('#all')
    active = document.querySelector('#active')
    compl = document.querySelector('#compl')
    clear = document.querySelector('#clear')
	items = document.querySelector('.items')
    allItems = document.querySelector('.all-items')
    activeItems = document.querySelector('.active-items')
    check = document.querySelector('.check')
	let li, span, div, button, list 

function toLocal() {
	list = ul.innerHTML
	localStorage.setItem('list', list)
} 		

if (localStorage.getItem('list')) {
	ul.innerHTML = localStorage.getItem('list')
 }		

newTodo.addEventListener('click',function() {
	newTodo.classList.toggle('ccc')
	gr.classList.toggle('h')
	typing.classList.toggle('h')
	input.focus()
})

input.addEventListener('keypress',function(event) {
	if (event.keyCode === 13) {	
		newTodo.classList.toggle('ccc')
		gr.classList.toggle('h')
		typing.classList.toggle('h')
		li = document.createElement('li')
		span = document.createElement('span')
		div = document.createElement('div')
		button = document.createElement('button')
		li.classList.add('block', 'bb')
		div.classList.add('circle')
		span.classList.add('gr')
		span.innerHTML = this.value
		button.classList.add('g')
		button.innerHTML = '\u00d7'
		this.value = ''
		this.blur()
		ul.appendChild(li).append(div, span, button)
	}
})


ul.addEventListener('click', function(event) {
	
	if (event.target.tagName === 'DIV') {	
			event.target.classList.toggle('cc')

		}	else if (event.target.tagName === 'SPAN') {
			event.target.classList.toggle('to-compl')

			} else if (event.target.tagName === 'BUTTON') {
			event.target.parentNode.remove()
	}
})	


all.addEventListener('click', function() {
	all.classList.toggle('all-blue')
	let elems = document.querySelectorAll('.gr')
	let i = 0
	for (let elem of elems) {
			elem.previousElementSibling.classList.toggle('allc')
			i++
	}
	allItems.innerHTML = i
})

left.addEventListener('click', function() {
	left.classList.toggle('hov')
	let elems = document.querySelectorAll('.gr')
	let i = 0
	for (let elem of elems) {
		if (!elem.classList.contains('to-compl')) {
			elem.classList.toggle('hov')
			elem.previousElementSibling.classList.toggle('cccc')
			i++
		}	
	}
	items.innerHTML = i
})


active.addEventListener('click', function() {
	active.classList.toggle('hov')
	let elems = document.querySelectorAll('.cc')
	let i = 0
	for (let elem of elems) {
			elem.nextElementSibling.classList.toggle('hov')
			elem.classList.toggle('tog')
			i++
	}
	activeItems.innerHTML = i
})

compl.addEventListener('click', completed) 

clear.addEventListener('click', function clearCompl() {
	let elems = document.querySelectorAll('.to-compl')
	for (let elem of elems) {
		elem.parentNode.remove()
		
	}	
	compl.addEventListener('click', completed)	
})
function completed() {
	let elems = document.querySelectorAll('.to-compl')
	let i = 0
	for (let elem of elems) {
		elem.previousElementSibling.appendChild(check.cloneNode(false))
		elem.previousElementSibling.classList.toggle('blue')
		i++
	}
	compl.removeEventListener('click', completed)
}

let dropElem = document.querySelector('.sss')
let dragElem = document.querySelector('.drag')

	
dropElem.addEventListener('dragover', function(event) {
	event.preventDefault()
})
dropElem.addEventListener('drop', function() {
	compl.removeEventListener('click', completed)
 	toLocal()
})
