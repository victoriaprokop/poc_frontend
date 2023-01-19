export interface FetcherPostRequest {
    name: string,
    server: string,
    description: string,
    username: string,
    password: string,
    protocol: string,
    port: string,
    quick_delete: boolean,
    active: boolean,
    time_limit: number,
    mailbox: string,
    domains: string
}
