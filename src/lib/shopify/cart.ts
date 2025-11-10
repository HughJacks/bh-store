import { shopifyFetch } from './client';
import type { ShopifyCart } from './types';

const CART_FRAGMENT = `
	id
	checkoutUrl
	cost {
		totalAmount {
			amount
			currencyCode
		}
		subtotalAmount {
			amount
			currencyCode
		}
	}
	lines(first: 100) {
		edges {
			node {
				id
				quantity
				merchandise {
					... on ProductVariant {
						id
						title
						product {
							title
							handle
							images(first: 1) {
								edges {
									node {
										url
										altText
									}
								}
							}
						}
						price {
							amount
							currencyCode
						}
					}
				}
			}
		}
	}
	attributes {
		key
		value
	}
`;

export async function createCart(): Promise<ShopifyCart> {
	const query = `
		mutation cartCreate {
			cartCreate {
				cart {
					${CART_FRAGMENT}
				}
			}
		}
	`;

	const response = await shopifyFetch<{
		cartCreate: {
			cart: ShopifyCart;
		};
	}>({ query });

	return response.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart> {
	const query = `
		query getCart($cartId: ID!) {
			cart(id: $cartId) {
				${CART_FRAGMENT}
			}
		}
	`;

	const response = await shopifyFetch<{
		cart: ShopifyCart;
	}>({
		query,
		variables: { cartId }
	});

	return response.cart;
}

export async function addToCart(
	cartId: string,
	merchandiseId: string,
	quantity: number = 1
): Promise<ShopifyCart> {
	const query = `
		mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
			cartLinesAdd(cartId: $cartId, lines: $lines) {
				cart {
					${CART_FRAGMENT}
				}
			}
		}
	`;

	const response = await shopifyFetch<{
		cartLinesAdd: {
			cart: ShopifyCart;
		};
	}>({
		query,
		variables: {
			cartId,
			lines: [
				{
					merchandiseId,
					quantity
				}
			]
		}
	});

	return response.cartLinesAdd.cart;
}

export async function updateCartLine(
	cartId: string,
	lineId: string,
	quantity: number
): Promise<ShopifyCart> {
	const query = `
		mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
			cartLinesUpdate(cartId: $cartId, lines: $lines) {
				cart {
					${CART_FRAGMENT}
				}
			}
		}
	`;

	const response = await shopifyFetch<{
		cartLinesUpdate: {
			cart: ShopifyCart;
		};
	}>({
		query,
		variables: {
			cartId,
			lines: [
				{
					id: lineId,
					quantity
				}
			]
		}
	});

	return response.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
	const query = `
		mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
			cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
				cart {
					${CART_FRAGMENT}
				}
			}
		}
	`;

	const response = await shopifyFetch<{
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	}>({
		query,
		variables: {
			cartId,
			lineIds: [lineId]
		}
	});

	return response.cartLinesRemove.cart;
}

