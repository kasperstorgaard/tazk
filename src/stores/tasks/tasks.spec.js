import td from 'testdouble';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as sut from './tasks';

// const fetch = td.function();
// global.fetch = fetch;

function buildStore() {
  return createStore(sut.reducer, applyMiddleware(thunk));
}

function mockData() {
    return [];
}

function mockApi(promises = [Promise.resolve(mockData()[0])]) {
  const matchesApi = td.matchers.contains('//api.graph.cool');

  td.when(fetch(matchesApi, td.matchers.anything()))
    .thenReturn(...promises.map(async promise => {
      const response = buildResponse(await promise);
      return ({json: async() => response});
    }));

  const geoJson = {type: 'FeatureCollection', features: []};

  td.when(fetch(td.matchers.contains('.geo.json')))  
    .thenResolve({json: async() => ({data: geoJson})});
}

function setup() {
  mockApi();
  return buildStore();
}

afterEach(() => td.reset());

test('')

// test('get() sets loading=true', async () => {
//   const store = setup();

//   store.dispatch(sut.get());

//   expect(store.getState().loading).toBe(true);
// });
