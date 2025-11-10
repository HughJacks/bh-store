import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Fetch the "trough" product from Shopify
		// You'll need to create a product in Shopify with the handle "trough"
		const product = await getProductByHandle('trough', fetch);

		return {
			product
		};
	} catch (error) {
		console.error('Error loading product:', error);
		return {
			product: null
		};
	}
};

// Inline the function to use SvelteKit's fetch
async function getProductByHandle(handle: string, fetch: typeof globalThis.fetch) {
	const { PUBLIC_SHOPIFY_STORE_DOMAIN, PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN, PUBLIC_SHOPIFY_API_VERSION } = await import('$env/static/public');
	
	const SHOPIFY_URL = `https://${PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${PUBLIC_SHOPIFY_API_VERSION || '2025-10'}/graphql.json`;
	
	const query = `
		query getProductByHandle($handle: String!) {
			product(handle: $handle) {
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
							quantityAvailable
							price {
								amount
								currencyCode
							}
						}
					}
				}
			}
		}
	`;

	const response = await fetch(SHOPIFY_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
		},
		body: JSON.stringify({ query, variables: { handle } })
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Shopify API error (${response.status}): ${text}`);
	}

	const json = await response.json();

	if (json.errors) {
		throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
	}

	return json.data.product;
}

