let container = document.createElement('div');
container.className = 'container mt-5';

let heading = document.createElement('h1');
heading.innerText = ' welcome to my java script website';
heading.className = 'text-center text-primary';

let para = document.createElement('p');
para.innerText = 'This is a simple JavaScript website created using DOM manipulation.';
para.className = 'text-center';

let button = document.createElement('button');
button.innerText = 'Click me';
button.className = 'btn btn-primary d-block mx-auto';

button.onclick = function(){
    alert('Button clicked!');
};

container.appendChild(heading);
container.appendChild(para);
container.appendChild(button);

document.body.appendChild(container);