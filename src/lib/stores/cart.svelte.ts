import { createCart, getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from '$lib/shopify/cart';
import type { ShopifyCart } from '$lib/shopify/types';

class CartStore {
	cart = $state<ShopifyCart | null>(null);
	isLoading = $state(false);

	itemCount = $derived(
		this.cart?.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0) || 0
	);

	constructor() {
		// Load cart from localStorage on initialization
		if (typeof window !== 'undefined') {
			this.loadCart();
		}
	}

	async loadCart() {
		const cartId = localStorage.getItem('shopify_cart_id');
		if (cartId) {
			try {
				this.isLoading = true;
				this.cart = await getCart(cartId);
			} catch (error) {
				console.error('Error loading cart:', error);
				// If cart doesn't exist, remove from localStorage
				localStorage.removeItem('shopify_cart_id');
			} finally {
				this.isLoading = false;
			}
		}
	}

	async addToCart(merchandiseId: string, quantity: number = 1) {
		try {
			this.isLoading = true;

			// Create cart if it doesn't exist
			if (!this.cart) {
				this.cart = await createCart();
				localStorage.setItem('shopify_cart_id', this.cart.id);
			}

			// Add item to cart
			this.cart = await addToCartAPI(this.cart.id, merchandiseId, quantity);
		} catch (error) {
			console.error('Error adding to cart:', error);
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async removeFromCart(lineId: string) {
		try {
			if (!this.cart) return;
			
			this.isLoading = true;
			this.cart = await removeFromCartAPI(this.cart.id, lineId);
		} catch (error) {
			console.error('Error removing from cart:', error);
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	openCheckout() {
		if (this.cart?.checkoutUrl) {
			window.location.href = this.cart.checkoutUrl;
		}
	}
}

export const cartStore = new CartStore();

