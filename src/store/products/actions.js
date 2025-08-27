import api from '@/plugins/axios.js';

export const actions = {
  async getProducts({
    page = 1,
    perPage = 9,
    sortBy = 'all',
    filters = {},
  } = {}) {
    this.loading = true;
    try {
      let sortParam = '';
      switch (sortBy) {
        case 'most_expensive':
          sortParam = '-price';
          break;
        case 'cheapest':
          sortParam = 'price';
          break;
        case 'newest':
          sortParam = '-available_on';
          break;
        default:
          sortParam = '';
      }

      const filterParams = {};
      for (const type in filters) {
        if (filters[type].length > 0) {
          filterParams[`filter[options][${type}]`] = filters[type].join(',');
        }
      }

      const response = await api.get('/products', {
        params: {
          include: 'images',
          ...(sortParam && { sort: sortParam }),
          page,
          per_page: perPage,
          ...filterParams,
        },
      });

      this.products = response.data.data;
      this.filterOptions = response.data.meta.filters;
      this.images =
        response.data.included?.filter((item) => item.type === 'image') || [];

      this.products = this.products.map((product) => {
        const imageId = product.relationships.images.data?.[0]?.id;
        const image = this.images.find((img) => img.id === imageId);
        return {
          counter: 0,
          id: product.id,
          ...product.attributes,
          images: image ? image.attributes : [],
        };
      });

      this.totalPages = response.data.meta?.total_pages || 1;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },

  removeFromCart(product) {
    this.cartProducts = this.cartProducts.filter(
      (item) => item.id !== product.id
    );
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  },

  updateCounter(product, newCounter) {
    const foundProduct = this.cartProducts.find((p) => p.id === product.id);
    if (foundProduct) {
      foundProduct.counter = newCounter;
      if (newCounter === 0) {
        this.removeFromCart(product);
      }
    } else {
      this.cartProducts.push({ ...product, counter: newCounter });
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  },
};
