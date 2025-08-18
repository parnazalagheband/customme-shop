import api from '@/plugins/axios.js';

export const actions = {
  async getProducts(sortBy = 'all') {
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
        case 'all':
        default:
          sortParam = '';
      }

      const response = await api.get('/products', {
        params: {
          include: 'images',
          sort: sortParam || undefined,
        },
      });

      this.products = response.data.data;
      this.images =
        response.data.included?.filter((item) => item.type === 'image') || [];

      this.products = this.products.map((product) => {
        const imageId = product.relationships.images.data?.[0]?.id;
        const image = this.images.find((img) => img.id === imageId);
        return {
          id: product.id,
          ...product.attributes,
          images: image ? image.attributes.styles : [],
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
