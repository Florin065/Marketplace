import {Product} from '@/types/ProductTypes';
import {productPreview, Reviews} from '@/types/ProductTypes';

import { categories } from '@/types/UserTypes';

import { db as firebaseDatabase } from '@/firebase/firebase';
import { getDoc, doc, getDocs, collection, query, where, setDoc } from 'firebase/firestore';

import {auth} from '@/firebase/firebase';
import { Notify } from 'quasar';

/*
 * Function that fetches a product from the database
*/ 
export async function getProductDetails(SKU: string, category: string): Promise<Product> {
    const response = await getDoc(doc(firebaseDatabase, `products/${category}/items`, SKU));
    return response.data() as Product;
}

/*
 * Function that fetches all productsPreviews from the database
*/
export async function getProductsPreview(): Promise<productPreview[]> {
    const products: productPreview[] = [];
    await Promise.all(categories.map(async (category) => {
        const querySnapshot = await getDocs(collection(firebaseDatabase, 'products', category, 'previews'));
        querySnapshot.forEach((doc) => {
            const product = doc.data() as productPreview;
            products.push(product);
        });
    }));


    return products ;
}

export function getUserID() {
    return auth.currentUser?.uid;
}

/*
 * Function that adds a product to the cart
*/
export const addedToCart = () => {
    if(getUserID() !== undefined ) {
        // TODO: Send to the user cart in database
        Notify.create({
            message: 'Produsul a fost adaugat in cos!',
            color: 'positive',
            position: 'top',
            timeout: 2000
        });
    } else {
        Notify.create({
            message: 'Trebuie sa va logati pentru a adauga produse in cos!',
            color: 'negative',
            position: 'top',
            timeout: 2000
        });
    }
}

/*
* Function that adds a review to a product
* @param SKU - the SKU of the product
* @param category - the category of the product
* @param review - the review to be added
* @param stars - the number of stars given to the product
*/
export async function addReview(SKU: string, category: string, review: Reviews, stars: number) {
    try {
        const product = await getProductDetails(SKU, category);
        product.reviews.comments.push(review);

        product.reviews.stars[stars - 1] += 1;

        product.reviews.averageRating = product.reviews.comments.reduce((acc, review) => acc + review.rating, 0) / product.reviews.comments.length;

        // Update the product in the database
        await setDoc(doc(firebaseDatabase, `products/${category}/items`, SKU), product);
        // TODO: Add review to current user when users are done
        Notify.create({
            message: 'Recenzia a fost adaugata cu succes!',
            color: 'positive',
            position: 'top',
            timeout: 2000
        });
    } catch (error) {
        console.log(error);
        Notify.create({
            message: 'Something went wrong. Try again!',
            color: 'negative',
            position: 'top',
            timeout: 2000
        });
    }
    
}
