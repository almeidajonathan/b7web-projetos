pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = ` R$ ${item.price.toFixed(2).replace('.',',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.setAttribute('data-key', index);
    
    
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        // console.log(key);
        // console.log(pizzaJson[key]);
        
        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML += pizzaJson[key].price.toFixed(2).replace('.',',');
        
        document.querySelector('.pizzaWindowArea').style.opacity = 0; 
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1; 
        }, 200)
    });
    
    document.querySelector('.pizza-area').append( pizzaItem );
});

