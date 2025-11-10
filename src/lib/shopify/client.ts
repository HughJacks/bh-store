import {
	PUBLIC_SHOPIFY_STORE_DOMAIN,
	PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
	PUBLIC_SHOPIFY_API_VERSION
} from '$env/static/public';

// Validate environment variables
if (!PUBLIC_SHOPIFY_STORE_DOMAIN) {
	throw new Error('PUBLIC_SHOPIFY_STORE_DOMAIN is not set in .env file');
}
if (!PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
	throw new Error('PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set in .env file');
}

const SHOPIFY_URL = `https://${PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${PUBLIC_SHOPIFY_API_VERSION || '2025-10'}/graphql.json`;

export async function shopifyFetch<T>({
	query,
	variables = {}
}: {
	query: string;
	variables?: Record<string, any>;
}): Promise<T> {
	const response = await fetch(SHOPIFY_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
		},
		body: JSON.stringify({ query, variables })
	});

	if (!response.ok) {
		throw new Error(`Shopify API error: ${response.statusText}`);
	}

	const json = await response.json();

	if (json.errors) {
		throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
	}

	return json.data;
}

