// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// For easier debugging in development mode, you can import the following file
export const environment = {
  production: false,
  rsc_URL: 'https://backend.bayti.website/api',
  pics_path: 'assets/uploads',
  STRIPE_PUBLIC_KEY: 'pk_test_51He39WHClIli5WWfJ8mhdEzhUE7UFR79FRAwyW2pSQbnLbD90IcEPbQuaKII2qjRT9i5lesZXgfX1OrMzguX8Mlc00KyEaxeUf',
  country:'ma',
  authorize_uri: 'https://auth.bayti.info/oauth2/authorize?',
  token_url: 'https://auth.bayti.info/oauth2/token',
  logout_url: 'https://auth.bayti.info/logout',
  resource_url: 'https://rsc.bayti.info/resource/',
  redirect_uri: 'https://client.bayti.info/authorized',
  client_id : 'client',
  scope: 'openid',
  response_type: 'code',
  response_mode: 'form_post',
  code_challenge_method: 'S256',
  code_verifier: 'zi6Vbvihy5tVMC6eOuY8v8iRtXmkTdE3GtXu9QKOKCI',
  code_challenge: '71q9MPYzKWKAAxpYCcCVNN_eHuCEnep1Y2ZEwbQohBw',
  grant_type: 'authorization_code',
  secret_pkce: 'secret'

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
