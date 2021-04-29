import { createLocalVue, shallowMount } from '@vue/test-utils';
import ProductDetails from '@/components/ProductDetails.vue';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('axios');
describe('ProductDetails.vue', () => {
  let wrapper;
  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: { groups: [] } }));

  beforeEach(() => {
    wrapper = shallowMount(ProductDetails, {
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Tests Wrapper', () => {
    expect(wrapper).toBeDefined();
  });

  it('Tests Method : openProductModal', () => {
    const spyOnOpenProductModal = jest.spyOn(wrapper.vm, 'openProductModal');
    wrapper.vm.openProductModal({});
    expect(spyOnOpenProductModal).toHaveBeenCalled();
  });

  it('Tests Method : getPriceRange with empty Price Range', () => {
    const callPriceRange = wrapper.vm.getPriceRange({});
    expect(callPriceRange).toMatchObject({ RegularPrice: '', SalePrice: '' });
  });

  it('Tests Method : getPriceRange with Regular and Sale Price', () => {
    const priceRange = {
      "regular": {
        "high": 60,
        "low": 40
      },
      "selling": {
        "high": 33,
        "low": 21
      },
      "type": "special"
    };
    const mockPriceRange = wrapper.vm.getPriceRange(priceRange);
    expect(mockPriceRange).toMatchObject({ RegularPrice: '$40 - $60', SalePrice: '$21 - $33' });
  });

  it('Tests Method : getPriceRange with Regular Price', () => {
    const priceRange = {
      "regular": {
        "high": 30,
        "low": 20
      },
    };
    const mockPriceRange = wrapper.vm.getPriceRange(priceRange);
    expect(mockPriceRange).toMatchObject({ RegularPrice: '$20 - $30', SalePrice: '' });
  });
  it('Tests Method : getPriceRange with Sale Price', () => {
    const priceRange = {
      "selling": {
        "high": 30,
        "low": 20
      },
    };
    const mockPriceRange = wrapper.vm.getPriceRange(priceRange);
    expect(mockPriceRange).toMatchObject({ RegularPrice: '', SalePrice: '$20 - $30' });
  });

  it('Tests Method : getPrice with empty price', () => {
    const mockPrice = wrapper.vm.getPrice({});
    expect(mockPrice).toMatchObject({ RegularPrice: '', SalePrice: '' });
  });

  it('Tests Method : getPrice Regular when regular and sale are equal', () => {
    const price = {
      "regular": 599,
      "selling": 599
    };
    const mockPrice = wrapper.vm.getPrice(price);
    expect(mockPrice).toMatchObject({ RegularPrice: '$599', SalePrice: '' });
  });

  it('Tests Method : getPrice with Regular and Sale Price', () => {
    const price = {
      "regular": 599,
      "selling": 499
    };
    const mockPrice = wrapper.vm.getPrice(price);
    expect(mockPrice).toMatchObject({ RegularPrice: '$599', SalePrice: '$499' });
  });

  it('Tests Method : getPrice with Regular Price', () => {
    const price = {
      "regular": 299
    };
    const mockPrice = wrapper.vm.getPrice(price);
    expect(mockPrice).toMatchObject({ RegularPrice: '$299', SalePrice: '' });
  });

  it('Tests Method : getPrice with Sale Price', () => {
    const price = {
      "selling": 199
    };
    const mockPrice = wrapper.vm.getPrice(price);
    expect(mockPrice).toMatchObject({ RegularPrice: '', SalePrice: '$199' });
  });

  it('Tests Method : createProductsList', () => {
    wrapper.vm.createProductsList([]);
    expect(wrapper.vm.productsList.length).toBe(0);
  });

  it('Tests Method : createProductsList with a Product', () => {
    const mockProduct = {
      "id": "organic-coral-printed-shower-curtain-b3518",
      "name": "Organic Coral Printed Shower Curtain",
      "hero": {
        "size": "m",
        "meta": "",
        "alt": "",
        "rel": "hero",
        "width": 363,
        "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202114/0094/organic-coral-printed-shower-curtain-m.jpg",
        "height": 363
      },
      "priceRange": {
        "regular": {
          "high": 60,
          "low": 40
        },
        "selling": {
          "high": 33,
          "low": 21
        },
        "type": "special"
      },
      "images": [
        {
          "size": "m",
          "meta": "",
          "alt": "",
          "rel": "althero",
          "width": 363,
          "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202111/0126/organic-coral-printed-shower-curtain-m.jpg",
          "height": 363
        }
      ],
    };
    const expectedProduct = {
      "id": "organic-coral-printed-shower-curtain-b3518",
      "name": "Organic Coral Printed Shower Curtain",
      "heroImage": {
        "size": "m",
        "meta": "",
        "alt": "",
        "rel": "hero",
        "width": 363,
        "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202114/0094/organic-coral-printed-shower-curtain-m.jpg",
        "height": 363
      },
      "regularPrice": '$40 - $60',
      "salePrice": '$21 - $33',
      "images": [
        {
          "size": "m",
          "meta": "",
          "alt": "",
          "rel": "althero",
          "width": 363,
          "href": "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202111/0126/organic-coral-printed-shower-curtain-m.jpg",
          "height": 363
        }
      ]
    };
    wrapper.vm.createProductsList([mockProduct]);
    expect(wrapper.vm.productsList).toEqual([expectedProduct]);
  });

  it('Tests Method : getFinalPrice for Price Range', () => {
    const mockProduct = {
      "id": "organic-coral-printed-shower-curtain-b3518",
      "name": "Organic Coral Printed Shower Curtain",
      "priceRange": {
        "regular": {
          "high": 60,
          "low": 40
        },
        "selling": {
          "high": 33,
          "low": 21
        },
        "type": "special"
      },

    };
    const mockgetFinalPrice = wrapper.vm.getFinalPrice(mockProduct);
    expect(mockgetFinalPrice).toMatchObject({ RegularPrice: '$40 - $60', SalePrice: '$21 - $33' });
  });

  it('Tests Method : getFinalPrice for Price', () => {
    const mockProduct = {
      "id": "organic-coral-printed-shower-curtain-b3518",
      "name": "Organic Coral Printed Shower Curtain",
      "price": {
        "regular": 599,
        "selling": 499
      },
    };
    const mockgetFinalPrice = wrapper.vm.getFinalPrice(mockProduct);
    expect(mockgetFinalPrice).toMatchObject({ RegularPrice: '$599', SalePrice: '$499' });
  });

  it('Tests Method : getFinalPrice for Price', () => {
    const mockProduct = {
      "id": "organic-coral-printed-shower-curtain-b3518",
      "name": "Organic Coral Printed Shower Curtain",
      "priceRange": {
        "regular": {
          "high": 60,
          "low": 50
        },
      },
      "price": {
        "selling": 40
      },
    };
    const mockgetFinalPrice = wrapper.vm.getFinalPrice(mockProduct);
    expect(mockgetFinalPrice).toMatchObject({ RegularPrice: '$50 - $60', SalePrice: '$40' });
  });

  it('Tests fetchData', async () => {
    const spyOnCreateProductsList = jest.spyOn(wrapper.vm, 'createProductsList');
    axios.get = jest.fn().mockResolvedValue({
      data: [
        {
          groups: [],
        }
      ]
    });
    await wrapper.vm.fetchData().then(() => {
      expect(spyOnCreateProductsList).toHaveBeenCalled();
    })
  });

});
