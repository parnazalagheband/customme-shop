<template>
  <div class="filter-container">
    <div class="filter-container__filter-header filter-header">
      <h4 class="filter-header__title">فیلترها</h4>
      <base-button
        class="filter-header__btn"
        variant="text"
        @click="resetFilters"
      >
        حذف فیلترها
      </base-button>
    </div>

    <div
      v-for="item in productStore.filterOptions?.option_types"
      :key="item.id"
      @click="changeShow(item.id)"
      class="filter-container__filter-options filter-options"
      :class="{ 'filter-options_remove-border': showList.includes(item.id) }"
    >
      <div class="filter-options__option-types option-types">
        <span class="option-types__title" v-if="item.name === 'color'"
          >رنگ</span
        >
        <span class="option-types__title" v-else-if="item.name === 'size'"
          >سایز</span
        >
        <span class="option-types__title" v-else>{{ item.name }}</span>

        <icon-button
          :class="{ 'filter-options_open': showList.includes(item.id) }"
          styleType="filled"
          iconName="arrow-down"
        />
      </div>

      <div
        v-show="showList.includes(item.id)"
        v-for="option in item?.option_values"
        :key="option.id"
        class="filter-options__option-values option-values"
      >
        <div>{{ option.name }}</div>
        <base-switch
          :model-value="switchStates[option.id]"
          @update:model-value="switchToggle(option, item.name, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import qs from 'qs';
  import BaseButton from '@/components/common/button/base-button.vue';
  import IconButton from '@/components/common/button/icon-button.vue';
  import BaseSwitch from '@/components/common/input/base-switch.vue';
  import { useProductStore } from '@/store/products';

  const route = useRoute();
  const router = useRouter();

  const emit = defineEmits(['filter']);
  const productStore = useProductStore();

  const showList = ref([]);
  const switchStates = ref({});
  const selectedFilters = ref({});

  const changeShow = (id) => {
    if (showList.value.includes(id)) {
      showList.value = showList.value.filter((el) => el !== id);
    } else {
      showList.value.push(id);
    }
  };

  const initialSwitch = () => {
    productStore.filterOptions?.option_types.forEach((item) => {
      item.option_values.forEach((option) => {
        switchStates.value[option.id] = false;
      });
    });
  };

  const resetFilters = () => {
    for (const key in switchStates.value) {
      switchStates.value[key] = false;
    }
    if (Object.keys(selectedFilters.value).length !== 0) {
      selectedFilters.value = {};
      router.replace({
        query: {
          ...route.query,
          filters: undefined,
        },
      });
      emit('filter', selectedFilters.value);
    }
    selectedFilters.value = {};
  };

  
  const switchToggle = (option, type, value) => {
    switchStates.value[option.id] = value;
    if (!selectedFilters.value[type]) {
      selectedFilters.value[type] = [];
    }
    if (value) {
      if (!selectedFilters.value[type]?.includes(option.name)) {
        selectedFilters.value[type]?.push(option.name);
      }
    } else {
      selectedFilters.value[type] = selectedFilters.value[type].filter(
        (el) => el !== option.name
      );
      if (selectedFilters.value[type].length === 0)
        delete selectedFilters.value[type];
    }
    console.log(selectedFilters.value);
    router.replace({
      query: {
        ...route.query,
        filters:
          Object.keys(selectedFilters.value).length > 0
            ? qs.stringify(selectedFilters.value, { arrayFormat: 'brackets' })
            : undefined,
      },
    });

    emit('filter', selectedFilters.value);
  };




  const initial = ref(false);

  watch(
    () => productStore.filterOptions,
    (newValue) => {
      if (!newValue?.option_types?.length || initial.value) return;

      initialSwitch();

      if (route.query.filters) {
        const filters = qs.parse(route.query.filters);
        selectedFilters.value = filters;

        for (const type in filters) {
          filters[type].forEach((optionName) => {
            const option = newValue.option_types
              .find((item) => item.name === type)
              ?.option_values.find((item) => item.name === optionName);

            if (option) switchStates.value[option.id] = true;
          });
        }

        emit('filter', selectedFilters.value);
      }

      initial.value = true;
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .filter-container {
    padding: space(5);
    border-radius: $radius-2x;
    border: 1px solid var(--palette-gray-4);

    &__filter-options {
      margin-top: space(5);
    }
  }

  .filter-header {
    @include flex($align: center, $justify: space-between);

    &__title {
      @include typography(body-3);
      color: var(--palette-gray-9);
    }

    &__btn {
      @include typography(caption-3);
      --base-button-color: var(--palette-primary);
      --base-button-min-width: 55px;
    }
  }

  .filter-options {
    border-bottom: 2px solid var(--palette-gray-4);
    cursor:pointer;

    &_remove-border {
      border-bottom: none;
    }

    &_open {
      @include transition(standard-decelerate) {
        transition-property: transform;
      }
      transform: rotate(180deg);
    }
  }

  .option-types {
    @include flex($align: center, $justify: space-between);

    &__title {
      @include typography(body-4);
      color: var(--palette-gray-9);
    }
  }

  .option-values {
    @include flex($align: center, $justify: space-between);
    margin-top: space(2);
  }
</style>
