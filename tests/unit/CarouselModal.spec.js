import { createLocalVue, shallowMount } from '@vue/test-utils';
import CarouselModal from '@/components/CarouselModal.vue';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('CarouselModal.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CarouselModal, {
      localVue,
      propsData: {
        modal: {},
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Tests Wrapper', () => {
    expect(wrapper).toBeDefined();
  });

  it('Tests showImage', () => {
    wrapper.vm.showImage(3);
    expect(wrapper.vm.activeImage).toBe(3);
  });
})