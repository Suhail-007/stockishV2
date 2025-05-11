// import LogRocket from '@logrocket/react-native';

// // TODO: IMPORTANT - Replace this with your actual LogRocket app ID from the LogRocket dashboard
// // Format: 'orgname/appname'
// const LOGROCKET_APP_ID = 'fs81e5/stockish';

// /**
//  * Initialize LogRocket with the app ID
//  */
// export const initializeLogRocket = () => {
//   // Only initialize in production to avoid tracking during development
//   if (__DEV__) {
//     console.log('LogRocket disabled in development mode');
//     return;
//   }

//   if (LOGROCKET_APP_ID === 'fs81e5/stockish') {
//     console.warn('⚠️ LogRocket app ID has not been set. Please update it in utils/logrocket.ts');
//     return;
//   }

//   LogRocket.init(LOGROCKET_APP_ID);
//   // @ts-ignore - The types for LogRocket are incomplete

//   // Log exceptions to LogRocket
//   const errorHandler = ErrorUtils.getGlobalHandler();
//   ErrorUtils.setGlobalHandler((error, isFatal) => {
//     LogRocket.captureException(error);
//     errorHandler(error, isFatal);
//   });

//   console.log('LogRocket initialized');
// };

// /**
//  * Identify a user in LogRocket
//  * @param userId - The user's ID
//  * @param userInfo - Additional user information like name, email, etc.
//  */
// export const identifyUser = (userId: string, userInfo?: Record<string, any>) => {
//   if (__DEV__) return;

//   LogRocket.identify(userId, userInfo);
// };

// /**
//  * Track a custom event in LogRocket
//  * @param name - The name of the event
//  * @param properties - Additional properties for the event
//  */
// export const trackEvent = (name: string, properties?: Record<string, any>) => {
//   if (__DEV__) return;

//   LogRocket.track(name, properties);
// };

// /**
//  * Log a network request with LogRocket
//  * @param request - The request details
//  * @param response - The response details
//  */
// export const logNetworkRequest = (
//   request: { method: string; url: string; headers?: any; body?: any },
//   response: { status: number; body?: any; headers?: any }
// ) => {
//   if (__DEV__) return;

//   // @ts-ignore - The types for LogRocket are incomplete
//   LogRocket.network.log(
//     request.method,
//     request.url,
//     request.body,
//     request.headers,
//     response.status,
//     response.body,
//     response.headers
//   );
// };

// /**
//  * Add extra context to LogRocket
//  * @param tag - The tag for the context
//  * @param value - The value to associate with the tag
//  */
// export const addContext = (tag: string, value: any) => {
//   if (__DEV__) return;

//   LogRocket.getSessionURL((url) => {
//     console.log(`LogRocket session URL: ${url}`);
//   });

//   // @ts-ignore - The types for LogRocket are incomplete
//   LogRocket.context.push({
//     tag,
//     value
//   });
// };
