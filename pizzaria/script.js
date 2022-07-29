let modalQtd = 1;

pizzaJson.map((item, index) => {
    //clonando estrutura e preenchendo com as informações de cada pizza
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = ` R$ ${item.price.toFixed(2).replace('.',',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.setAttribute('data-key', index);
    
    //adicionando evento de click para abrir o modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        //reset quantidade de pizza 
        modalQtd = 1;
        //removendo a seleção do tamanho escolhido anteriormente
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        //adicionando a seleção ao tamanho grande
        document.querySelectorAll('.pizzaInfo--size')[2].classList.add('selected');
        
        //selecionando o atributo data-key para identificar a pizza
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        //criando uma animação ao abrir o modal
        document.querySelector('.pizzaWindowArea').style.opacity = 0; 
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1; 
        }, 200);
        
        //preenchendo o modal com as informações da pizza selecionada
        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML += pizzaJson[key].price.toFixed(2).replace('.',',');
        document.querySelectorAll('.pizzaInfo--size').forEach((size, indexSize) => {
            //adicionando os tamanhos das pizza de acordo com o json 
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[indexSize];
        });
    });

        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
    
    //adicionando os campos preenchidos dentro da div
    document.querySelector('.pizza-area').append( pizzaItem );
});

