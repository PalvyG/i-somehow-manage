import 'dotenv/config'
import winston from "winston";
const { combine, printf, timestamp, colorize } = winston.format;

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'bold white redBG',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'magenta',
    }
}

const logConfigProd = {
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({
            filename: './src/logs/errors.log',
            level: 'error',
        })
    ],
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(winston.addColors(customLevels.colors)),
        printf((info) => {
            let spaces = []
            for (let i = info.level.length; i < 17; i++) {
                spaces.push(" ")
            }
            spaces = spaces.join("")
            if (info.level.includes('fatal')) {
                return `${info.level}    | ${[info.timestamp]} | ${info.message}`
            } else return `${info.level} ${spaces} | ${[info.timestamp]} | ${info.message}`
        })
    ),
    levels: customLevels.levels,
};

const logConfigDev = {
    transports: [new winston.transports.Console({level: 'debug'})],
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(winston.addColors(customLevels.colors)),
        printf((info) => {
            let spaces = []
            for (let i = info.level.length; i < 17; i++) {
                spaces.push(" ")
            }
            spaces = spaces.join("")
            if (info.level.includes('fatal')) {
                return `${info.level}    | ${[info.timestamp]} | ${info.message}`
            } else return `${info.level} ${spaces} | ${[info.timestamp]} | ${info.message}`
        })
    ),
    levels: customLevels.levels,
};

let winlogConfig;

switch (process.env.ENVIRONMENT) {
    case 'prod':
        winlogConfig = logConfigProd
        break;
    case 'dev':
        winlogConfig = logConfigDev
        break;
}

export const winlog = winston.createLogger(winlogConfig)
