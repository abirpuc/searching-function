// const url = 'https://fakestoreapi.com/products';

// data load using asyncronious method
const loadallProduct = async() => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

const loadCategoryMenu = async() => {
//    loadallProduct()
//    .then(data => console.log(data));

    const menuItem = document.getElementById('all-category');
    const unique = [];

    const datas = await loadallProduct();
    for(const data of datas){
        const liContent = document.createElement('li');
       
        const product = data.category;
        if(unique.indexOf(product) === -1){
            unique.push(product);
            liContent.innerHTML = `
            <a>${product}</a>
            `;
            menuItem.appendChild(liContent);
        }
       
    }
    
}

loadCategoryMenu();
// loadallProduct();
const searchValue = document.getElementById('searchField')
addEventListener('keypress', async(event)=> {
   if(event.key === 'Enter'){
        const allProducts = await loadallProduct();
        // console.log(allProducts);
        const searchItem = searchValue.value;

        const noProduct = document.getElementById('no-product');
        if(searchItem === ''){
            noProduct.classList.remove('hidden');
            return;
        }else{
            noProduct.classList.add('hidden');
        }
        const foundProducts = allProducts.filter(product => product.category.includes(searchItem));
        // console.log(foundProducts);
        const notFound = document.getElementById('not-found');
        if(foundProducts.length == 0){
            notFound.classList.remove('hidden');
            return
        }else{
            notFound.classList.add('hidden');
        }
        const productContainer = document.getElementById('product-container');
       
        productContainer.textContent = "";
        foundProducts.forEach(foundProduct => {
            // console.log(foundProduct);
            // destructure
            const {category, title, image, description} = foundProduct;
            const product = document.createElement('div');
            product.innerHTML =`
            <div class="card card-compact w-full shadow-xl">
                <figure><img src="${image}" class="w-full h-60" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${category}</h2>
                <p>${title.length > 20 ? title.slice(0,20) + ' ...': title}</p>
                <div class="card-actions justify-end">
                    <label for="my-modal-3"onclick="modal('${description}', '${image}')" class="btn btn-primary modal-button"">Details</label>
                </div>
                </div>
            </div>
            `;
            productContainer.appendChild(product);
        });
   }
})

const modal = (description, image) => {
    // console.log(description, image);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${image}" class="w-full h-60">
    <p class="py-4">${description}</p>
    `;
}