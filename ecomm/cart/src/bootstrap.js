import faker from 'faker';

const mount = (el) => {
    const cartText = `<div>You have ${faker.random.number()} items in your cart`

    el.innerHTML = cartText;
}

// Context/Situation #1
// We are running this file in development in isolation
// We are using our local index.html file
// Which DEFINITELY has an element with an id of 'dev-products'
// We want to immediately render our app into that element
if (process.env.NODE_ENV === 'development'){
    const el = document.querySelector('#cart-dev');

    // Assuming our container doesn't have an element
    // With id 'dev-products'....
    if(el){
        // We are probably running in isolation
        mount(el);
    }
}

// Context/Situation #2
// We are running this file in the development or production
// through the CONTAINER app
// NO GURANTEE that an element with an id of 'dev-products' may exists
// WE DO NOT WANT try to immediately render the app
export { mount };