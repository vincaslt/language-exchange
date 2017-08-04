import * as passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'
import { RoutingControllersOptions, Action } from 'routing-controllers'
import * as Entities from 'language-exchange-commons/dist/entities'
import { getEntityManager } from 'typeorm'
import { jwtSecret } from './constants'

/**
 * Writes authentication configuration to serverOptions
 * and returns express middleware
 * @param serverOptions 
 */
export const initializeAuth = (serverOptions: RoutingControllersOptions) => {
  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: jwtSecret
  }

  passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const userRepository = getEntityManager().getRepository(Entities.User)
      const user = await userRepository.findOneById(payload.id)
      return done(null, user || false)
    } catch (error) {
      return done(error, false)
    }
  }))

  serverOptions.currentUserChecker = async (action: Action) => {
    await new Promise(resolve => {
      passport.authenticate('jwt', { session: false })(
        action.request,
        action.response,
        resolve
      )
    })
    return action.request.user
  }

  return passport.initialize()
}