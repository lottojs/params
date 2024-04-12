import { MatchedGroups, NextFunction, Request } from '@core/types'

export interface AbstractParser {
    parse: (path: string, req: Request, next: NextFunction) => Promise<void>
}

export class Parser implements AbstractParser {
    /**
     * Parse multipart body.
     * @param req Request
     * @param next NextFunction
     */
    public async parse(
        path: string,
        req: Request,
        next: NextFunction,
    ): Promise<void> {
        try {
            if (!req.url) {
                throw Error('@lottojs/body-parser: missing request url.')
            }

            const routeParams = req.url?.match(path)
            const { query, ...params } = routeParams?.groups as MatchedGroups

            // adds path parameters;
            req.params = params
            req.query = {}

            // adds query parameters.
            if (query) {
                req.query = query
                    .substring(0)
                    .split('&')
                    .reduce((queryParams: Record<string, any>, param) => {
                        const [key, value] = param.split('=')

                        queryParams[key] = value

                        return queryParams
                    }, {})
            }

            next()
        } catch {
            req.params = {}
            req.query = {}
            next()
        }
    }
}
