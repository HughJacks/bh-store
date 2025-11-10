export interface ShopifyProduct {
	id: string;
	handle: string;
	title: string;
	description: string;
	descriptionHtml: string;
	availableForSale: boolean;
	priceRange: {
		minVariantPrice: {
			amount: string;
			currencyCode: string;
		};
	};
	images: {
		edges: Array<{
			node: {
				url: string;
				altText: string | null;
				width: number;
				height: number;
			};
		}>;
	};
	variants: {
		edges: Array<{
			node: {
				id: string;
				title: string;
				availableForSale: boolean;
				price: {
					amount: string;
					currencyCode: string;
				};
			};
		}>;
	};
}

export interface ShopifyCart {
	id: string;
	checkoutUrl: string;
	cost: {
		totalAmount: {
			amount: string;
			currencyCode: string;
		};
		subtotalAmount: {
			amount: string;
			currencyCode: string;
		};
	};
	lines: {
		edges: Array<{
			node: {
				id: string;
				quantity: number;
				merchandise: {
					id: string;
					title: string;
					product: {
						title: string;
						handle: string;
						images?: {
							edges: Array<{
								node: {
									url: string;
									altText: string | null;
								};
							}>;
						};
					};
					price: {
						amount: string;
						currencyCode: string;
					};
				};
			};
		}>;
	};
	attributes: Array<{
		key: string;
		value: string;
	}>;
}

