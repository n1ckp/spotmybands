import * as keys from '../../keys.json';

export const IS_DEV = process.env.NODE_ENV !== 'production'

export const KEYS = IS_DEV ? keys.dev : keys.prod;
