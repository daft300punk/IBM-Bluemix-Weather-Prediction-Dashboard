import { handleActions } from 'redux-actions';
import optimizationsActions from 'actions/optimizations';

function create(initialState) {
  return handleActions({
    [optimizationsActions.optimizations.getOptimizationsInit]: state => ({
      ...state,
      isLoadingOptimizations: true,
      loadingOptimizationsFailure: false,
      items: null,
    }),
    [optimizationsActions.optimizations.getOptimizationsDone]: (state, action) => ({
      ...state,
      isLoadingOptimizations: false,
      loadingOptimizationsFailure: action.error || false,
      items: action.error ? null : action.payload,
    }),
  }, initialState || {
    isLoadingOptimizations: false,
    loadingOptimizationsFailure: false,
    items: [],
  });
}

export function factory(req) {
  if (req) {
    // TODO
  }
  return Promise.resolve(create());
}

export default create();
