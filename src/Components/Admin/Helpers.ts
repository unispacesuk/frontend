import { getAllCategories } from '../../Services/Board/BoardsService';
import { IBus } from '../../Interfaces/IBus';

export async function fetchAllCategories(store: any, $bus?: IBus) {
  getAllCategories()
    .then((d) => {
      store.setCategories(d.categories);
    })
    .catch((e) => {
      if (e.response) {
        const error = e.response.data.error;
        console.log(error);
        $bus?.emit('add-toast', error, 'error');
      }
    });
}
