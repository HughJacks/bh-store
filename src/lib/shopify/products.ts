import { shopifyFetch } from './client';
import type { ShopifyProduct } from './types';

const PRODUCT_FRAGMENT = `
	id
	handle
	title
	description
	descriptionHtml
	availableForSale
	priceRange {
		minVariantPrice {
			amount
			currencyCode
		}
	}
	images(first: 20) {
		edges {
			node {
				url
				altText
				width
				height
			}
		}
	}
	variants(first: 10) {
		edges {
			node {
				id
				title
				availableForSale
				price {
					amount
					currencyCode
				}
			}
		}
	}
`;

export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
	const query = `
		query getProducts($first: Int!) {
			products(first: $first) {
				edges {
					node {
						${PRODUCT_FRAGMENT}
					}
				}
			}
		}
	`;

	const response = await shopifyFetch<{
		products: {
			edges: Array<{ node: ShopifyProduct }>;
		};
	}>({
		query,
		variables: { first }
	});

	return response.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
	const query = `
		query getProductByHandle($handle: String!) {
			product(handle: $handle) {
				${PRODUCT_FRAGMENT}
			}
		}
	`;

	const response = await shopifyFetch<{
		product: ShopifyProduct | null;
	}>({
		query,
		variables: { handle }
	});

	return response.product;
}

