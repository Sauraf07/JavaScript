
let heading = document.createElement('h1');
heading.innerText = ' My portfolio website';
heading.className = 'text-center text-primary';

let container = document.createElement('div');
container.className = 'container mt-5';

let button = document.createElement('button');
button.innerText = 'Change Bcakground';
button.className = 'btn btn-primary d-block mx-auto mb-3';

button.onclick = function(){
    document.body.style.backgroundColor = 'lightblue';
}

let img = document.createElement('img');
img.src = 'https://plantsguru.com/cdn/shop/files/Rose_Baby_Pink.jpg?v=1758804477&width=535/100';
img.className = 'd-block mx-auto mb-3 size w-50 h-auto';
container.appendChild(heading);
container.appendChild(img);
container.appendChild(button);



document.body.appendChild(container);