import { IncomingMessage } from 'node:http'

export type Params = Record<string, string>

export interface ParsedQuery {
    [key: string]: undefined | string | string[] | ParsedQuery | ParsedQuery[]
}

export interface MatchedGroups extends Record<string, any> {
    query?: string
}

export interface Request extends IncomingMessage {
    params: Params
    query: ParsedQuery
    [key: string]: any
}

export type NextFunction = (...args: any[]) => void

export type Context = {
    /**
     * Request Object
     */
    req: Request

    /**
     * Next Function, mostly used on middlewares in order to can go ahead
     * to the reqeuest.
     */
    next: NextFunction
}

export type Middleware = (ctx: Context) => void
