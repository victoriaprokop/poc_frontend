export interface FetcherApiModel {
    name: string,
    server: string,
    description: string,
    username: string,
    password: string,
    protocol: string,
    port: number,
    quick_delete: true,
    active: true,
    time_limit: 0,
    mailbox: string,
    domains: string
    id: string,
    schedules: string[],
    uid_validity_key: string,
    checked?: boolean
}

