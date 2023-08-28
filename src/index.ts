import { Parser } from '@core/parser'
import { Context, Middleware } from '@core/types'

/**
 * Parse path and query parameters comming from an incoming Request.
 * @param path
 * @returns Middleware Function
 */
export function paramsParser(path: string): Middleware {
    const { parse } = new Parser()

    return async ({ req, next }: Context) => {
        await parse(path, req, next)
    }
}
