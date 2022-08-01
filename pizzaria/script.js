let cart = [];
let modalQtd = 1;
let modalKey;

//Listagem das pizzas
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
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
        //removendo a seleção do tamanho escolhido anteriormente
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        //adicionando a seleção ao tamanho grande
        document.querySelectorAll('.pizzaInfo--size')[2].classList.add('selected');
        
        //selecionando o atributo data-key para identificar a pizza
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        
        //atribuindo a key numa outra variavel para posteriormente usar no carrinho
        modalKey = key;
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
        document.querySelector('.pizzaInfo--actualPrice').innerHTML =`R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`;
        document.querySelectorAll('.pizzaInfo--size').forEach((size, indexSize) => {
            //adicionando os tamanhos das pizza de acordo com o json 
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[indexSize];
        });
    });

        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
    
    //adicionando os campos preenchidos dentro da div
    document.querySelector('.pizza-area').append( pizzaItem );
});

//Eventos do Modal 
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

//adicionando contador de quantidade de pizzas
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQtd > 1) {
        modalQtd--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
});

//seletor de tamanho da pizza
document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
});

//adicionando ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
    //selecionando o tamanho da pizza
    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
    //criando um código (junção do id com o tamanho e um caracter)
    let code = pizzaJson[modalKey].id + '&' + size;
    console.log(`code: ${code}`);

    //verifica se já existe um item adicionado ao carrinho com o mesmo id   
    let key = cart.findIndex((item) => item.code == code)
    
    if(key > -1) {
        //aumenta a quantidade        
        cart[key].qtd += modalQtd;

    } else {
        //adiciona um novo item
         cart.push({
            code,
            id: pizzaJson[modalKey].id,
            size: size,
            qtd: modalQtd
        });
  
    }
 
    closeModal();
    updateCart();
});

function updateCart() {
    //exibir carrinho caso haja itens
    let showCart = document.querySelector('aside');
    document.querySelector('.cart').innerHTML = '';
    if(cart.length > 0) {
        showCart.classList.add('show');

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            //clonando area de informações de cada pizza
            let cartItem = document.querySelector('.cart--item').cloneNode(true);
            
            let nameSize = (cart, index) => {
                if(cart[i].size == 0) {
                    return 'P';
                } else if( cart[i].size == 1 ) {
                    return 'M';
                } else {
                    return 'G';
                }
            }

            //preenchendo informações da pizza
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${nameSize(cart, i)})` ;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qtd > 1) {
                    cart[i].qtd--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++;
                updateCart();
            })

            //cálculo do subtotal por item 
            subtotal += pizzaItem.price * cart[i].qtd;

            //adicionando elemento
            document.querySelector('.cart').append(cartItem);

        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        //preenchendo informações referente a compra
        document.querySelector('.cart--totalitem.subtotal').lastElementChild.innerHTML = `R$${subtotal.toFixed(2).replace('.',',')}`;
        document.querySelector('.cart--totalitem.desconto').lastElementChild.innerHTML = `R$${desconto.toFixed(2).replace('.',',')}`;
        document.querySelector('.cart--totalitem.total.big').lastElementChild.innerHTML = `R$${total.toFixed(2).replace('.',',')}`;

    } else {
        showCart.classList.remove('show');
    }
}