import jwksRsa from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import jwt from 'express-jwt';

const { AUTH0_DOMAIN, AUDIENCE } = process.env;

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export const validateScopes = jwtAuthz([
  'list:users',
  'create:users',
  'update:users',
  'create:categories',
]);
