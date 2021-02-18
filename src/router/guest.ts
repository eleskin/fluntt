import store from '@/store/index';

const beforeEnterGuest = (to: object, from: object, next: any) => (store.getters.getIsLogin ? next({ name: 'Home' }) : next());

export default beforeEnterGuest;
