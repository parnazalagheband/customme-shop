import api from '@/plugins/axios.js';

export const actions = {
  async getProducts() {
    this.loading = true;
    try {
      const response = await api.get('/products?include=images');
      console.log(response.data.data);
      this.products = response.data.data;
      this.images =
        response.data.included?.filter((item) => item.type === 'image') || [];
      console.log(this.images);

      this.products = this.products.map((product) => {
        const imageId = product.relationships.images.data?.[0]?.id;
        const image = this.images.find((img) => img.id === imageId);
        return {
          id: product.id,
          ...product.attributes,
          images: image ? image.attributes.styles : null,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },

  sortProducts(sortBy) {
    switch (sortBy) {
      case 'most_expensive':
        return [...this.products].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );

      case 'cheapest':
        return [...this.products].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );

      case 'newest':
        return [...this.products].sort(
          (a, b) =>
            new Date(b.available_on).getTime() -
            new Date(a.available_on).getTime()
        );

      case 'all':
        return this.products;

      default:
        return this.products;
    }
  },
};
