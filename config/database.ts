import { Options } from 'sequelize'

// eslint-disable-next-line import/prefer-default-export
export const development = {
	url: process.env.POSTGRESQL_URL,
	options: <Options>{
		minifyAliases: true,
		logging: true,
		pool: {
			max: 4
		}
	}
}
