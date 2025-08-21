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
};
