import {Product} from '@/types/ProductTypes';
import {productPreview} from '@/types/ProductTypes';

import { categories } from '@/types/UserTypes';

import { db as firebaseDatabase } from '@/firebase/firebase';
import { getDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';


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

