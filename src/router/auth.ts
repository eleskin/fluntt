import store from '@/store/index';

const beforeEnterAuth = (to: object, from: object, next: any) => (!store.getters.getIsLogin ? next({ name: 'Login' }) : next());

export default beforeEnterAuth;
