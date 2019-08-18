/* eslint-disable */

export const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
};


export const {
  api: {
    root: API_ROOT = 'http://localhost:3000/api',
    routes: {
      notes_list_get: API_ROUTES_NOTES_LIST_GET = 'notes_list_get',
      notes_list_set: API_ROUTES_NOTES_LIST_SET = 'notes_list_set',
    } = {}
  } = {}
} = {}
