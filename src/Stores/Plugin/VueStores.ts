import { inject } from 'vue';
/** @type {PageStore} */

/**
 * @returns {PageStore}
 */
// export function usePageStore() : PageStore {
// 	const store = inject(PageStoreSymbol);
//
// 	if (!store) {
// 		throw new Error('No PageStore provided!');
// 	}
//
// 	return store as PageStore;
// }
//
// /** @type {QuestionStore} */
// export const question = new QuestionStore();
// export const QuestionStoreSymbol = Symbol();
//
// /**
//  * @returns {QuestionStore}
//  */
// export function useQuestionStore() : QuestionStore {
// 	const store = inject(QuestionStoreSymbol);
//
// 	if (!store) {
// 		throw new Error('No QuestionStore provided!');
// 	}
//
// 	return store as QuestionStore;
// }
//
// /** @type {UserStore} */
// export const user = new UserStore();
// export const UserStoreSymbol = Symbol();
//
// /**
//  * @returns {UserStore}
//  */
// export function useUserStore() : UserStore {
// 	const store = inject(UserStoreSymbol);
//
// 	if (!store) {
// 		throw new Error('No UserStore provided!');
// 	}
//
// 	return store as UserStore;
// }
