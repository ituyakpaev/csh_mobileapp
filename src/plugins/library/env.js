const env = process.env.NODE_ENV

export default {
    env: env,
    isLocal: env === 'local',
    isDev: env === 'development',
    isProd: env === 'production'
}
