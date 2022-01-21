import { lazy } from 'react';

/**
 * Custom features should be registered here as lazy components so that they do
 * not impact the generated JS bundle size. They will be automatically loaded in
 * whenever they are actually loaded for the client (which may be never, depending
 * on the feature and the egg).
 */

const PIDLimitModalFeature = lazy(() => import(/* webpackChunkName: "feature.pid_limit" */'@feature/PIDLimitModalFeature'));

export { PIDLimitModalFeature };
